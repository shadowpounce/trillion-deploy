
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import 'swiper/css';
import 'swiper/css/pagination';
import './globals.scss';
import '../styles/index.scss';
import clsx from 'clsx';
import { RootLayout } from 'layouts/RootLayout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const fonts = [
  geistSans.variable,
  geistMono.variable
]

export const metadata: Metadata = {
  title: 'Trillion Digital',
  description: 'Trillion Digital',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(...fonts)}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
