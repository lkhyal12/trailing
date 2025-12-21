import { NavLink, Outlet, useLocation } from "react-router-dom";

const PopularLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex items-center gap-5 pl-15 text-white my-10">
        <NavLink
          className={
            pathname == "/popular-movies"
              ? "font-medium underline underline-offset-5 text-[17px]"
              : "font-medium text-[17px]"
          }
          to="/popular-movies"
        >
          Movies
        </NavLink>
        <NavLink
          to="/popular-shows"
          className={
            pathname == "/popular-shows"
              ? "font-medium underline underline-offset-5 text-[17px]"
              : "font-medium text-[17px]"
          }
        >
          Shows
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default PopularLayout;
