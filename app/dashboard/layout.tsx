import SideNav from "./components/side-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <SideNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
