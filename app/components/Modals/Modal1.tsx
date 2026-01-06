import { useTranslation } from '@/app/context/TranslationProvider';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';

type Props = {
  next: any;
  close: any;
  setValue: any;
  value: string;
};
const Modal1 = ({ next, close, setValue, value }: Props) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('projectType', e.target.value);
  };

  return (
    <>
      <h2>{t('modal1.title')}</h2>
      <div onClick={close} className="close">
        <IoCloseSharp color="#fff" size={20} />
      </div>
      <div className="type">
        <label className="value">
          <input
            type="radio"
            name="project_type"
            value="landing"
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal1.landing')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="project_type"
            value="corporate"
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal1.corporate')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="project_type"
            value="online"
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal1.online')}
        </label>
        <label className="value">
          <input
            type="radio"
            name="project_type"
            value="other"
            onChange={handleChange}
          />
          <span className="custom-radio"></span>
          {t('modal1.other')}
        </label>
      </div>
      <div className="row">
        <button className="but1"></button>
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

export default Modal1;
