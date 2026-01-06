import { Locale } from '@/i18n.config';
import Link from 'next/link';
import React from 'react';
import { getLocalizedPath } from '../utils/getLocalizedPath';
import './BreadCrumbs.scss';

type Props = {
  listUrls: { name: string; url: string }[];
  lang: Locale;
};

const BreadCrumbs = ({ lang, listUrls }: Props) => {
  return (
    <ul id="bread-crumbs">
      <li>
        <Link href={getLocalizedPath(`/${lang}`, lang)}>Main</Link>
      </li>
      {listUrls.map((x, idx) => (
        <li key={idx}>
          <span>»</span>
          {idx + 1 == listUrls.length ? (
            x.name
          ) : (
            <Link href={x.url}>{x.name}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumbs;
