'use client';

import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { useThemeContext } from '@/context/ThemeContext';
import { BsTrello } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { constants } from '@/utils/constants';

const CustomNavbar = () => {
  const [selectedSetting, setSelectedSetting] = useState<
    'theme' | 'background' | 'none' | null
  >(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { BACKGROUNDS } = constants;

  const { changeBackground } = useThemeContext();

  return (
    <Navbar className="bg-navbar" maxWidth="full">
      <NavbarBrand className="flex flex-row items-center gap-2 text-white">
        <BsTrello />
        <p className="font-bold text-inherit text-xl">Trello</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Popover
            shouldCloseOnBlur
            backdrop="blur"
            isOpen={isPopoverOpen}
            onOpenChange={() => setIsPopoverOpen(false)}
          >
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                className="text-white"
                onClick={() => {
                  setIsPopoverOpen(!isPopoverOpen);
                }}
              >
                <IoSettingsOutline size={28} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-modal">
              <div className="px-1 py-2">
                {!selectedSetting && (
                  <Button
                    className="text-taskText"
                    variant="light"
                    onClick={() => {
                      setSelectedSetting('background');
                    }}
                  >
                    Change Background
                  </Button>
                )}

                {selectedSetting === 'background' && (
                  <div className="grid grid-cols-[repeat(2,_150px)]  gap-2">
                    {BACKGROUNDS.map((background) => {
                      return (
                        <div
                          key={background.id}
                          className={`${background.color} cursor-pointer rounded-lg w-full h-24 flex flex-row items-end justify-start p-2`}
                          onClick={() => {
                            setSelectedSetting(null);
                            changeBackground(background);
                            setIsPopoverOpen(false);
                          }}
                        >
                          {background.emoji}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
