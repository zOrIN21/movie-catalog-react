import { Link, useParams } from 'react-router';
import { MovieInfo } from '../components/MovieInfo';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { NotFoundPage } from './NotFoundPage';

export function MoviePage() {
  const { id } = useParams();

  if (!id) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Link className="back-link" to="/">
        ← К результатам поиска
      </Link>
      {/* key сбрасывает состояние, если перейти с одного фильма на другой */}
      <MovieDetailsLoader key={id} id={id} />
    </>
  );
}

type MovieDetailsLoaderProps = {
  id: string;
};

function MovieDetailsLoader({ id }: MovieDetailsLoaderProps) {
  const { state, retry } = useMovieDetails(id);

  switch (state.status) {
    case 'loading':
      return <p className="message">Загружаем информацию о фильме…</p>;

    case 'error':
      return (
        <div className="message message--error" role="alert">
          <p>Не удалось загрузить фильм: {state.message}</p>
          <button type="button" onClick={retry}>
            Повторить
          </button>
        </div>
      );

    case 'success':
      return <MovieInfo movie={state.movie} />;
  }
}
