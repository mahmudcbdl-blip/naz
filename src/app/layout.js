import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import './globals.css';

export const metadata = {
  title: 'Naaz World | Premium E-Commerce',
  description: 'The best online shop for premium gadgets and electronics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}