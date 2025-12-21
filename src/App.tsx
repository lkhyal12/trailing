import { ToastContainer } from "react-toastify";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import PopularLayout from "./pages/popular/PopularLayout";
import PopularMovies from "./pages/popular/PopularMovies";
import PopularShows from "./pages/popular/PopularShows";

const App = () => {
  return (
    <>
      <div className="flex flex-col">
        <Nav />
        <main className="bg-black pt-18 flex-1 w-screen">
          <Routes>
            <Route element={<Home></Home>} path="/" />
            <Route element={<Movies />} path="/movies" />
            <Route element={<TvSeries />} path="/tv-series" />
            <Route element={<PopularLayout />}>
              <Route path="/popular-movies" element={<PopularMovies />} />
              <Route path="/popular-shows" element={<PopularShows />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
