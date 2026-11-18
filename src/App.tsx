import { MovieList } from './components/MovieList';
import { SearchBar } from './components/SearchBar';
import { useMovieSearch } from './hooks/useMovieSearch';
import type { SearchState } from './hooks/useMovieSearch';
import './App.css';

export default function App() {
  const { state, search, retry } = useMovieSearch();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Каталог фильмов</h1>
        <SearchBar onSearch={search} />
      </header>

      <main>
        <SearchResults state={state} onRetry={retry} />
      </main>
    </div>
  );
}

type SearchResultsProps = {
  state: SearchState;
  onRetry: () => void;
};

function SearchResults({ state, onRetry }: SearchResultsProps) {
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
