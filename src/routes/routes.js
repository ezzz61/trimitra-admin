import DashboardLayout from "../layout/DashboardLayout.vue";
// GeneralViews
import NotFound from "../pages/NotFoundPage.vue";
import Login from "src/pages/Login.vue";

// Admin pages
import Overview from "src/pages/Overview.vue";
import Icons from "src/pages/Icons.vue";
import Notifications from "src/pages/Notifications.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/admin/overview"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview
      },
      {
        path: "setup",
        name: "setup",
        component: () => import("src/pages/Setup.vue")
      },
      {
        path: "news",
        name: "news",
        component: () => import("src/pages/News/news.vue")
      },
      {
        path: "news/add",
        name: "add_news",
        component: () => import("src/pages/News/Add.vue")
      },
      {
        path: "news/update/:id",
        name: "update_news",
        component: () => import("src/pages/News/Update.vue")
      },
      {
        path: "appointment",
        name: "appointment",
        component: () => import("src/pages/Appointment/Appointment.vue")
      },
      {
        path: "appointment/add",
        name: "add_appointment",
        component: () => import("src/pages/Appointment/Add.vue")
      },
      {
        path: "appointment/update/:id",
        name: "update_appointment",
        component: () => import("src/pages/Appointment/Update.vue")
      },
      {
        path: "product",
        name: "product",
        component: () => import("src/pages/Product/Product.vue")
      },
      {
        path: "product/add",
        name: "add_product",
        component: () => import("src/pages/Product/Add.vue")
      },
      {
        path: "product/update/:id",
        name: "update_product",
        component: () => import("src/pages/Product/Update.vue")
      },

      {
        path: "user",
        name: "User",
        component: () => import("src/pages/User/User.vue")
      },
      {
        path: "user/u/:id",
        name: "User_update",
        component: () => import("src/pages/User/Update.vue")
      },
      {
        path: "user/add",
        name: "User_add",
        component: () => import("src/pages/User/Add.vue")
      },
      {
        path: "features",
        name: "Features",
        component: () => import("src/pages/Features/Features.vue")
      },
      {
        path: "features/u/:id",
        name: "Features_update",
        component: () => import("src/pages/Features/Update.vue")
      },
      {
        path: "features/add",
        name: "Features_add",
        component: () => import("src/pages/Features/Add.vue")
      },
      {
        path: "marketing",
        name: "marketing",
        component: () => import("src/pages/Marketing/Marketing.vue")
      },
      {
        path: "marketing/u/:id",
        name: "marketing_update",
        component: () => import("src/pages/Marketing/Update.vue")
      },
      {
        path: "marketing/add",
        name: "marketing_add",
        component: () => import("src/pages/Marketing/Add.vue")
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
