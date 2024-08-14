import { useRouter, useSearchParams } from "next/navigation";
import router from 'next/router';
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function Pagination({page, setPage, isFirstPage, isLastPage}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // Define functions for navigating to the next and previous pages
  // These functions update the page query parameter in the URL
  const handleNextPage = () => {
    params.set("page", (page + 1).toString());
    const query = params.toString();

    router.push(`/post?${query}`);
  };

  const handlePrevPage = () => {
    params.set("page", (page - 1).toString());
    const query = params.toString();

    router.push(`/post?${query}`);
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination">
        <button
          disabled={isFirstPage}
          onClick={handlePrevPage}
          className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          onClick={handleNextPage}
          disabled={isLastPage}
          className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <span>Next</span>
          <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
