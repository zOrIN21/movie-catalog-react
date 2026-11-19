import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import type { SearchState } from '../hooks/useMovieSearch';
import type { SearchParams } from '../types';

type SearchPageProps = {
  state: SearchState;
  lastParams: SearchParams | null;
  onSearch: (params: SearchParams) => void;
  onRetry: () => void;
};

export function SearchPage({ state, lastParams, onSearch, onRetry }: SearchPageProps) {
  return (
    <>
      <SearchBar onSearch={onSearch} initialParams={lastParams} />
      <section className="search-page__results">
        <SearchResults state={state} onRetry={onRetry} />
      </section>
    </>
  );
}
