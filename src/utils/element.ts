import Vue from "vue";
import { Button, Table, TableColumn, Input, Drawer, Slider } from "element-ui";

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Drawer);
Vue.use(Slider);
