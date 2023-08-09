import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import AuthPage from "./pages/auth/users";
import { AuthLayout } from "./components/auth/layout/AuthLayout";
import { Layout } from "./components/Layout/layout";
import { useActions, useAppSelector } from "./state/store";
import ProfilePage from "./pages/profile";
import { useEffect } from "react";
import NotFoundPage from "./pages/Error";
import ProductsPage from "./pages/common/products/products";
import EditProductPage from "./pages/common/products/editPage";
import OrdersPage from "./pages/common/orders/orders";

const unauthRoutes: CustomRoute[] = [
  {
    title: "Авторизация",
    path: "/auth/signin",
    element: <SignInPage />,
  },
  {
    title: "Страница со всеми пользователями",
    path: "/auth/signup",
    element: <SignUpPage />,
  },
  {
    title: "Страница со всеми пользователями",
    path: "/auth/users",
    element: <AuthPage />,
  },
];

export const authRoutes: CustomRoute[] = [
  {
    title: "Профиль",
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    title: "Товары",
    path: "/products",
    element: <ProductsPage />,
  },
  {
    title: "Заказы Склада",
    path: "/warehouse-orders",
    element: <OrdersPage />,
  },
  {
    title: "Заказы",
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    title: "Торговля",
    path: "/trade",
    element: <OrdersPage />,
  },
  {
    title: "Финансы",
    path: "/finances",
    element: <ProductsPage />,
  },
];

export function AppRouter() {
  const { user, isAuth } = useAppSelector((state) => state.core)
  const { getMe } = useActions()
  useEffect(() => {
    if (!user) {
      getMe()
    }
  }, [user, getMe])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {isAuth && (
          <>
            {authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route
              path={"/products/edit"}
              element={<EditProductPage />}
            />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/*Вход и регистрация (без общего layout)*/}
      <Route path="/auth" element={<AuthLayout />}>
        {unauthRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
