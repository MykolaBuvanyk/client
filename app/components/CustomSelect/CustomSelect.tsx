'use client';

import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.scss';

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode; // <option>...</option>
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const options = React.Children.toArray(children) as React.ReactElement[];

  const selectedLabel =
    options.find((o) => o.props.value === value)?.props.children || '';

  // Клік поза елементом
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Вибір опції
  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div
      className={`select-cont ${open ? 'open' : ''}`}
      ref={wrapRef}
      onClick={() => setOpen((prev) => !prev)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setOpen((prev) => !prev);
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      {/* Відображення вибраного значення */}
      <div className="select-display">{selectedLabel}</div>

      {/* Dropdown */}
      {open && (
        <ul onClick={(e) => e.stopPropagation()} className="select-options">
          {options.map((opt) => (
            <li
              key={opt.props.value}
              className={`option-item ${
                opt.props.value === value ? 'selected' : ''
              }`}
              onClick={() => {
                handleSelect(opt.props.value);
              }}
            >
              {opt.props.children}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
