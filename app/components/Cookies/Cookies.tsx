'use client';
import React, { useEffect, useState } from 'react';
import './Cookies.scss';
import { useTranslation } from '@/app/context/TranslationProvider';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n.config';
import { getLocalizedPath } from '../utils/getLocalizedPath';

const Cookies = ({ lang }: { lang: Locale }) => {
  const router = useRouter();
  const { t } = useTranslation();

  // Стан для відображення банера (спочатку прихований, щоб не було "стрибка" при рендері)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи є запис у localStorage
    const isAccepted = localStorage.getItem('cookies-accepted');
    if (!isAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Зберігаємо вибір і ховаємо банер
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  // Якщо прийнято або ще не перевірено на клієнті — нічого не рендеримо
  if (!isVisible) return null;

  return (
    <div className="cookies-container">
      <div className="cookies">
        <h2>{t('cookies.title')}</h2>
        <p
          className="p1"
          dangerouslySetInnerHTML={{ __html: t('cookies.desc') }}
        />
        <h3>{t('cookies.miniTitle')}</h3>
        <p className="p2">{t('cookies.desc2')}</p>
        <div className="row">
          <button className="accept" onClick={handleAccept}>
            {t('cookies.accept')}{' '}
            <div className="svg">
              <FaArrowRightLong />
            </div>
          </button>
          <button
            onClick={() =>
              router.push(getLocalizedPath(`/${lang}/privacy-policy`, lang))
            }
            className="reject"
          >
            {t('cookies.reject')}
            <div className="svg">
              <FaArrowRightLong />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
