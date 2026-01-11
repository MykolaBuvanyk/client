import { useTranslation } from '@/app/context/TranslationProvider';
import { RootState } from '@/app/store';
import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import SonSVG from '../../assest/Modal/sun.svg';
import { FaArrowRightLong } from 'react-icons/fa6';

interface Modal5Dict {
  thankYou: string;
  workingOnCalculation: string;
  giftCredited: string;
  backToMain: string;
}

type Props = { 
  finish: any; 
  close: any;
  dictionary: Modal5Dict;
};

const Modal5 = ({ finish, close, dictionary }: Props) => {
  const { t } = useTranslation();
  const { isPresent } = useSelector((state: RootState) => state.form);
  return (
    <>
      <div onClick={close} className="close">
        <IoCloseSharp color="#fff" size={20} />
      </div>
      <div className="i-text center">
        <div className="sun">
          <SonSVG />
        </div>
        <h2>{dictionary.thankYou}</h2>
        <p>
          {dictionary.workingOnCalculation}
        </p>
        {isPresent && (
          <button className="gift">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="22"
                height="22"
                rx="6.6"
                fill="url(#paint0_linear_461_9042)"
              />
              <path
                d="M18.5725 7.32855V9.04698C18.5725 9.22854 18.5004 9.40267 18.3721 9.53108C18.2437 9.65949 18.0696 9.73166 17.888 9.73173H4.11053C3.92901 9.7316 3.75497 9.6594 3.62666 9.531C3.49835 9.4026 3.42627 9.2285 3.42627 9.04698V7.32855C3.42633 7.14703 3.49847 6.97296 3.62683 6.8446C3.75518 6.71625 3.92925 6.64411 4.11078 6.64404H17.8883C18.0698 6.64411 18.2439 6.71625 18.3722 6.8446C18.5006 6.97296 18.5725 7.14703 18.5725 7.32855Z"
                fill="#151515"
              />
              <path
                d="M17.8324 9.73145V18.0802C17.8318 18.2616 17.7595 18.4354 17.6312 18.5637C17.5029 18.6919 17.329 18.7642 17.1476 18.7647H4.85223C4.67078 18.7642 4.49691 18.6919 4.3686 18.5636C4.2403 18.4353 4.16799 18.2614 4.16748 18.08V9.73145H17.8324Z"
                fill="#0C0C0D"
              />
              <path
                d="M9.44126 9.73173H12.5559V18.7652H9.44126V9.73173ZM9.17969 6.64404H12.8177V9.73173H9.17969V6.64404Z"
                fill="#FFDA63"
              />
              <path
                d="M11.0483 6.64279H10.2282C9.47353 5.16507 8.42044 4.65065 7.59544 4.49536C7.73133 5.8372 8.86449 6.64279 8.86449 6.64279H7.89147C6.20508 5.84448 6.29728 4.50021 6.29728 4.50021C6.33611 4.28183 6.43559 4.08771 6.56419 3.92029C7.03493 3.30396 7.86236 3.09286 8.6 3.33065C10.9877 4.09499 11.0483 6.64279 11.0483 6.64279Z"
                fill="#FFDA63"
              />
              <path
                d="M14.107 6.64279H13.134C13.134 6.64279 14.2672 5.8372 14.4031 4.49536C13.5781 4.65065 12.525 5.16507 11.7703 6.64279H10.9502C10.9502 6.64279 11.0133 4.09499 13.3985 3.33065C14.1362 3.09286 14.966 3.30396 15.4343 3.92029C15.5629 4.08771 15.6648 4.28183 15.7037 4.50021C15.7037 4.50021 15.7959 5.84448 14.107 6.64279Z"
                fill="#FFDA63"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_461_9042"
                  x1="0"
                  y1="11"
                  x2="22"
                  y2="11"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#D4AF37" />
                  <stop offset="1" stop-color="#FFDA63" />
                </linearGradient>
              </defs>
            </svg>
            {dictionary.giftCredited}
          </button>
        )}
        <div style={{ width: '100%' }} onClick={finish} className="finish">
          <p>
            {dictionary.backToMain}
          </p>
          <div className="svg">
            <FaArrowRightLong />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal5;
