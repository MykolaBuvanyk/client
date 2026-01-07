'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import GiftImg from '../../assest/home/gift.avif';
import MouseSVG from '../../assest/home/mouse.svg';
import GiftSVG from '../../assest/Main/Gift.svg';
import LeftLogo from '../../assest/Main/leftLogo.svg';
import './GiftModal.scss';
import { MdArrowRightAlt } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  openOrCloseModal,
  setPresent,
} from '@/app/store/reducers/formReducers';

type Props = {};

const GiftModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const dispatch = useDispatch();

  const getGift = () => {
    dispatch(setPresent());
    dispatch(openOrCloseModal(true));
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          open();
        }}
        className="gift"
      >
        <Image
          style={{ cursor: 'pointer' }}
          width={90}
          height={90}
          src={GiftImg}
          alt="gift"
        />
        <div className="mouse">
          <MouseSVG />
        </div>
      </div>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="gift-modal-container">
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="gift-modal"
          >
            <button
              type="button"
              className="gift-modal-close"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <FaTimes size={20} />
            </button>
            <div className="gift-svg">
              <GiftSVG />
            </div>
            <ul>
              {[
                'SEO optimization of the website',
                'Website localization',
                'Connecting Google Analytics',
              ].map((x) => (
                <li key={x}>
                  <LeftLogo /> {x}
                </li>
              ))}
            </ul>
            <h2>A free gift for your website</h2>
            <p>
              Take your gift — and we will make your website more effective at
              no extra cost.
            </p>
            <button onClick={getGift}>
              Take your gift{' '}
              <div className="svg">
                <MdArrowRightAlt size={24} />
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftModal;
