import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

const Pagonation = ({
  currentPage,
  setCurrentPage,
  totalPages = 500,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      <div
        className={currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        <ChevronLeft
          color={currentPage == 1 ? "rgba(255, 255, 255, 0.15)" : "white"}
          size={30}
        />
      </div>

      <div className="flex items-center gap-3">
        <InnerPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      <div
        className={
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        <ChevronRight
          color={
            currentPage == totalPages ? "rgba(255, 255, 255, 0.15)" : "white"
          }
          size={30}
        />
      </div>
    </div>
  );
};
function InnerPagination({
  currentPage,
  setCurrentPage,
  totalPages = 500,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) {
  function createPagination(): (number | string)[] {
    const pagainationArr: (number | string)[] = [1];
    if (currentPage > 3) pagainationArr.push("leftElipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) pagainationArr.push(i);
    }
    if (totalPages > currentPage + 2) pagainationArr.push("rightElipsis");
    if (totalPages > 1) pagainationArr.push(totalPages);
    return pagainationArr;
  }
  const pagainationArr = createPagination();

  return pagainationArr.map((p) => {
    if (typeof p === "string")
      return (
        <div key={p} className="flex items-center text-white cursor-none">
          ...
        </div>
      );
    return (
      <div
        key={p}
        onClick={() => setCurrentPage(p)}
        className={
          p == currentPage
            ? "text-blue-950 bg-white font-semibold p-1 cursor-pointer rounded-xs"
            : "text-white font-semibold  p-1 cursor-pointer"
        }
      >
        {p}
      </div>
    );
  });
}
export default Pagonation;
