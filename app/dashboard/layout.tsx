import SideNav from "./components/side-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SideNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
