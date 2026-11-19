import { Link } from 'react-router';
import type { MovieShort } from '../types';
import { TYPE_LABELS } from '../labels';
import { Poster } from './Poster';

type MovieCardProps = {
  movie: MovieShort;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link className="movie-card" to={`/movie/${movie.imdbID}`}>
      <Poster src={movie.Poster} title={movie.Title} />

      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">
          {movie.Year} · {TYPE_LABELS[movie.Type]}
        </p>
      </div>
    </Link>
  );
}
