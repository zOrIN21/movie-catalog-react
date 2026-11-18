import { useState } from 'react';
import type { SearchParams, TypeFilter } from '../types';

type SearchBarProps = {
  onSearch: (params: SearchParams) => void;
};

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: '', label: 'Все типы' },
  { value: 'movie', label: 'Фильмы' },
  { value: 'series', label: 'Сериалы' },
  { value: 'episode', label: 'Эпизоды' },
];

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<TypeFilter>('');
  const [year, setYear] = useState('');

  const trimmedQuery = query.trim();

  function handleSubmit() {
    if (!trimmedQuery) return;
    onSearch({ query: trimmedQuery, type, year: year.trim() });
  }

  function handleTypeChange(value: string) {
    // Ищем значение среди вариантов вместо приведения через as
    const option = TYPE_OPTIONS.find((item) => item.value === value);
    if (option) setType(option.value);
  }

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        // Без preventDefault браузер перезагрузит страницу
        event.preventDefault();
        handleSubmit();
      }}
    >
      <input
        className="search-bar__query"
        type="search"
        placeholder="Название фильма, например Matrix"
        aria-label="Название фильма"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select
        aria-label="Тип"
        value={type}
        onChange={(event) => handleTypeChange(event.target.value)}
      >
        {TYPE_OPTIONS.map((option) => (
          <option key={option.value || 'all'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        className="search-bar__year"
        type="text"
        inputMode="numeric"
        pattern="\d{4}"
        maxLength={4}
        placeholder="Год"
        aria-label="Год выпуска"
        title="Четыре цифры, например 1999"
        value={year}
        onChange={(event) => setYear(event.target.value)}
      />

      <button type="submit" disabled={!trimmedQuery}>
        Найти
      </button>
    </form>
  );
}
