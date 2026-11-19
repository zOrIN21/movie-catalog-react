import { useCallback, useEffect, useState } from 'react';
import { getMovie } from '../api/omdb';
import type { MovieDetails } from '../types';

export type DetailsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; movie: MovieDetails };

// Компонент, который использует хук, рендерится с key={id}, поэтому
// при переходе к другому фильму состояние создаётся заново и начинается с загрузки
export function useMovieDetails(id: string) {
  const [state, setState] = useState<DetailsState>({ status: 'loading' });
  // Счётчик попыток: увеличиваем его, чтобы эффект перезапустил запрос
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getMovie(id, controller.signal)
      .then((movie) => setState({ status: 'success', movie }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        setState({ status: 'error', message });
      });

    // Если пользователь ушёл со страницы до ответа, запрос отменяется
    return () => controller.abort();
  }, [id, attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((current) => current + 1);
  }, []);

  return { state, retry };
}
