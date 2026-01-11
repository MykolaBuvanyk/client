'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import './Modals.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { openOrCloseModal } from '@/app/store/reducers/formReducers';
import Modal5 from './Modal5';
import axios from 'axios';

interface ModalsDict {
  modal5: {
    thankYou: string;
    workingOnCalculation: string;
    giftCredited: string;
    backToMain: string;
  };
}

type Props = {
  dictionary: ModalsDict;
};

const Modals = ({ dictionary }: Props) => {
  const [selectModal, setSelectModal] = useState(1);
  const { isOpenModal, isPresent } = useSelector(
    (state: RootState) => state.form,
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    projectType: '', // для Modal1
    terms: '',
    focus: '',
    name: '',
    phone: '',
    email: '',
  });

  const next = async () => {
    // Якщо це остання модалка перед відправкою
    if (selectModal === 4) {
      const TG_TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
      const TG_CHAT = process.env.NEXT_PUBLIC_TG_CHAT;

      // Формуємо текст повідомлення
      const message = `
Нова заявка:
Тип проекту: ${formData.projectType || '-'}
Терміни: ${formData.terms || '-'}
Фокус: ${formData.focus || '-'}
Ім'я: ${formData.name || '-'}
Телефон: ${formData.phone || '-'}
Email: ${formData.email || '-'}
Подарок: ${isPresent ? 'так' : 'ні'}
    `;

      try {
        // Надсилаємо в Telegram
        const res = await axios.post(
          `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
          {
            chat_id: TG_CHAT,
            text: message,
          },
        );

        if (res.data.ok) {
        } else {
          alert('Помилка при надсиланні ❌');
          console.error(res.data);
        }
      } catch (error) {
        console.error(error);
        alert('Помилка при надсиланні ❌');
      }
    }

    // Переходимо на наступну модалку
    setSelectModal((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(openOrCloseModal(true));
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const beck = () => setSelectModal((prev) => prev - 1);

  const close = () => {
    setSelectModal(1);
    dispatch(openOrCloseModal(false));
  };

  const finish = () => {
    setSelectModal(1);
    close();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };
  useEffect(() => {}, [isOpenModal]);

  return (
    <AnimatePresence>
      {isOpenModal && (
        <motion.div
          className="modals-overlay"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <div className="modals-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectModal}
                // Додаємо класи модалки безпосередньо до motion.div
                className={`modal modal${selectModal}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Відео залишається всередині анімованого контейнера */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="services-bg-video"
                >
                  <source src="/video/modal.mp4" type="video/mp4" />
                </video>

                {selectModal === 1 && (
                  <Modal1
                    next={next}
                    close={close}
                    setValue={(field: any, value: any) =>
                      setFormData((prev) => ({ ...prev, [field]: value }))
                    }
                    value={formData.projectType}
                  />
                )}
                {selectModal === 2 && (
                  <Modal2
                    next={next}
                    beck={beck}
                    close={close}
                    setValue={(field: any, value: any) =>
                      setFormData((prev) => ({ ...prev, [field]: value }))
                    }
                    value={formData.terms}
                  />
                )}

                {selectModal === 3 && (
                  <Modal3
                    next={next}
                    beck={beck}
                    close={close}
                    setValue={(field: any, value: any) =>
                      setFormData((prev) => ({ ...prev, [field]: value }))
                    }
                    value={formData.focus}
                  />
                )}
                {selectModal === 4 && (
                  <Modal4
                    next={next}
                    beck={beck}
                    close={close}
                    name={formData.name}
                    phone={formData.phone}
                    email={formData.email}
                    setValue={(field: any, value: any) =>
                      setFormData((prev) => ({ ...prev, [field]: value }))
                    }
                  />
                )}
                {selectModal === 5 && <Modal5 finish={finish} close={close} dictionary={dictionary.modal5} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modals;
