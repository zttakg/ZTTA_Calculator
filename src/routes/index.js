import New from "@/pages/New";
import Edit from "@/pages/Edit";
import EditOrder from "@/pages/EditOrder";

export default [
  {
    path: "/new",
    name: "constructor/new",
    component: New
    // component: () => import("@/pages/New")

    // If the user needs to be authenticated to view this page
    // meta: {
    //   auth: true
    // }
  },

  {
    path: "/edit/:id",
    name: "constructor/edit",
    component: Edit
  },

  {
    path: "/order/:id",
    name: "constructor/order",
    component: EditOrder
  },

  {
    path: "/",
    redirect: "/new"
  },

  {
    path: "/*",
    redirect: "/new"
  }
];
