import type { MovieShort, OmdbSearchResponse, SearchParams } from '../types';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export type SearchResult = {
  movies: MovieShort[];
  total: number;
};

export async function searchMovies(
  { query, type, year }: SearchParams,
  signal?: AbortSignal,
): Promise<SearchResult> {
  const params = new URLSearchParams({ apikey: API_KEY, s: query });
  if (type) params.set('type', type);
  if (year) params.set('y', year);

  const response = await fetch(`${API_URL}?${params}`, { signal });

  // fetch не выбрасывает ошибку на 4xx и 5xx, поэтому проверяем статус сами
  if (!response.ok) {
    throw new Error(`Сервер ответил ошибкой ${response.status}`);
  }

  const data: OmdbSearchResponse = await response.json();

  if (data.Response === 'False') {
    // «Ничего не нашлось» — это не ошибка, а пустой результат
    if (data.Error === 'Movie not found!') {
      return { movies: [], total: 0 };
    }
    throw new Error(data.Error);
  }

  return { movies: data.Search, total: Number(data.totalResults) };
}
