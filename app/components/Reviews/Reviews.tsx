'use client';
import { Locale } from '@/i18n.config';
import React, { useEffect, useRef, useState } from 'react';
import './Reviews.scss';
import { IoIosStar } from 'react-icons/io';
import PlaySVG from '../../assest/Review/Play.svg';

type Props = {
  lang: Locale;
  dictionary: any;
};

type ReviewData = {
  name: string;
  role: string;
};

const listReview: ReviewData[] = [
  { name: 'Mark', role: 'Business owner' },
  { name: 'Anneris', role: 'Business owner' },
];

type ReviewProps = {
  index: number;
  review: ReviewData;
  isActive: boolean;
  onPlay: (index: number) => void;
};

const Review = ({ index, review, isActive, onPlay }: ReviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {}); // Обробка блокування автовідтворення
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  return (
    <li
      className={`review-item ${isActive ? 'start' : 'stop'}`}
      onClick={() => onPlay(index)}
    >
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        className="review-video"
        //controls // додає стандартні контроли (play/pause/volume)
        onEnded={() => onPlay(-1)}
      >
        <source src={`/video/review${index + 1}.mp4`} type="video/mp4" />
      </video>

      {!isActive && (
        <div className="play">
          <PlaySVG />
        </div>
      )}

      <div className="text">
        <div className="starts">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <IoIosStar key={i} color="#FFDA63" size={18} />
            ))}
          </div>
          <span>5.0</span>
        </div>

        <div className="col">
          <h3>{review.name}</h3>
          <p>{review.role}</p>
        </div>
      </div>
    </li>
  );
};

const Reviews = ({ dictionary }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handlePlay = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Логіка відстеження поточного слайда для крапок
  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth <= 1150) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setCurrentSlide(newIndex);
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

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > 1150) return;
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLUListElement>) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > 1150) return;
    if (listReview.length <= 1) return;

    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;

    const endX = e.changedTouches[0]?.clientX;
    if (endX == null) return;

    const delta = startX - endX;
    const threshold = 35;
    if (Math.abs(delta) < threshold) return;

    const lastIndex = listReview.length - 1;
    const isSwipeNext = delta > 0;

    if (isSwipeNext && currentSlide >= lastIndex) {
      scrollToSlide(0);
      return;
    }

    if (!isSwipeNext && currentSlide <= 0) {
      scrollToSlide(lastIndex);
    }
  };

  return (
    <div id="reviews" className="reviews-container">
      <h2>{dictionary.title}</h2>

      <ul
        className="reviews-list"
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {listReview.map((review, index) => (
          <Review
            key={index}
            index={index}
            review={review}
            isActive={activeIndex === index}
            onPlay={handlePlay}
          />
        ))}
      </ul>

      {/* Пагінація для мобілки */}
      <div className="slider-pagination">
        {listReview.map((_, index) => (
          <span
            key={index}
            className="dot"
            onClick={() => scrollToSlide(index)}
          >
            {currentSlide === index ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="5" fill="url(#grad1)" />

                <circle cx="8" cy="8" r="7.5" stroke="url(#grad2)" />

                <defs>
                  <linearGradient
                    id="grad1"
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
                    id="grad2"
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
    </div>
  );
};

export default Reviews;
