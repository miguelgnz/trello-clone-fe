import SwitchDarkMode from './SwitchDarkMode';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
} from '@nextui-org/react';
import { BsTrello } from 'react-icons/bs';

const CustomNavbar = () => {
  return (
    <Navbar className="bg-navbar" maxWidth="full">
      <NavbarBrand className="flex flex-row items-center gap-2 text-white">
        <BsTrello />
        <p className="font-bold text-inherit text-xl">Trello</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <SwitchDarkMode />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
