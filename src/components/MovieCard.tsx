import type { MovieShort, MovieType } from '../types';

const TYPE_LABELS: Record<MovieType, string> = {
  movie: 'Фильм',
  series: 'Сериал',
  episode: 'Эпизод',
  game: 'Игра',
};

type MovieCardProps = {
  movie: MovieShort;
};

export function MovieCard({ movie }: MovieCardProps) {
  const hasPoster = movie.Poster !== 'N/A';

  return (
    <article className="movie-card">
      {hasPoster ? (
        <img
          className="movie-card__poster"
          src={movie.Poster}
          alt={`Постер: ${movie.Title}`}
          loading="lazy"
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--empty">Нет постера</div>
      )}

      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">
          {movie.Year} · {TYPE_LABELS[movie.Type]}
        </p>
      </div>
    </article>
  );
}
