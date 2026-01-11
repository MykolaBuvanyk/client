import BreadCrumbs from '@/app/components/BreadCrumbs/BreadCrumbs';
import Contacts from '@/app/components/Contacts/Contacts';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import React from 'react';
import './Contacts.scss';

type Props = {
  params: { lang: Locale };
};

const page = async ({ params: { lang } }: Props) => {
  const { contacts } = await getDictionary(lang);
  return (
    <div className="contacts-container">
      <div className="bread">
        <BreadCrumbs
          lang={lang}
          listUrls={[{ name: contacts.title, url: 'contacts' }]}
        />
      </div>
      <Contacts lang={lang} dictionary={contacts} />
    </div>
  );
};

export default page;
