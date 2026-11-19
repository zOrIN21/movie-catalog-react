import { Link, Route, Routes } from 'react-router';
import { useMovieSearch } from './hooks/useMovieSearch';
import { MoviePage } from './pages/MoviePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SearchPage } from './pages/SearchPage';
import './App.css';

export default function App() {
  // Состояние поиска живёт здесь, выше маршрутов: при переходе на страницу
  // фильма и обратно результаты и поля формы не теряются
  const { state, lastParams, search, retry } = useMovieSearch();

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <Link to="/">Каталог фильмов</Link>
        </h1>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                state={state}
                lastParams={lastParams}
                onSearch={search}
                onRetry={retry}
              />
            }
          />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
