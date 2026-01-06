import React from 'react';
import './Privacy.scss';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import BreadCrumbs from '@/app/components/BreadCrumbs/BreadCrumbs';
import Image from 'next/image';
import ImgAvif from '../../assest/Privacy/main.avif';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { privacy } = await getDictionary(lang);
  return (
    <div className="privacy-container">
      <div className="col">
        <div className="text">
          <BreadCrumbs
            lang={lang}
            listUrls={[{ url: 'privacy-policy', name: privacy.title }]}
          />{' '}
          <h1 dangerouslySetInnerHTML={{ __html: privacy.title }} />
          <p dangerouslySetInnerHTML={{ __html: privacy.desc1 }} />
          <p dangerouslySetInnerHTML={{ __html: privacy.desc2 }} />
          <p dangerouslySetInnerHTML={{ __html: privacy.desc3 }} />
        </div>
        <Image src={ImgAvif} alt={privacy.title} />
      </div>
      <div className="all">
        <h2 dangerouslySetInnerHTML={{ __html: privacy.miniTitle }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.desc4 }} />
        <ul>
          {privacy.ul1.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
        <h2 dangerouslySetInnerHTML={{ __html: privacy.miniTitle2 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.desc5 }} />
        <ul>
          {privacy.ul2.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
        <h2 dangerouslySetInnerHTML={{ __html: privacy.miniTitle3 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p6 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p7 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p8 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p9 }} />
        <h2 dangerouslySetInnerHTML={{ __html: privacy.miniTitle4 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p10 }} />
        <ul>
          {privacy.ul3.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
        <p dangerouslySetInnerHTML={{ __html: privacy.p11 }} />
        <ul>
          {privacy.ul4.map((x, idx) => (
            <li key={idx}>{x}</li>
          ))}
        </ul>
        <p dangerouslySetInnerHTML={{ __html: privacy.p12 }} />
        <h2 dangerouslySetInnerHTML={{ __html: privacy.miniTitle5 }} />
        <p dangerouslySetInnerHTML={{ __html: privacy.p13 }} />
        <span dangerouslySetInnerHTML={{ __html: privacy.span }} />
      </div>
    </div>
  );
};

export default page;
