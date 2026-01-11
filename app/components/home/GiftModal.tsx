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

interface GiftModalDict {
  gifts: string[];
  title: string;
  description: string;
  button: string;
  closeAriaLabel: string;
}

type Props = {
  dictionary: GiftModalDict;
};

const GiftModal = ({ dictionary }: Props) => {
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
              aria-label={dictionary.closeAriaLabel}
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
              {dictionary.gifts.map((x) => (
                <li key={x}>
                  <LeftLogo /> {x}
                </li>
              ))}
            </ul>
            <h2>{dictionary.title}</h2>
            <p>
              {dictionary.description}
            </p>
            <button onClick={getGift}>
              {dictionary.button}{' '}
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
