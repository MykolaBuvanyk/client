import { useTranslation } from '@/app/context/TranslationProvider';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
  next: any;
  beck: any;
  close: any;
  setValue: (field: string, value: string) => void;
  value: string;
};

const Modal3 = ({ next, beck, close, setValue, value }: Props) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('focus', e.target.value); // заміни 'someField2' на потрібну назву поля
  };
  return (
    <>
      <h2>{t('modal3.title')}</h2>
      <div onClick={close} className="close">
        <IoCloseSharp color="#fff" size={20} />
      </div>
      <div className="i-text">
        <input
          onChange={handleChange}
          type="text"
          placeholder={t('modal3.place') as string}
        />
      </div>{' '}
      <div className="row">
        <button onClick={beck} className="but1">
          <div className="svg">
            <FaArrowLeftLong color="#FFFFFF" />
          </div>{' '}
          {t('modal1.beck')}{' '}
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

export default Modal3;
