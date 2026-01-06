'use client';

import { Locale } from '@/i18n.config';
import React, { useState, useRef, useEffect } from 'react';
import './Language.scss';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

type Props = {
  lang: Locale;
};

const listLanguage = [
  { text: 'EN', value: 'en', url: '' },
  { text: 'ES', value: 'es', url: 'es' },
  { text: 'DE', value: 'de', url: 'de' },
  { text: 'PL', value: 'pl', url: 'pl' },
  { text: 'UA', value: 'uk', url: 'uk' },
  { text: 'RU', value: 'ru', url: 'ru' },
];

const Language = ({ lang }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обробка кліку поза меню (для мобілок)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Функції для ПК (Hover)
  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) setIsOpen(false);
  };

  // Функція для мобілок (Click)
  const toggleDropdown = () => {
    if (window.innerWidth <= 1024) {
      setIsOpen(!isOpen);
    }
  };

  const currentLangText =
    listLanguage.find((l) => l.value === lang)?.text || 'EN';

  return (
    <div
      className="language-wrapper"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="language-container" onClick={toggleDropdown}>
        <p>{currentLangText}</p>
        <FaChevronDown
          className={`chevron ${isOpen ? 'rotate' : ''}`}
          color="#f6f6f6"
          size={12}
        />
      </div>

      {isOpen && (
        <div className="dropdown2">
          <ul>
            {listLanguage
              .filter((item) => item.value !== lang)
              .map((item) => (
                <li key={item.value}>
                  <Link href={`/${item.url}`} onClick={() => setIsOpen(false)}>
                    {item.text}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Language;
