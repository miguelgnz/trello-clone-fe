import CustomNavbar from "./CustomNavbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export default Layout;
