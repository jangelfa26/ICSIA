import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation.jsx';
import '../index.css';

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
