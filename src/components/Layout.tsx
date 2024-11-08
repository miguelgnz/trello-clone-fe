import CustomNavbar from "./CustomNavbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CustomNavbar />
      {children}
      {/* <footer className="h-">Footer</footer> */}
    </>
  );
};

export default Layout;
