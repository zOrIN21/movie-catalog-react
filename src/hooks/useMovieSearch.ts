import { useCallback, useRef, useState } from 'react';
import { searchMovies } from '../api/omdb';
import type { MovieShort, SearchParams } from '../types';

// Одно поле status вместо нескольких флагов: невозможно оказаться
// одновременно в «загрузке» и в «ошибке»
export type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; movies: MovieShort[]; total: number };

export function useMovieSearch() {
  const [state, setState] = useState<SearchState>({ status: 'idle' });
  const controllerRef = useRef<AbortController | null>(null);
  const lastParamsRef = useRef<SearchParams | null>(null);

  const search = useCallback(async (params: SearchParams) => {
    // Новый поиск отменяет предыдущий запрос, чтобы старый ответ
    // не пришёл позже и не затёр свежие результаты
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    lastParamsRef.current = params;

    setState({ status: 'loading' });

    try {
      const result = await searchMovies(params, controller.signal);
      setState({ status: 'success', ...result });
    } catch (error) {
      if (controller.signal.aborted) return;
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      setState({ status: 'error', message });
    }
  }, []);

  const retry = useCallback(() => {
    if (lastParamsRef.current) {
      void search(lastParamsRef.current);
    }
  }, [search]);

  return { state, search, retry };
}
