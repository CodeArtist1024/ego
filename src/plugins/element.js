import Vue from 'vue'
import {
    Button, Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Table,
    TableColumn,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Col,
    Select,
    Option,
    Switch,
    Dialog,
    MessageBox,
    Tree,
    Upload,
    Message,
    Dropdown,
    DropdownMenu,
    DropdownItem,

} from 'element-ui'

Vue.use(Button)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input,);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Message);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);



    Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message

