import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

// PrimeVue Theme
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Button from "primevue/button";
import Row from "primevue/row";
import Sidebar from "primevue/sidebar";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Card from "primevue/card";

const app = createApp(App);

app.use(router);

app.use(ToastService);

app.use(PrimeVue, { ripple: true });

// PrimeVue used components
app.component("pv-data-table", DataTable);
app.component("pv-column", Column);
app.component("pv-toolbar", Toolbar);
app.component("pv-input-text", InputText);
app.component("pv-button", Button);
app.component("pv-row", Row);
app.component("pv-sidebar", Sidebar);
app.component("pv-menu", Menu);
app.component("pv-dialog", Dialog);
app.component("pv-toast", Toast);
app.component("pv-dropdown", Dropdown);
app.component("pv-tag", Tag);
app.component("pv-card", Card);

app.mount("#app");
