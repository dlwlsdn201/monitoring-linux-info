import { Button, Avatar } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
      <Link
        className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4"
        href="#">
        {/* <FrameIcon className="w-6 h-6" /> */}
        <Avatar name="nx" size="lg" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="font-medium w-full justify-center flex flex-row items-center gap-6 text-sm lg:gap-6">
        {/* <Link className="text-gray-500 dark:text-gray-400" href="#">
          Servers
        </Link> */}
        {/* <Link className="text-gray-500 dark:text-gray-400" href="#">
          Monitoring
        </Link> */}
        <Link className="font-bold" href="#">
          Dashboard
        </Link>
        {/* <Link className="text-gray-500 dark:text-gray-400" href="#">
          Alerts
        </Link>
        <Link className="text-gray-500 dark:text-gray-400" href="#">
          Settings
        </Link> */}
      </nav>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button className="rounded-full border-none" size="md" variant="ghost">
          <Avatar name="user" color="primary" style={{ width: '100%' }} />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
