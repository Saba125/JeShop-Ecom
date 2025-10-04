import Header from "@/components/layout/header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
        <Header />
        <div className="mt-6 flex  justify-center">
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout;