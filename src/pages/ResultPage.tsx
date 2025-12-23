import React, { useEffect, useState } from "react";
import { fetchMedia, fetchSearchMovies, type Movie } from "../utils";
import MediaContainer from "../component/MediaContainer";
import Pagonation from "../component/Pagonation";
import { useSearchParams } from "react-router-dom";
import Loader from "../component/loader/Loader";

const ResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const query = searchParams.get("query");
  const [currentPage, setCurrentPage] = useState<number>(
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  console.log(movies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    // const generalMovies = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${currentPage}`;

    async function fetchMovies() {
      if (!query) return;
      setLoading(true);
      const result = await fetchSearchMovies(
        query,
        setMovies,
        setError,
        true,
        currentPage
      );
      setMovies(result.results);
      setTotalPages(result.total_pages);
      setLoading(false);
      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev);
        sp.set("page", String(currentPage));
        return sp;
      });
    }
    fetchMovies();
  }, [currentPage, query]);

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
      <h1 className="text-3xl text-white my-10 w-9/10 mx-auto pb-10">
        Search Result for: {query}
      </h1>
      <div>
        <div className="mb-8">
          {" "}
          <Pagonation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
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
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
