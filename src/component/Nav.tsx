import { Search } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
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
    href: "popular",
    name: "Popular",
    id: 4,
  },
];

const Nav = () => {
  return (
    <>
      <nav className="bg-black/80 fixed left-0 right-0 w-screen h-18 z-50 flex items-center">
        <div className="w-9/10  mx-auto flex items-center">
          <div className="md:flex-1 flex items-center gap-20">
            <img src={logo} alt="" className="logo" />

            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  className="text-white/80 font-medium text-lg hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex-1 relative  py-1 px-3 rounded-xl bg-white w-50 md:w-80">
              <input
                type="text"
                placeholder="Search..."
                className=" w-full outline-none"
              />
              <Search
                className="absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer"
                size={18}
              />
            </div>
            <div className="w-9 h-9 bg-white rounded-full overflow-hidden"></div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
