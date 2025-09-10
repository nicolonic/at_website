import { Outlet } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}