'use client';

import './WorldMapPartnership.scss';
import { useState } from 'react';
import GetOffer from '../../assest/Main/getOffer.svg';
import Link from 'next/link';

type Props = {
  dictionary: any;
};

const countries = [
  { name: 'USA', x: 170, y: 130 },
  { name: 'Canada', x: 130, y: 80 },
  { name: 'Brazil', x: 220, y: 250 },
  { name: 'UK', x: 330, y: 115 },
  { name: 'Poland', x: 360, y: 120 },
  { name: 'Germany', x: 350, y: 125 },
  { name: 'France', x: 330, y: 135 },
  { name: 'Spain', x: 320, y: 145 },
  { name: 'New Zealand', x: 660, y: 320 },
  { name: 'Australia', x: 590, y: 280 },
  { name: 'China', x: 550, y: 160 },
  { name: 'Japan', x: 600, y: 150 },
  { name: 'UAE', x: 430, y: 180 },
  { name: 'Ukraine', x: 370, y: 135 },
  { name: 'Italy', x: 350, y: 145 },
];

const WorldMapPartnership: React.FC<Props> = ({ dictionary }) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className={'worldMap'}>
      <h2 className={'worldMapTitle'}>{dictionary.title}</h2>
      <div className={'mapContainer'}>
        <div className={'mapBackground'}>
          {countries.map((country, index) => {
            const leftPercent = (country.x / 705) * 100;
            const topPercent = (country.y / 352) * 100;

            return (
              <div
                key={index}
                className={'mapPoint'}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
                onMouseEnter={() => setHoveredCountry(country.name)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                {hoveredCountry === country.name && (
                  <div className={'tooltip'}>{country.name}</div>
                )}
              </div>
            );
          })}
          <Link href={`#contacts`} className={'getOfferWrapper'}>
            <GetOffer className="getOfferSvg" />
            <div className="getOfferContent">
              <svg
                className="getOfferArrow"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 0.75H10.75M10.75 0.75V10.75M10.75 0.75L0.75 10.75"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>get an offer</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorldMapPartnership;
