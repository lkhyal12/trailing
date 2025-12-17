import { ToastContainer } from "react-toastify";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

const App = () => {
  return (
    <>
      <div className="flex flex-col">
        <Nav />
        <main className=" pt-18 flex-1 w-screen">
          <h1 className="h-dvh">hello</h1>
        </main>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
