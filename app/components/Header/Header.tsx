import React from 'react';
import './Header.scss';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';
import LogoSVG from '@/app/assest/Header/Logo.svg';
import Link from 'next/link';
import { getLocalizedPath } from '../utils/getLocalizedPath';
import ListUrls from './ListUrls';
import Number from './Number';
import Language from './Language';

type Props = {
  lang: Locale;
};

const Header = async ({ lang }: Props) => {
  const { header } = await getDictionary(lang);

  return (
    <div className="header-container">
      <div className="header">
        <div className="logo-container">
          <Link href={getLocalizedPath(`/${lang}`, lang)}>
            <LogoSVG />
          </Link>
        </div>
        <ListUrls lang={lang} />
        <div className="number-and-lang">
          <Number lang={lang} />
          <Language lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default Header;
