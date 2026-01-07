'use client';
import React from 'react';
import './Main.scss';
import { MdArrowRightAlt } from 'react-icons/md';
import MainAnimation from './MainAnimation';
import GiftModal from './GiftModal';
import { useRouter } from 'next/navigation';

type Props = {
  dictionary: any;
};

const Main = ({ dictionary }: Props) => {
  const router = useRouter();

  return (
    <div className="main-container">
      <div className="elem" />
      <div className="main">
        <div className="text-cont">
          <div className="text">
            <h1 dangerouslySetInnerHTML={{ __html: dictionary.title }} />
            <p dangerouslySetInnerHTML={{ __html: dictionary.description }} />
            <div className="row">
              <button onClick={() => router.push('#contacts')}>
                <span>{dictionary.button}</span>
                <MdArrowRightAlt className="svg" size={24} />
              </button>
              <GiftModal />
            </div>
          </div>
        </div>
        <MainAnimation />
      </div>
    </div>
  );
};

export default Main;
