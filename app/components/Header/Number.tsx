'use client';
import React, { useState, useRef, useEffect } from 'react';
import './Number.scss';
import { FaChevronDown } from 'react-icons/fa';
import SpainIMG from '../../assest/Header/spain.avif';
import AmerikaGVG from '../../assest/Header/amerika.svg';
import Image from 'next/image';
import { Locale } from '@/i18n.config';

type Props = {
  lang: Locale;
};

const Number = ({ lang }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Закриття при кліку поза компонентом
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Перевірка мобільного (не обов’язково, можна через CSS media query)
  const handleToggle = () => {
    if (window.innerWidth <= 768) {
      // мобільні екрани
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`number-container ${isOpen ? 'open' : ''}`}
    >
      {' '}
      <div onClick={handleToggle} className={`list ${isOpen ? 'open' : ''}`}>
        {lang == 'en' && (
          <a href="tel:16472832846">
            <AmerikaGVG />
            +1 (647) 283-2846
          </a>
        )}
        {lang == 'es' && (
          <a href="tel:34612483957">
            <Image width={20} height={14} src={SpainIMG} alt="spain" />
            +34 (612) 483-957
          </a>
        )}
        {lang == 'pl' && (
          <a href="tel:48512734896">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.9 12H0V6H20.9V12Z" fill="#FF0000" />
              <path d="M19 6H0V0H19V6Z" fill="white" />
            </svg>
            +48 (512) 734 896
          </a>
        )}
        {lang == 'de' && (
          <a href="tel:48512734896">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 4H0V0H19V4Z" fill="black" />
              <path d="M19 8H0V4H19V8Z" fill="#FF0000" />
              <path d="M19 12H0V8H19V12Z" fill="#FFC300" />
            </svg>
            +49 (552) 234 678
          </a>
        )}
        {(lang == 'uk' || lang == 'ru') && (
          <a href="tel:380636826299">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.9 12H0V6H20.9V12Z" fill="#FFD500" />
              <path d="M19 6H0V0H19V6Z" fill="#005BBB" />
            </svg>
            +380 63 682 6299
          </a>
        )}
        <div className={`svg ${isOpen ? 'open' : 'close'}`}>
          <FaChevronDown />
        </div>
      </div>
      <div className="dropdown">
        {lang != 'en' && (
          <a href="tel:16472832846">
            <AmerikaGVG />
            +1 (647) 283-2846
          </a>
        )}
        {lang != 'es' && (
          <a href="tel:34612483957">
            <Image width={20} height={14} src={SpainIMG} alt="spain" />
            +34 (612) 483-957
          </a>
        )}
        {lang != 'pl' && (
          <a href="tel:48512734896">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.9 12H0V6H20.9V12Z" fill="#FF0000" />
              <path d="M19 6H0V0H19V6Z" fill="white" />
            </svg>
            +48 (512) 734 896
          </a>
        )}
        {lang != 'de' && (
          <a href="tel:48512734896">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 4H0V0H19V4Z" fill="black" />
              <path d="M19 8H0V4H19V8Z" fill="#FF0000" />
              <path d="M19 12H0V8H19V12Z" fill="#FFC300" />
            </svg>
            +49 (552) 234 678
          </a>
        )}
        {!(lang == 'uk' || lang == 'ru') && (
          <a href="tel:380636826299">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.9 12H0V6H20.9V12Z" fill="#FFD500" />
              <path d="M19 6H0V0H19V6Z" fill="#005BBB" />
            </svg>
            +380 63 682 6299
          </a>
        )}
      </div>
    </div>
  );
};

export default Number;
