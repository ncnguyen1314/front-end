import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Button,
  Radio,
  Result,
  Card,
  RadioGroup,
  Col,
  Row,
  Drawer,
  Table,
  Form,
  InputNumber,
  Tag,
} from "ant-design-vue";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
// import { ButtonPlugin, FormRadioPlugin, FormGroupPlugin } from "bootstrap-vue";

createApp(App)
  .use(Layout)
  .use(Button)
  .use(Radio)
  .use(Result)
  .use(Card)
  .use(RadioGroup)
  .use(Col)
  .use(Row)
  .use(Drawer)
  .use(Table)
  .use(Form)
  .use(InputNumber)
  .use(Tag)
  .use(VueSidebarMenu)
  .use(store)
  .use(router)
  .mount("#app");
