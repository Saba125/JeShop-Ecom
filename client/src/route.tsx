import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./pages/(auth)/layout";
const router = createBrowserRouter([
    {
        path: "/auth",
        element: <AuthLayout />,
        children: []
    }
])

const PageRouter = () => {
  return (
    <RouterProvider  router={router}/>
  )
}

export default PageRouter;