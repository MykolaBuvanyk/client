import { useTranslation } from '@/app/context/TranslationProvider';
import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
  beck: any;
  next: any;
  close: any;
  name: string;
  phone: string;
  email: string;
  setValue: any;
};

const Modal4 = ({ beck, next, close, name, phone, email, setValue }: Props) => {
  const { t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value); // заміни 'someField2' на потрібну назву поля
  };

  const [isDateTrue, setIsDateTrue] = useState(false);
  useEffect(() => {
    if (name.length > 0 && phone.length > 0 && email.length > 0) {
      setIsDateTrue(true);
    } else setIsDateTrue(false);
  }, [name, phone, email]);

  return (
    <>
      <h2>{t('modal4.title')}</h2>
      <div onClick={close} className="close">
        <IoCloseSharp color="#fff" size={20} />
      </div>
      <div className="i-text">
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder={t('modal4.place1') as string}
        />
        <input
          onChange={handleChange}
          name="phone"
          type="text"
          placeholder={t('modal4.place2') as string}
        />
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder={t('modal4.place3') as string}
        />
        <div className="but-finish">
          <button
            style={{ opacity: isDateTrue ? 1 : 0.4 }}
            onClick={() => {
              if (isDateTrue) next();
            }}
            className="finish"
          >
            {t('modal4.but')}
            <div className="svg">
              <FaArrowRightLong />
            </div>{' '}
          </button>
        </div>
      </div>
      <div className="row">
        <button onClick={beck} className="but1">
          <div className="svg">
            <FaArrowLeftLong color="#FFFFFF" />
          </div>{' '}
          {t('modal4.beck')}{' '}
        </button>
      </div>
    </>
  );
};

export default Modal4;
