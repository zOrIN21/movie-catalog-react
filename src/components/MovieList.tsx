import type { MovieShort } from '../types';
import { MovieCard } from './MovieCard';

type MovieListProps = {
  movies: MovieShort[];
};

export function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}
