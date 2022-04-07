import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Deals from '../views/Deals.vue';
import Deal from '../views/Deal.vue';
import Login from "../views/Login.vue";
import Contacts from "../views/Contacts.vue";
import Contact from "../views/Contact.vue";
import Companies from "../views/Companies.vue";
import Account from "../views/Account.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    normal: "icon-home-border",
    active: "icon-home",
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
    normal: "icon-dashboard-border",
    active: "icon-dashboard",
  },
  {
    path: "/Deals",
    name: "Deals",
    component: Deals,
    normal: "icon-chatmoney-border",
    active: "icon-chatmoney",
  },
  {
    path: "/Deal",
    name: "Deal",
    component: Deal,
    normal: "icon-chatmoney-border",
    active: "icon-chatmoney",
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Contacts",
    name: "Contacts",
    component: Contacts,
    normal: "icon-contact-border",
    active: "icon-contact",
  },
  {
    path: "/Contact",
    name: "Contact",
    component: Contact,
    normal: "icon-contact-border",
    active: "icon-contact",
  },
  {
    path: "/Companies",
    name: "Companies",
    component: Companies,
    normal: "icon-companies-w",
    active: "icon-companies-b",
  },
  {
    path: "/Account",
    name: "Account",
    component: Account,
    normal: "icon-companies-w",
    active: "icon-companies-b",
  },
  {
    path: "/Setting",
    name: "Setting",
    component: Setting,
    normal: "icon-setting-w",
    active: "icon-setting-b",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
