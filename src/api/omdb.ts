import type {
  MovieDetails,
  MovieShort,
  OmdbDetailsResponse,
  OmdbSearchResponse,
  SearchParams,
} from '../types';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export type SearchResult = {
  movies: MovieShort[];
  total: number;
};

async function requestOmdb<T>(params: URLSearchParams, signal?: AbortSignal): Promise<T> {
  params.set('apikey', API_KEY);
  const response = await fetch(`${API_URL}?${params}`, { signal });

  // fetch не выбрасывает ошибку на 4xx и 5xx, поэтому проверяем статус сами
  if (!response.ok) {
    throw new Error(`Сервер ответил ошибкой ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(
  { query, type, year }: SearchParams,
  signal?: AbortSignal,
): Promise<SearchResult> {
  const params = new URLSearchParams({ s: query });
  if (type) params.set('type', type);
  if (year) params.set('y', year);

  const data = await requestOmdb<OmdbSearchResponse>(params, signal);

  if (data.Response === 'False') {
    // «Ничего не нашлось» — это не ошибка, а пустой результат
    if (data.Error === 'Movie not found!') {
      return { movies: [], total: 0 };
    }
    throw new Error(data.Error);
  }

  return { movies: data.Search, total: Number(data.totalResults) };
}

export async function getMovie(id: string, signal?: AbortSignal): Promise<MovieDetails> {
  const params = new URLSearchParams({ i: id, plot: 'full' });
  const data = await requestOmdb<OmdbDetailsResponse>(params, signal);

  if (data.Response === 'False') {
    // На несуществующий id OMDb отвечает «Incorrect IMDb ID.»
    throw new Error(data.Error === 'Incorrect IMDb ID.' ? 'Фильм не найден' : data.Error);
  }

  return data;
}
