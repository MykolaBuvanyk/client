'use client';
import React, { useRef, useState, useEffect } from 'react';
import './WhyIt.scss';
import { FaArrowRightLong } from 'react-icons/fa6';
import SVG1 from '../../assest/WhyIt/WhyIt1.svg';
import SVG2 from '../../assest/WhyIt/WhyIt2.svg';
import SVG3 from '../../assest/WhyIt/WhyIt3.svg';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setInteresets } from '@/app/store/reducers/formReducers';
import { useTranslation } from '@/app/context/TranslationProvider';

type Props = {
  dictionary: any;
};

const WhyIt = ({ dictionary }: Props) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const router = useRouter();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const playVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.play().catch(() => {});
  };

  const stopVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
  };

  // Відстеження активного слайда для крапок
  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth < 768) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveDot(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      });
    }
  };

  const toContact = (idx: number) => {
    dispatch(setInteresets(t('toFormWhyIt.' + idx) as string));
    router.push('#contacts');
  };

  return (
    <div className="why-it-container">
      <div className="row">
        <h2>{dictionary.title}</h2>
        <button onClick={() => router.push('#contacts')}>
          {dictionary.button}
          <FaArrowRightLong className="svg" color="#FFFFFF" />
        </button>
      </div>

      <ul className="list-video" ref={scrollRef} onScroll={handleScroll}>
        {[SVG1, SVG2, SVG3].map((Icon, i) => (
          <li
            onClick={() => toContact(i + 1)}
            key={i}
            onMouseEnter={() => playVideo(i)}
            onMouseLeave={() => stopVideo(i)}
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              loop
              preload="metadata"
              playsInline
              className="bg-video"
            >
              <source src={`/video/WhyIt${i + 1}.mp4`} type="video/mp4" />
            </video>

            <div className="up">
              <div className="svg">
                <Icon />
              </div>
              <div className="svg-utils">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 0.75H10.75M10.75 0.75V10.75M10.75 0.75L0.75 10.75"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="text">
              <h3>{dictionary[`miniTitle${i + 1}`]}</h3>
              <p>{dictionary[`miniDesc${i + 1}`]}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Крапки пагінації (видимі лише на мобілці) */}
      <div className="slider-dots">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`dot ${activeDot === i ? 'active' : ''}`}
            onClick={() => scrollToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyIt;
