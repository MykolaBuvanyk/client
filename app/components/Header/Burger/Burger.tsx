'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Burger.scss';
import { Locale } from '@/i18n.config';
import { useTranslation } from '@/app/context/TranslationProvider';
import Link from 'next/link';
import { getLocalizedPath } from '../../utils/getLocalizedPath';

type Props = {
  lang: Locale;
  urls: any;
};

const Burger = ({ lang, urls }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const menuRef = useRef<HTMLUListElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Закриття при кліку поза меню
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!menuRef.current || !iconRef.current) return;

      const target = e.target as Node;

      // Якщо клік не по меню і не по іконці — закриваємо
      if (
        !menuRef.current.contains(target) &&
        !iconRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div className="burger-container">
      <div
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
        className="burger-icon"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33301 4.16666H16.6663M3.33301 9.99999H16.6663M3.33301 15.8333H16.6663"
            stroke="black"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ul ref={menuRef} className={`burger-menu ${isOpen ? 'open' : ''}`}>
        {urls.map((x: any) => (
          <li onClick={() => setIsOpen(false)} key={x}>
            <Link href={getLocalizedPath(`/${lang}/${x}`, lang)}>
              {t(`header.urls.${x}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Burger;
