import { Link } from "react-router-dom";

interface LinkType {
  href: string;
  name: string;
  id: number;
}
const navLinks: Array<LinkType> = [
  {
    href: "home",
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
    <nav className="bg-black/80 fixed left-0 right-0 w-screen h-18 z-50 flex items-center">
      <div className="w-9/10  mx-auto flex items-center">
        <div className="md:flex-1 flex items-center gap-20">
          <h1 className="text-blue-800 uppercase  cursor-pointer font-bold text-3xl">
            Trailing
          </h1>

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
      </div>
    </nav>
  );
};

export default Nav;
