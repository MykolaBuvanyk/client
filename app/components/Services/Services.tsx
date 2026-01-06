'use client';
import { Locale } from '@/i18n.config';
import React from 'react';
import './Services.scss';
import LogoSVG from '../../assest/Services/Logo.svg';
import ArrowSVG from '../../assest/Services/Arrow.svg';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setInteresets } from '@/app/store/reducers/formReducers';
import { useTranslation } from '@/app/context/TranslationProvider';

type Props = {
  dictionary: any;
};

const Services = ({ dictionary }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const toContact = (idx: number) => {
    router.push('#contacts');
    dispatch(setInteresets(t('serviceContact.' + idx) as string));
  };

  return (
    <div id="services" className="services-container">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.jpg"
        className="services-bg-video"
      >
        {/* Full HD для великих екранів */}
        <source
          src="/video/hero-1080.mp4"
          type="video/mp4"
          media="(min-width: 769px)"
        />
        {/* 720p для мобільних */}
        <source
          src="/video/hero-720.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        />
      </video>

      {/* CONTENT OVERLAY */}
      <div className="services">
        <div className="logo">
          <LogoSVG />
        </div>
        <div className="list-info-cont">
          <h2>{dictionary.title}</h2>
          <ul>
            {[1, 2, 3, 4, 5, 6].map((x, idx) => (
              <li onClick={() => toContact(idx + 1)} className="li" key={x}>
                <div className="text">
                  <h3>{dictionary[`miniTitle${x}`]}</h3>
                  <p>{dictionary[`desc${x}`]}</p>
                  <span>{dictionary[`info${x}`]}</span>
                </div>
                <div className="svg">
                  <ArrowSVG />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;
