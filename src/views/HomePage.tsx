'use client';

import { useState } from 'react';
import SideMenu from '@/components/SideMenu';
import ColumnsGrid from '@/components/ColumnsGrid';

export default function HomePage() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <div className="flex flex-row">
      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        setIsSideMenuOpen={setIsSideMenuOpen}
      />
      <ColumnsGrid isSideMenuOpen={isSideMenuOpen} />
    </div>
  );
}
