import { Outlet } from 'react-router';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}