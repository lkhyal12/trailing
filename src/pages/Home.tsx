import { useEffect, useRef, useState } from "react";
import { getPosterUrl, options } from "../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const Home = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result.results);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Something went wrong");
        }
      }
    }
    fetchMovies();
  }, []);
  if (error) return <h1>{error}</h1>;
  return (
    <div className="home flex flex-col justify-end min-h-dvh">
      <div className="pb-5">
        <h2 className="text-white homeTitle mb-30">Popular Movies</h2>

        <div className="homeMoviesConatiner bg-black/40 rounded-lg h-fit ml-10">
          {movies && <HomePopularMovies movies={movies} />}
        </div>
      </div>
    </div>
  );
};

export default Home;

function HomePopularMovies({ movies }: { movies: any }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerVisibileWidth, setContainerVisibleWidth] = useState<
    null | number
  >(null);
  const [wholeWidth, setWholeWidth] = useState<null | number>(null);
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(true);
  function handlePrev(): void {
    setShowNextArrow(true);
    setWholeWidth((prev) => {
      return prev! + containerVisibileWidth!;
    });
    if (currentIndex == 1) setShowPrevArrow(false);
    setCurrentIndex((prev) => prev - 1);
  }
  function handleNext(): void {
    setShowPrevArrow(true);
    setWholeWidth((p) => {
      const widthCalc = p! - containerVisibileWidth!;
      if (widthCalc <= containerVisibileWidth!) setShowNextArrow(false);
      return widthCalc;
    });
    setCurrentIndex((p) => p + 1);
  }
  useEffect(() => {
    if (containerVisibileWidth === null) {
      setContainerVisibleWidth((p) => containerRef.current?.offsetWidth || p);
    }
    if (wholeWidth === null) {
      setWholeWidth((p) => containerRef.current?.scrollWidth || p);
    }
  }, []);
  return (
    <div className="relative h-full">
      {showPrevArrow && (
        <ChevronLeft
          className="absolute top-1/2 left-5 -translate-y-1/2 cursor-pointer z-20"
          color="white"
          size={55}
          onClick={handlePrev}
        />
      )}
      {showNextArrow && (
        <ChevronRight
          className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer z-20"
          color="white"
          size={55}
          onClick={handleNext}
        />
      )}
      <div
        className="moviesContainer"
        ref={containerRef}
        style={{
          transform: `translateX(${currentIndex * -100}%)`,
        }}
      >
        <div className=" relative flex flex-nowrap items-center w-fit h-full ">
          {movies.map((movie: any) => {
            const movieTtile =
              movie.title.length > 15
                ? movie.title.slice(0, 14) + "..."
                : movie.title;
            const rating = movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A";
            return (
              <Link
                key={movie.id}
                className="movieCard p-2 rounded-lg"
                to={"/movie/" + String(movie.id)}
              >
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt=""
                  className="rounded-lg"
                />
                <div className="movieInfo mt-2 text-white">
                  <h3 className="movieName font-semibold text-base md:text-[18px] mb-2 text-white">
                    {movieTtile}
                  </h3>
                  <div className="movieDetails flex items-center gap-4">
                    <div className="movieDate font-semibold">
                      {movie.release_date.split("-")[0]}
                    </div>
                    <div className="movieRating font-semibold">
                      <span className="text-yellow-400">TMDB: </span>
                      {rating}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
