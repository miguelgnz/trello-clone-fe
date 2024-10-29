import SwitchDarkMode from './SwitchDarkMode';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-violet-600 h-16 flex p-5 flex-row items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Trello Clone</h1>
      <SwitchDarkMode />
    </nav>
  );
};

export default Navbar;
