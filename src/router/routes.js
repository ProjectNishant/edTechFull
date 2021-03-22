import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import Profile from "@/pages/Auth/Profile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
import Admin from "@/pages/Admin/Admin.vue";
import myUseCase from "@/pages/MyUseCases/MyUseCases.vue"
import Platinum from "@/pages/MyUseCases/Platinum.vue"
import MacLearn from "@/pages/UcCategory/MachineLearn.vue"
import BigData from "@/pages/UcCategory/BigData.vue"

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "Profile",
        name: "Profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "myUseCase",
        name: "My Use Case",
        component: myUseCase
      },
      {
        path: "Plans",
        name: "Plans For You",
        component: Platinum
      },
      {
        path: "MacLearn",
        name: "ML Use Cases",
        component: MacLearn
      },
      {
        path: "BigData",
        name: "Big Data",
        component: BigData
      },
      {
        path: "admin",
        name: "admin",
        component: Admin
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
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
