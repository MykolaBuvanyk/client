'use client';
import React, { useEffect, useState, useRef } from 'react';
import './Contacts.scss';
import { Locale } from '@/i18n.config';
import BeckImg from '../../assest/Contacts/Contact.avif';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedPath } from '../utils/getLocalizedPath';
import Socials from './Socials';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import axios from 'axios';

interface ContactsDict {
  form: {
    heading: string;
    name: string;
    email: string;
    phone: string;
    interests: string;
    emailPhoneRequired: string;
    chooseWay: string;
    privacy: string;
    privacyLink: string;
    submit: string;
    success: string;
  };
}

type Props = {
  lang: Locale;
  dictionary: ContactsDict;
};

const Contacts = ({ lang, dictionary }: Props) => {
  const { interests: reduxInterests } = useSelector(
    (state: RootState) => state.form,
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
    privacy: false,
    selectSocial: '',
  });

  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email && !formData.phone) {
      alert('Please provide either an email address or a phone number.');
      return;
    }
    const TG_TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
    const TG_CHAT = process.env.NEXT_PUBLIC_TG_CHAT;
    // Формуємо текст повідомлення
    const message = `
Нова заявка:
Ім'я: ${formData.name}
Email: ${formData.email || '-'}
Телефон: ${formData.phone || '-'}
Інтереси: ${formData.interests || '-'}
Соцмережа: ${formData.selectSocial || '-'}
Приватність: ${formData.privacy ? 'Так' : 'Ні'}
  `;
    try {
      const res = await axios.post(
        `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
        {
          chat_id: TG_CHAT,
          text: message,
        },
      );
      if (res.data.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          interests: '',
          privacy: false,
          selectSocial: '',
        });
      }
    } catch (error) {
      console.error(error);
      alert('Сталася помилка при надсиланні в Telegram ❌');
    }
  };
  */

  // --- MOCK SUBMIT: показуємо сповіщення, якщо всі поля валідні ---
  const [showSuccess, setShowSuccess] = useState(false);
  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy || !formData.name || !formData.interests || !isContactValid) return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, interests: reduxInterests }));
  }, [reduxInterests]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, [formData.interests]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Валідація: або email, або phone має бути заповнений
  const isContactValid =
    formData.email.trim() !== '' || formData.phone.trim() !== '';

  const setSelectSocial = (value: string) => {
    setFormData((prev) => ({ ...prev, selectSocial: value }));
  };

  return (
    <div id="contacts" className="contacts-container">
      <div className="form-container">
        {/* <form onSubmit={handleSubmit}> */}
        <form onSubmit={handleFakeSubmit}>
          <h2>{dictionary.form.heading}</h2>

          <div className="row">
            <div className={`value ${formData.name.trim() ? 'is-filled' : ''}`}>
              <label>{dictionary.form.name}</label>
              <input
                name="name"
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={`value ${formData.email.trim() ? 'is-filled' : ''}`}>
              <label>{dictionary.form.email}</label>
              <input
                name="email"
                type="email"
                placeholder={!isContactValid ? dictionary.form.emailPhoneRequired : ''}
                value={formData.email}
                onChange={handleChange}
                required={!formData.phone} // HTML5 валідація, якщо телефону немає
              />
            </div>
          </div>

          <div className={`value ${formData.phone.trim() ? 'is-filled' : ''}`}>
            <label>{dictionary.form.phone}</label>
            <input
              name="phone"
              type="text"
              placeholder={!isContactValid ? dictionary.form.emailPhoneRequired : ''}
              value={formData.phone}
              onChange={handleChange}
              required={!formData.email} // HTML5 валідація, якщо email немає
            />
          </div>

          <div className={`value ${formData.interests.trim() ? 'is-filled' : ''}`}>
            <label>{dictionary.form.interests}</label>
            <textarea
              name="interests"
              ref={textareaRef}
              value={formData.interests}
              onChange={handleChange}
              rows={1}
              required
              style={{ resize: 'none', overflow: 'hidden' }}
            />
          </div>

          <div className="value-check">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              checked={formData.privacy}
              onChange={handleChange}
            />
            <label htmlFor="privacy">
              {dictionary.form.privacy}{' '}
              <Link href={getLocalizedPath(`/${lang}/privacy`, lang)}>
                {dictionary.form.privacyLink}
              </Link>
            </label>
          </div>

          <p>{dictionary.form.chooseWay}</p>
          <Socials
            setSelectSocial={setSelectSocial}
            selectSocial={formData.selectSocial}
          />

          <div className="row-but" style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <button type="submit" className="but-1">
              {dictionary.form.submit}{' '}
              <FaArrowRightLong color="#FFFFFF" />
            </button>
            {showSuccess && (
              <div className="success-toast">
                <span style={{marginRight: '10px', fontSize: '18px'}}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.70045 15.75C7.83211 15.978 8.02146 16.1674 8.24949 16.299C8.47751 16.4306 8.73616 16.4999 8.99945 16.4999C9.26274 16.4999 9.5214 16.4306 9.74942 16.299C9.97744 16.1674 10.1668 15.978 10.2985 15.75M2.44595 11.4945C2.34798 11.6019 2.28332 11.7354 2.25984 11.8789C2.23637 12.0223 2.25509 12.1695 2.31373 12.3025C2.37237 12.4356 2.4684 12.5487 2.59014 12.6281C2.71188 12.7075 2.85409 12.7499 2.99945 12.75H14.9995C15.1448 12.7501 15.287 12.7079 15.4089 12.6286C15.5307 12.5493 15.6268 12.4363 15.6856 12.3034C15.7444 12.1705 15.7633 12.0233 15.74 11.8798C15.7167 11.7364 15.6523 11.6028 15.5545 11.4952C14.557 10.467 13.4995 9.37425 13.4995 6C13.4995 4.80653 13.0253 3.66193 12.1814 2.81802C11.3375 1.97411 10.1929 1.5 8.99945 1.5C7.80598 1.5 6.66139 1.97411 5.81747 2.81802C4.97356 3.66193 4.49945 4.80653 4.49945 6C4.49945 9.37425 3.4412 10.467 2.44595 11.4945Z" stroke="#D9D9D9" stroke-width="1.5"/>
                    </svg>
                  </span>
                {dictionary.form.success}
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="beck-img">
        <Image alt="contacts" src={BeckImg} />
      </div>
    </div>
  );
};

export default Contacts;
