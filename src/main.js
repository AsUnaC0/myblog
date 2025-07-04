import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Tree, Message, Notification } from "element-ui";

Vue.config.productionTip = false;

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(Tree);


new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
