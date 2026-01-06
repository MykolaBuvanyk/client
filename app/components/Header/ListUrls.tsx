import React from 'react';
import './ListUrls.scss';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

const ListUrls = async ({ lang }: { lang: Locale }) => {
  const { header } = await getDictionary(lang);
  const urls = Object.keys(header.urls) as Array<keyof typeof header.urls>;

  return (
    <ul className="list-urls">
      {urls.map((x) => (
        <li key={x}>
          <Link href={`${x}`}>{header.urls[x]}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ListUrls;
