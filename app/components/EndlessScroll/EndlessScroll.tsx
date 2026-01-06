import { Locale } from '@/i18n.config';
import './EndlessScroll.scss';
import { getDictionary } from '@/lib/dictionary';

type Props = {
  lang: Locale;
};

const EndlessScroll = async ({ lang }: Props) => {
  const { listScroll } = await getDictionary(lang);

  // дублюємо список ДЛЯ БЕЗШОВНОЇ АНІМАЦІЇ
  const items = [...listScroll, ...listScroll];

  return (
    <div className="endless-scroll">
      <div className="scroll-wrapper">
        {items.map((text, i) => (
          <div className="item" key={i}>
            <h2>{text}</h2>
            <span>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndlessScroll;
