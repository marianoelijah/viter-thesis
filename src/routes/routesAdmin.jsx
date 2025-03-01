import Advertisement from "@/components/pages/backend/advertisement/Advertisement";
import Category from "@/components/pages/backend/category/Category";
import Dashboard from "@/components/pages/backend/dashboard/Dashboard";
import Products from "@/components/pages/backend/products/Products";
import Developer from "@/components/pages/backend/settings/developer/Developer";
import Role from "@/components/pages/backend/settings/role/Role";
import Settings from "@/components/pages/backend/settings/Settings";
import User from "@/components/pages/backend/settings/user/User";

export const routesAdmin = [
  {
    route: `/admin/dashboard`,
    element: <Dashboard />,
  },
  {
    route: `/admin/advertisement`,
    element: <Advertisement />,
  },
  {
    route: `/admin/category`,
    element: <Category />,
  },
  {
    route: `/admin/products`,
    element: <Products />,
  },
  {
    route: `/admin/settings`,
    element: <Settings />,
  },
  {
    route: `/admin/settings/role`,
    element: <Role />,
  },
  {
    route: `/admin/settings/developer`,
    element: <Developer />,
  },
  {
    route: `/admin/settings/user`,
    element: <User />,
    },
  
  
];