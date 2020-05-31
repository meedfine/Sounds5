import Vue from "vue";
import { Button, Table, TableColumn, Input, Drawer, Slider, Avatar, Dialog, Form, FormItem, Loading, MessageBox, Message } from "element-ui";

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Drawer);
Vue.use(Slider);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
