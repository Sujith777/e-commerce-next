import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: PaginationBarProps) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        href={`?page=${page}`}
        className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""}`}
      >
        {page}
      </Link>
    );
  }
  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join sm:hidden flex items-center justify-center">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            <ChevronLeftIcon />
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            <ChevronRightIcon />
          </Link>
        )}
      </div>
    </>
  );
};

export default PaginationBar;
