export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TMDB_API_KEY,
  },
};

export function getPosterUrl(posterPath: string | undefined, size = "w500") {
  if (!posterPath)
    return "https://critics.io/img/movies/poster-placeholder.png ";
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
