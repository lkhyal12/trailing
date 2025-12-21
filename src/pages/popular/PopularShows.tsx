import Pagonation from "../../component/Pagonation";
import MediaContainer from "../../component/MediaContainer";
import Loader from "../../component/loader/Loader";
import { useSearchParams } from "react-router-dom";
import { fetchMedia, type Movie, type TVShow } from "../../utils";
import { useEffect, useState } from "react";

const PopularShows = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const [currentPage, setCurrentPage] = useState<number>(
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  );
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${currentPage}`;

    async function fetchMovies() {
      setLoading(true);
      const result = await fetchMedia(url);
      if (typeof result === "string") setError(result);
      else setShows(result);
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
      <h1 className="text-3xl text-white my-10 w-9/10 mx-auto ">
        Popular Shows
      </h1>
      <div>
        <div className="mb-8">
          {" "}
          <Pagonation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={500}
          />
        </div>
        {shows.length > 0 && (
          <MediaContainer mediaArr={shows} isMovie={false} />
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

export default PopularShows;
