export type MovieType = 'movie' | 'series' | 'episode' | 'game';

// Тип, по которому можно фильтровать поиск. Пустая строка — «все типы».
export type TypeFilter = Exclude<MovieType, 'game'> | '';

export type MovieShort = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: MovieType;
  Poster: string; // 'N/A', если постера нет
};

export type SearchParams = {
  query: string;
  type: TypeFilter;
  year: string;
};

// Подробная информация о фильме (запрос по imdbID). Любое текстовое поле
// может прийти как 'N/A', если данных нет.
export type MovieDetails = MovieShort & {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  imdbRating: string;
};

type OmdbError = { Response: 'False'; Error: string };

// OMDb всегда отвечает статусом 200, а успех или ошибку пишет в поле Response
export type OmdbSearchResponse =
  | { Response: 'True'; Search: MovieShort[]; totalResults: string }
  | OmdbError;

export type OmdbDetailsResponse = ({ Response: 'True' } & MovieDetails) | OmdbError;
