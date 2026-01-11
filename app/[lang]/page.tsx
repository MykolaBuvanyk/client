import React from 'react';
import './Home.scss';
import { Locale } from '@/i18n.config';
import Main from '../components/home/Main';
import EndlessScroll from '../components/EndlessScroll/EndlessScroll';
import { getDictionary } from '@/lib/dictionary';
import WhyIt from '../components/WhyIt/WhyIt';
import Services from '../components/Services/Services';
import OurPortfolio from '../components/OurPortfolio/OurPortfolio';
import Reviews from '../components/Reviews/Reviews';
import Map from '../components/Map/Map';
import Contacts from '../components/Contacts/Contacts';
import Social from '../components/Social/Social';
import { disconnect } from 'process';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const dictionary = await getDictionary(lang);
  const { home, contacts, giftModal, mainAnimation } = dictionary;
  const whyItDictionary = home.WhyIt;

  return (
    <div className="home-container">
      <Main dictionary={home.main} giftModalDictionary={giftModal} mainAnimationDictionary={mainAnimation} />
      <EndlessScroll lang={lang} />
      <WhyIt dictionary={whyItDictionary} />
      <Services dictionary={home.Services} />
      <OurPortfolio dictionary={home.OurPortfolio} />
      <Reviews dictionary={home.Reviews} lang={lang} />
      <Map dictionary={home.Map} />
      <Contacts lang={lang} dictionary={contacts} />
      <Social />
    </div>
  );
};

export default page;
