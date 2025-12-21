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
