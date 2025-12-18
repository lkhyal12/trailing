import { ToastContainer } from "react-toastify";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <div className="flex flex-col">
        <Nav />
        <main className="bg-black pt-18 flex-1 w-screen">
          <Routes>
            <Route element={<Home></Home>} path="/" />
          </Routes>
        </main>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
