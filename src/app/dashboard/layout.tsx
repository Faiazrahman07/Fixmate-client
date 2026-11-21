import DashboardLayout from "@/components/Dashboard/DashboardLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;