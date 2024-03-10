import { Outlet } from 'react-router-dom';

import { Header } from '@/components/header';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="p8 pt6 flex-1 flex-col gap-4">
        <Outlet />
      </div>
    </div>
  );
};
