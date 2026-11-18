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

// OMDb всегда отвечает статусом 200, а успех или ошибку пишет в поле Response
export type OmdbSearchResponse =
  | { Response: 'True'; Search: MovieShort[]; totalResults: string }
  | { Response: 'False'; Error: string };
