import React, { useEffect, useState } from "react";
import { fetchMedia, type Movie } from "../utils";
import MediaContainer from "../component/MediaContainer";
import Pagonation from "../component/Pagonation";
import { useSearchParams } from "react-router-dom";
import Loader from "../component/loader/Loader";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const [currentPage, setCurrentPage] = useState<number>(
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const generalMovies = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}`;

    async function fetchMovies() {
      setLoading(true);
      const result = await fetchMedia(generalMovies);
      if (typeof result === "string") setError(result);
      else setMovies(result);
      setLoading(false);
      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev);
        sp.set("page", String(currentPage));
        return sp;
      });
    }
    fetchMovies();
  }, [currentPage]);

  if (error)
    return (
      <div className="h-dvh flex items-center justify-center text-3xl text-white font-semibold">
        {error}
      </div>
    );

  if (loading)
    return (
      <div className="h-dvh">
        <Loader size={50} borderBg="#333" borderColor="white" />{" "}
      </div>
    );
  return (
    <div className="mb-10  w-full mx-auto">
      <h1 className="text-3xl text-white my-10 w-9/10 mx-auto pb-10">Movies</h1>
      <div>
        <div className="mb-8">
          {" "}
          <Pagonation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={500}
          />
        </div>
        {movies.length > 0 && (
          <MediaContainer mediaArr={movies} isMovie={true} />
        )}

        <div className="mt-10">
          {" "}
          <Pagonation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
