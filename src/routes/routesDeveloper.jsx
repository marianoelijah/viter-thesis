import DeveloperProtectedRoute from "@/components/pages/backend/access/DeveloperProtectedRoute";
import Category from "@/components/pages/backend/Developer/category/Category";
import Dashboard from "@/components/pages/backend/Developer/dashboard/Dashboard";
import Role from "@/components/pages/backend/Developer/settings/role/Role";
import Settings from "@/components/pages/backend/Developer/settings/Settings";
import Products from "@/components/pages/backend/products/Products";
import Developer from "@/components/pages/backend/settings/developer/Developer";
import Users from "@/components/pages/backend/settings/user/Users";

export const routesDeveloper = [
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
    route: `/developer/category`,
    element: (
      <DeveloperProtectedRoute>
        <Category />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/products`,
    element: (
      <DeveloperProtectedRoute>
        <Products />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings`,
    element: (
      <DeveloperProtectedRoute>
        <Settings />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings/role`,
    element: (
      <DeveloperProtectedRoute>
        <Role/>
      </DeveloperProtectedRoute>
    ),
  },

  {
    route: `/developer/settings/developer`,
    element: (
      <DeveloperProtectedRoute>
        <Developer />
      </DeveloperProtectedRoute>
    ),
  },
  {
    route: `/developer/settings/users`,
    element: <Users />,
  },
];