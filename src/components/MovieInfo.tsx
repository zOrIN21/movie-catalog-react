import { TYPE_LABELS } from '../labels';
import type { MovieDetails } from '../types';
import { Poster } from './Poster';

type MovieInfoProps = {
  movie: MovieDetails;
};

// OMDb пишет 'N/A' там, где данных нет. Такие поля просто не показываем.
const hasValue = (value: string) => value.trim() !== '' && value !== 'N/A';

export function MovieInfo({ movie }: MovieInfoProps) {
  const meta = [movie.Year, TYPE_LABELS[movie.Type], movie.Runtime, movie.Genre].filter(hasValue);

  const facts = [
    { label: 'Режиссёр', value: movie.Director },
    { label: 'В ролях', value: movie.Actors },
    { label: 'Страна', value: movie.Country },
    { label: 'Язык', value: movie.Language },
    { label: 'Премьера', value: movie.Released },
    { label: 'Рейтинг MPAA', value: movie.Rated },
  ].filter((fact) => hasValue(fact.value));

  return (
    <article className="movie-info">
      <Poster className="movie-info__poster" src={movie.Poster} title={movie.Title} />

      <div className="movie-info__body">
        <h2 className="movie-info__title">{movie.Title}</h2>
        <p className="movie-info__meta">{meta.join(' · ')}</p>

        {hasValue(movie.imdbRating) && (
          <p className="movie-info__rating">
            IMDb <strong>{movie.imdbRating}</strong> / 10
          </p>
        )}

        {hasValue(movie.Plot) && <p className="movie-info__plot">{movie.Plot}</p>}

        {facts.length > 0 && (
          <dl className="movie-info__facts">
            {facts.map((fact) => (
              <div key={fact.label} className="movie-info__fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}
