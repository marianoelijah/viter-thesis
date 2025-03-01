import DeveloperProtectedRoute from "@/components/pages/backend/access/DeveloperProtectedRoute";
import Advertisement from "@/components/pages/backend/advertisement/Advertisement";
import Category from "@/components/pages/backend/category/Category";
import Dashboard from "@/components/pages/backend/dashboard/Dashboard";


import Products from "@/components/pages/backend/products/Products";
import Developer from "@/components/pages/backend/settings/developer/Developer";

import Role from "@/components/pages/backend/settings/role/Role";
import Settings from "@/components/pages/backend/settings/Settings";
import User from "@/components/pages/backend/settings/user/User";

export const routeDeveloper = [
  {
    route: `/developer/`,
    element: (
      <DeveloperProtectedRoute>
        <Dashboard />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/dashboard`,
    element: (
      <DeveloperProtectedRoute>
        <Dashboard />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/advertisement`,
    element: (
      <DeveloperProtectedRoute>
        <Advertisement />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/products`,
    element: (
      <DeveloperProtectedRoute>
        <Products />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/category`,
    element: (
      <DeveloperProtectedRoute>
        <Category />,
      </DeveloperProtectedRoute>
    ),
  },

  {
    route: `/developer/settings`,
    element: (
      <DeveloperProtectedRoute>
        <Settings />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings/role`,
    element: (
      <DeveloperProtectedRoute>
        <Role />,
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings/developer`,
    element: (
      <DeveloperProtectedRoute>
        <Developer />,
      </DeveloperProtectedRoute>
    ),
  },

  {
    route: `/developer/settings/user`,
    element: (
      <DeveloperProtectedRoute>
        <User />
      </DeveloperProtectedRoute>
    ),
  },
];