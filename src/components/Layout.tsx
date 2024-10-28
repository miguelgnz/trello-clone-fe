import SwitchDarkMode from "./SwitchDarkMode";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav style={{ height: "74px" }}>
        <SwitchDarkMode />
      </nav>
      {children}
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
