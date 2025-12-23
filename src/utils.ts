export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};
// const popularMoviesUrl =  https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage};
// src/utils/types.ts
export interface MediaBase {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface Movie extends MediaBase {
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}

export interface TVShow extends MediaBase {
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export function getPosterUrl(posterPath: string | undefined, size = "w500") {
  if (!posterPath)
    return "https://critics.io/img/movies/poster-placeholder.png ";
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

export async function fetchMedia<T>(url: string): Promise<T[] | string> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results as T[];
  } catch (e) {
    if (e instanceof Error) return e.message;
    return "Something went wrong";
  }
}

// debounce function

export function debounce(cb: Function, duration: number = 500): Function {
  let timer: number;
  return (...args: []) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      console.log(args);
      cb(...args);
    }, duration);
  };
}

export type GenreType = {
  id: number;
  name: string;
};

export async function fetchGenres(url: string) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.genres;
  } catch (e) {
    return null;
  }
}

export function generateGenres(
  genreIds: number[],
  genres: GenreType[]
): string[] {
  let genresArr: string[] = [];
  for (let gId of genreIds) {
    for (let g of genres) {
      if (g.id === gId) genresArr.push(g.name);
    }
  }
  return genresArr;
}

export async function fetchSearchMovies(
  query: string,
  setMovies: React.Dispatch<React.SetStateAction<any>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  isResultPage: boolean,
  currentPage: number
) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&page=${currentPage}`;
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!isResultPage) setMovies(data.results.slice(0, 5));
    return data;
  } catch (e) {
    if (e instanceof Error) setError(e.message);
  }
}
