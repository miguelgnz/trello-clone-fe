import SwitchDarkMode from './SwitchDarkMode';

const Navbar = () => {
  return (
    <nav className="h-16 bg-blue-600 flex p-5 flex-row items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Trello Clone</h1>
      <SwitchDarkMode />
    </nav>
  );
};

export default Navbar;
