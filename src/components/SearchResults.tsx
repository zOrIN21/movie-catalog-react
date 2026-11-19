import type { SearchState } from '../hooks/useMovieSearch';
import { MovieList } from './MovieList';

type SearchResultsProps = {
  state: SearchState;
  onRetry: () => void;
};

export function SearchResults({ state, onRetry }: SearchResultsProps) {
  switch (state.status) {
    case 'idle':
      return <p className="message">Введите название фильма, чтобы начать поиск.</p>;

    case 'loading':
      return <p className="message">Загружаем фильмы…</p>;

    case 'error':
      return (
        <div className="message message--error" role="alert">
          <p>Не удалось загрузить фильмы: {state.message}</p>
          <button type="button" onClick={onRetry}>
            Повторить
          </button>
        </div>
      );

    case 'success':
      if (state.movies.length === 0) {
        return <p className="message">Ничего не найдено. Попробуйте изменить запрос или фильтры.</p>;
      }
      return (
        <>
          <p className="results-count">Найдено: {state.total}</p>
          <MovieList movies={state.movies} />
        </>
      );
  }
}
