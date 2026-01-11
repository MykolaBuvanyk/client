'use client';

import { Locale } from '@/i18n.config';
import React, { useRef, useState, useEffect } from 'react';
import './OurPortfolio.scss';
import {
  FaArrowRightLong,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa6';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OurPortfolio = ({ dictionary }: { dictionary: any }) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const projects = [
    { name: 'DUAA', url: 'https://duaa.dstepanoff.org.ua/' },
    { name: 'BAYLAP', url: 'https://baylap.com/' },
    { name: 'SKM-MUSIC', url: 'https://skm-music.com.ua/ua/' },
    { name: 'LITFAD', url: 'https://www.litfad.com/' },
    { name: 'IDOL', url: 'https://www.idol.cz/en/' },
    { name: 'YUFGLASS', url: 'https://www.yufglass.com/' },
    { name: 'GAMESPAIN', url: 'https://gamespain.es/' },
    { name: 'BURINNIA', url: 'https://burinnia.com/' },
    { name: 'LAKIQ', url: 'https://www.lakiq.com/' },
  ];

  // Визначаємо кількість карток на екрані для пагінації
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 500) setItemsPerPage(1);
      else if (width <= 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Розрахунок кількості точок
  const dotsCount = Math.ceil(projects.length / itemsPerPage);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      // Спеціальний розрахунок для випадку, коли картка ширша за екран (100% + 30px)
      // Використовуємо відношення прокрутки до максимального скролу
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft <= 0) return;

      const progress = scrollLeft / maxScrollLeft;
      const newActiveDot = Math.round(progress * (dotsCount - 1));

      if (newActiveDot !== activeDot) {
        setActiveDot(newActiveDot);
      }
    }
  };

  const scrollToIndex = (dotIndex: number) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      // Розраховуємо позицію скролу пропорційно точці
      const targetScroll = (dotIndex / (dotsCount - 1)) * maxScrollLeft;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  const router = useRouter();

  return (
    <section id="portfolio" className="our-portfolio-container">
      <div className="row">
        <h2>{dictionary.title}</h2>
        <button
          onClick={() => router.push('#contacts')}
          className="contact-btn"
        >
          {dictionary.button} <FaArrowRightLong />
        </button>
      </div>

      <div className="list-portfolio">
        <button
          className={`nav-arrow ${activeDot != 0 ? 'active ' : ' '}prev`}
          onClick={handlePrev}
          style={{ opacity: activeDot === 0 ? 0.3 : 1 }}
        >
          <FaChevronLeft />
        </button>
        <button
          className={`nav-arrow ${activeDot !== dotsCount - 1 ? 'active ' : ' '}next`}
          onClick={handleNext}
          style={{ opacity: activeDot === dotsCount - 1 ? 0.3 : 1 }}
        >
          <FaChevronRight />
        </button>

        <ul
          className="portfolio-slider"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {projects.map((item, index) => (
            <li key={index} className="portfolio-item">
              <a target="_blank" href={item.url} rel="noopener noreferrer">
                <div className="image-wrapper">
                  <Image
                    src={`/images/portfolio/${index + 1}.avif`}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="item-overlay">
                  <h3 className="item-title">{item.name}</h3>
                  <span className="item-category">{dictionary.website}</span>
                  <div className="visit-btn">
                    {dictionary.visitWebsite} <FaArrowRightLong />
                  </div>
                </div>
                <div className="beck-blur" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="slider-dots">
        {Array.from({ length: dotsCount }).map((_, index) => (
          <span
            key={index}
            className="dot"
            onClick={() => scrollToIndex(index)}
          >
            {activeDot === index ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="5"
                  fill={`url(#portfolio-grad1-${index})`}
                />

                <circle
                  cx="8"
                  cy="8"
                  r="7.5"
                  stroke={`url(#portfolio-grad2-${index})`}
                />

                <defs>
                  <linearGradient
                    id={`portfolio-grad1-${index}`}
                    x1="3"
                    y1="8"
                    x2="13"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#D4AF37" />

                    <stop offset="1" stopColor="#FFDA63" />
                  </linearGradient>

                  <linearGradient
                    id={`portfolio-grad2-${index}`}
                    x1="0"
                    y1="8"
                    x2="16"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#D4AF37" />

                    <stop offset="1" stopColor="#FFDA63" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="white" />
              </svg>
            )}
          </span>
        ))}
      </div>

    </section>
  );
};

export default OurPortfolio;
