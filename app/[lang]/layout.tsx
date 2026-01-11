import { i18n, Locale } from '@/i18n.config';
import './globals.css';
//import { Mulish, Inter } from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getDictionary } from '@/lib/dictionary';
import { TranslationProvider } from '../context/TranslationProvider';
import Providers from '../store/providers';
import { Montserrat, Russo_One } from 'next/font/google';
import './app.scss';
import Cookies from '../components/Cookies/Cookies';
import Modals from '../components/Modals/Modals';

// Підключаємо Montserrat
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'], // щоб була україномовна підтримка
  weight: ['300', '400', '500', '600', '700'], // які треба ваги
  variable: '--font-montserrat', // (опц.) CSS змінна
  display: 'swap',
});

const russoOne = Russo_One({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  variable: '--font-russoOne',
  display: 'swap',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning={true}>
      <body
        className={`${montserrat.variable} ${russoOne.variable} antialiased`}
      >
        <TranslationProvider dictionary={dictionary}>
          <Providers>
            <header>
              <Header lang={lang} />
            </header>
            <main>
              {children}
              <Cookies lang={lang} />
              <Modals dictionary={{ modal5: dictionary.modal5 }} />
            </main>
            <footer>
              <Footer lang={lang} />
            </footer>
          </Providers>
        </TranslationProvider>
      </body>
    </html>
  );
}
