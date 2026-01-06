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

type Props = {
  lang: Locale;
};

const Contacts = ({ lang }: Props) => {
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
        <form onSubmit={handleSubmit}>
          <h2>Contact us for a quote</h2>

          <div className="row">
            <div className="value">
              <label>Your name</label>
              <input
                name="name"
                required
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="value">
              <label>Your email</label>
              <input
                name="email"
                type="email"
                placeholder={!isContactValid ? 'Email or Phone required' : ''}
                value={formData.email}
                onChange={handleChange}
                required={!formData.phone} // HTML5 валідація, якщо телефону немає
              />
            </div>
          </div>

          <div className="value">
            <label className="lab2">Your phone number</label>
            <input
              name="phone"
              type="text"
              placeholder={!isContactValid ? 'Email or Phone required' : ''}
              value={formData.phone}
              onChange={handleChange}
              required={!formData.email} // HTML5 валідація, якщо email немає
            />
          </div>

          <div className="value">
            <label className="lab2">
              Write down everything that interests you
            </label>
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
              I accept{' '}
              <Link href={getLocalizedPath(`/${lang}/privacy`, lang)}>
                the Privacy Policy
              </Link>
            </label>
          </div>

          <p>Choose a convenient way to contact us</p>
          <Socials
            setSelectSocial={setSelectSocial}
            selectSocial={formData.selectSocial}
          />

          <div className="row-but">
            <button type="submit" className="but-1">
              Submit an application{' '}
              <div className="svg">
                <FaArrowRightLong color="#FFFFFF" />
              </div>
            </button>
            {/* Кнопка подяки зазвичай з'являється після успішного сабміту, тут вона просто для стилю */}
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
