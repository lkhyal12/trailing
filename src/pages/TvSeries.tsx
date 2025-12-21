import React, { useEffect, useState } from "react";
import { fetchMedia, type TVShow } from "../utils";
import MediaContainer from "../component/MediaContainer";
import Pagonation from "../component/Pagonation";
import { useSearchParams } from "react-router-dom";
import Loader from "../component/loader/Loader";

const TvSeries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const [currentPage, setCurrentPage] = useState<number>(
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  );
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    const tvUrl = `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${currentPage}`;

    async function fetchShows() {
      setLoading(true);
      const result = await fetchMedia(tvUrl);
      if (typeof result === "string") setError(result);
      else setShows(result);
      setLoading(false);
      setSearchParams((prev) => {
        const sp = new URLSearchParams(prev);
        sp.set("page", String(currentPage));
        return sp;
      });
    }
    fetchShows();
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
      <h1 className="text-3xl text-white my-12 w-9/10 mx-auto ">TV Shows</h1>
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

export default TvSeries;
