import { getPosterUrl, type Movie, type TVShow } from "../utils";
import { Link } from "react-router-dom";

type MediaContainerProps = {
  isMovie: boolean;
  mediaArr: Movie[] | TVShow[];
};
type MediaCardProps = {
  isMovie: boolean;
  media: Movie | TVShow;
};
const MediaContainer = ({ isMovie, mediaArr }: MediaContainerProps) => {
  return (
    <div className=" min-h-dvh w-[90%] mx-auto  grid m grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {mediaArr &&
        mediaArr.map((el) => {
          return <MediaCard isMovie={isMovie} media={el} />;
        })}
    </div>
  );
};

function MediaCard({ media, isMovie }: MediaCardProps) {
  let rawDate = isMovie ? media.release_date : media.first_air_date;
  let date = rawDate ? rawDate.split("-")[0] : "N/A";
  const rawTitle = isMovie ? media.title : media.name;

  const title =
    rawTitle && rawTitle.length > 20
      ? rawTitle.slice(0, 18) + "..."
      : rawTitle ?? "Untitled";

  const rating =
    media.vote_average !== undefined ? media.vote_average.toFixed(1) : "—";
  return (
    <Link to={"movie/" + String(media.id)} key={media.id} className="p-1">
      <img
        className="w-full rounded-lg h-8/10"
        src={getPosterUrl(media.poster_path)}
        alt=""
      />
      <h3 className="text-white text-sm md:text-base font-bold my-2">
        {title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-white font-semibold">{date}</p>
        <p className="font-semibold text-white">
          <span className="text-yellow-500">TMDB: </span>
          {rating}
        </p>
      </div>
    </Link>
  );
}
export default MediaContainer;
