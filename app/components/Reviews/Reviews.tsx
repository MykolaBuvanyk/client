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

const listReview = [1, 2]; // Ваші дані

type ReviewProps = {
  index: number;
  isActive: boolean;
  onPlay: (index: number) => void;
};

const Review = ({ index, isActive, onPlay }: ReviewProps) => {
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
          <h3>Max Orlov</h3>
          <p>Software Engineer</p>
        </div>
      </div>
    </li>
  );
};

const Reviews = ({ dictionary }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);

  const handlePlay = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Логіка відстеження поточного слайда для крапок
  const handleScroll = () => {
    if (scrollRef.current) {
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

  return (
    <div id="reviews" className="reviews-container">
      <h2>{dictionary.title}</h2>

      <ul className="reviews-list" ref={scrollRef} onScroll={handleScroll}>
        {listReview.map((_, index) => (
          <Review
            key={index}
            index={index}
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
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
