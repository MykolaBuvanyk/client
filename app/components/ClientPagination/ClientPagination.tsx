import React, { useEffect } from 'react';
import './ClientPagination.scss';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type Props = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  count: number;
  to?: string;
};

// Константа для визначення, скільки сусідніх сторінок показувати навколо поточної
const NEIGHBOR_COUNT = 1;

const ClientPagination = (props: Props) => {
  const router = useRouter();
  const { page, setPage, count, limit } = props;
  const totalPages = Math.ceil(count / limit);


  // Створюємо Set для унікального зберігання номерів сторінок, які ми хочемо показати
  const uniquePages = new Set<number>();

  // 1. Додаємо першу і останню сторінки
  uniquePages.add(1);
  uniquePages.add(totalPages);

  // 2. Додаємо сусідні сторінки навколо поточної (наприклад, 4, 5, 6 для page=5)
  for (let i = page - NEIGHBOR_COUNT; i <= page + NEIGHBOR_COUNT; i++) {
    if (i > 1 && i < totalPages) {
      uniquePages.add(i);
    }
  }

  // 3. Перетворюємо Set на відсортований масив
  const sortedPageNumbers = Array.from(uniquePages).sort((a, b) => a - b);

  // 4. Додаємо багатокрапку (...)
  const pages: (number | string)[] = [];
  let prevPage: number | null = null;

  sortedPageNumbers.forEach((p) => {
    // Якщо є пробіл більше ніж в одну сторінку, додаємо багатокрапку
    if (prevPage !== null && p > prevPage + 1) {
      pages.push('...');
    }
    pages.push(p);
    prevPage = p;
  });

  // --- Функції для навігації ---

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const goToPrev = () => {
    goToPage(page - 1);
  };

  const goToNext = () => {
    goToPage(page + 1);
  };


  useEffect(() => {
    if (props.to) router.push(`#${props.to}`);
  }, [page]);

  // --- Рендеринг елементів пагінації ---

  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="client-pagination-container">
      {/* Кнопка "Назад" */}
      <button
        className={`pagination-item next ${page != 1 ? 'disabled' : ''}`}
        onClick={goToPrev}
        disabled={page === 1}
      >
        <FaAngleLeft size={16} />
      </button>

      {/* Номери сторінок та багатокрапки */}
      {pages.map((p, index) => {
        if (typeof p === 'string') {
          return (
            // Важливо: для багатокрапки використовуйте індекс, оскільки це не унікальний номер сторінки
            <div key={`dots-${index}`} className="pagination-item dots">
              {p}
            </div>
          );
        }

        return (
          <button
            key={p}
            className={`pagination-item number ${p === page ? 'active' : ''}`}
            onClick={() => goToPage(p as number)}
            // Багатокрапка не повинна бути клікабельною, тому додано перевірку:
            disabled={typeof p !== 'number'}
          >
            {p}
          </button>
        );
      })}

      {/* Кнопка "Далі" */}
      <button
        className={`pagination-item next ${page === totalPages ? 'disabled' : ''}`}
        onClick={goToNext}
        disabled={page === totalPages}
      >
        <FaAngleRight size={16} />
      </button>
    </div>
  );
};

export default ClientPagination;
