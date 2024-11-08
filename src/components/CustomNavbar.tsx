import SwitchDarkMode from './SwitchDarkMode';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent } from '@nextui-org/react';
import { BsTrello } from 'react-icons/bs';

const CustomNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand className='flex flex-row items-center gap-2'>
        <BsTrello />
        <p className="font-bold text-inherit">TRELLO</p>
      </NavbarBrand>
      <NavbarContent  justify="center">
        <NavbarItem>
          <SwitchDarkMode />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;