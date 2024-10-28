import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <footer className="h-">Footer</footer> */}
    </>
  );
};

export default Layout;
