import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Wheel World",
  description: "Experience Automotive Excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative dark'>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
