import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--page-gradient)',
        color: 'var(--text-color)',
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
          width: '100%',
          transition: 'color 0.3s ease'
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
