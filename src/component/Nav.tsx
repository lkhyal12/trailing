import { ChevronRight, Search } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
import {
  debounce,
  fetchGenres,
  fetchSearchMovies,
  generateGenres,
  type GenreType,
  getPosterUrl,
  type Movie,
  options,
} from "../utils";
import { useEffect, useState } from "react";

type Genre = {
  id: number;
  name: string;
};
interface LinkType {
  href: string;
  name: string;
  id: number;
}
const navLinks: Array<LinkType> = [
  {
    href: "/",
    name: "Home",
    id: 1,
  },
  {
    href: "movies",
    name: "Movies",
    id: 2,
  },
  {
    href: "tv-series",
    name: "TV Series",
    id: 3,
  },
  {
    href: "/popular-movies",
    name: "Popular",
    id: 4,
  },
];

const debounceFun = debounce(
  (
    searchTerm: string,
    setMovies: React.Dispatch<React.SetStateAction<any>>,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => fetchSearchMovies(searchTerm, setMovies, setError, false, 1)
);

const Nav = () => {
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<any>();
  useEffect(() => {
    if (searchTerm) debounceFun(searchTerm.trim(), setMovies, setError);
  }, [searchTerm]);
  return (
    <>
      <nav className="bg-black/80 fixed left-0 right-0 w-screen h-18 z-50 flex items-center">
        <div className="w-[98%] sm:w-9/10  mx-auto flex items-center">
          <div className="md:flex-1 flex items-center gap-5 md:gap-20">
            <img src={logo} alt="" className="logo" />

            <div className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.href}
                  className="navLink text-white/80 font-medium text-lg hover:text-white"
                  end={true}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5 md:gap-10 basis-[70%] md:basis-[40%]">
            <div className="flex-1 relative  py-1 px-3 rounded-xl bg-white w-50 md:w-80">
              <input
                type="text"
                placeholder="Search..."
                className=" w-full outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer"
                size={18}
              />

              {movies && movies.length > 0 && searchTerm && (
                <SearchContainer
                  movies={movies}
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                />
              )}
            </div>
            <div className="w-9 h-9 bg-white rounded-full overflow-hidden"></div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

function SearchContainer({
  movies,
  setSearchTerm,
  searchTerm,
}: {
  movies: any;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}) {
  const [genres, setGenres] = useState<Array<GenreType>>([]);
  useEffect(() => {
    async function getGeners() {
      const response = await fetchGenres(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US"
      );
      if (response) setGenres(response);
    }
    getGeners();
  }, []);
  return (
    <div className="absolute top-[102%] right-[-30%] sm:right-0   p-1 w-[95vw] sm:w-90 z-50 bg-white flex flex-col gap-1 rounded-lg">
      <div className="w-full flex flex-col gap-2">
        {movies.map((m: Movie[]) => (
          <MovieResultCard
            movie={m}
            genres={genres}
            setSearchTerm={setSearchTerm}
            key={m.id}
          />
        ))}
      </div>
      <Link
        onClick={() => {
          setSearchTerm("");
        }}
        to={`/result?query=${searchTerm}`}
        className="bg-blue-700 flex items-center justify-center text-white py-2 font-medium rounded-lg"
      >
        View All Results <ChevronRight size={20} />
      </Link>
    </div>
  );
}

function MovieResultCard({
  movie,
  genres,
  setSearchTerm,
}: {
  movie: Movie[];
  genres: GenreType[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const genresArr = generateGenres(movie.genre_ids, genres);
  return (
    <Link
      to={"movie/" + movie.id}
      onClick={() => setSearchTerm("")}
      className="flex items-center gap-2"
    >
      <div className="w-16 p-1">
        <img
          className="rounded-lg"
          src={getPosterUrl(movie.poster_path)}
          alt=""
        />
      </div>
      <div className="movieInfo flex flex-col gap-2">
        <h3 className="font-semibold">{movie.title}</h3>
        <div className="flex items-center gap-5 text-sm">
          <span>{movie.release_date.split("-")[0]}</span>
          <span>{genresArr.join(", ")}</span>
        </div>
        <p className="text-blue-700 font-medium text-sm">Movie</p>
      </div>
    </Link>
  );
}
export default Nav;
