<template>
  <div></div>
</template>

<script>
import { TutorialsApiService } from "../services/tutorials-api.service";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "tutorial-list",
  data() {
    return {
      tutorials: [],
      tutorialDialog: false,
      deleteTutorialDialog: false,
      deleteTutorialsDialog: false,
      tutorial: {},
      selectedTutorials: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      tutorialsService: null,
    };
  },
  created() {
    this.tutorialsService = new TutorialsApiService();
    this.tutorialsService.getAll().then((response) => {
      this.tutorials = response.data;
      console.log(this.tutorials);
      this.tutorials.forEach((tutorial) => this.getDisplayableTutorial(tutorial));
      console.log(this.tutorials);
    });
    this.initFilters();
  },
  methods: {
    getDisplayableTutorial(tutorial) {
      tutorial.status = tutorial.published
        ? this.statuses[0].label
        : this.statuses[1].label;
      return tutorial;
    },
    getStorableTutorial(displayableTutorial) {
      return {
        id: displayableTutorial.id,
        title: displayableTutorial.title,
        description: displayableTutorial.description,
        published: displayableTutorial.status.label === "Published",
      };
    },
    openNew() {
      this.tutorial = {};
      this.submitted = false;
      this.tutorialDialog = true;
    },
    hideDialog() {
      this.tutorialDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.tutorials.findIndex((tutorial) => tutorial.id === id);
    },
    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.title.trim()) {
        if (this.tutorial.id) {
          this.tutorialsService
            .update(this.tutorial.id, this.tutorial)
            .then((response) => {
              this.tutorials[this.findIndexById(response.data.id)] =
                this.getDisplayableTutorial(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.tutorial.id = 0;
          this.tutorialsService.create(this.tutorial).then((response) => {
            this.tutorial = this.getDisplayableTutorial(response.data);
            this.tutorials.push(this.tutorial);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Created",
              life: 3000,
            });
            console.log(response);
          });
        }
      }
      this.tutorialDialog = false;
      this.tutorial = {};
    },
    editTutorial(tutorial) {
      this.tutorial = { ...tutorial };
      this.tutorialDialog = true;
    },
    confirmDeleteTutorial(tutorial) {
      this.tutorial = tutorial;
      this.deleteTutorialDialog = true;
    },
    deleteTutorial() {
      this.tutorialsService.delete(this.tutorial.id).then((response) => {
        this.tutorials = this.tutorials.filter(
          (t) => t.id !== this.tutorial.id
        );
        this.deleteTutorialDialog = false;
        this.tutorial = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Tutorial Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    exportToCsv() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteTutorialsDialog = true;
    },
    deleteSelectedTutorials() {
      this.selectedTutorials.forEach((tutorial) => {
        this.tutorialsService.delete(tutorial.id).then((response) => {
          this.tutorials = this.tutorials.filter((t) => t.id !== this.tutorial.id);
          console.log(response);
        });
      });
      this.deleteTutorialsDialog = false;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    }
  },
};
</script>

<style scoped></style>
