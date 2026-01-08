import { useTranslation } from '@/app/context/TranslationProvider';
import React from 'react';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
  next: any;
  beck: any;
  close: any;
  setValue: (field: string, value: string) => void;
  value: string;
};

const Modal2 = ({ next, beck, close, setValue, value }: Props) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('terms', e.target.value); // заміни 'someField2' на потрібну назву поля
  };

  return (
    <>
      <h2>{t('modal2.title')}</h2>
      <div onClick={close} className="close">
        <IoCloseSharp color="#fff" size={20} />
      </div>
      <div className="type">
        <label className="value">
          <input
            type="radio"
            name="modal2_option"
            value="week"
            checked={value === 'week'}
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal2.week')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="modal2_option"
            value="2-3weeks"
            checked={value === '2-3weeks'}
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal2.2-3weeks')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="modal2_option"
            value="1-2"
            checked={value === '1-2'}
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal2.1-2')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="modal2_option"
            value="2-3"
            checked={value === '2-3'}
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal2.2-3')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="modal2_option"
            value="4"
            checked={value === '4'}
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal2.4')}
        </label>
      </div>
      <div className="row">
        <button onClick={beck} className="but1">
          <div className="svg">
            <FaArrowLeftLong color="#FFFFFF" />
          </div>{' '}
          {t('modal1.beck')}
        </button>
        <button
          style={{ opacity: value ? 1 : 0.4 }}
          onClick={() => {
            if (value) next();
          }}
          className="next"
        >
          {t('modal1.forward')}{' '}
          <div className="svg">
            <FaArrowRightLong color="#FFFFFF" />
          </div>
        </button>
      </div>
    </>
  );
};

export default Modal2;
