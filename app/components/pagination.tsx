"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const isMobile = windowWidth ? windowWidth <= 640 : false;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generatePaginationButtons = () => {
    const buttons = [];
    if (isMobile) {
      buttons.push(
        <Button
          key="prev"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-md border hover:bg-muted"
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
      );

      buttons.push(
        <span
          key="current"
          className="flex items-center justify-center px-3 h-9 text-sm font-medium"
        >
          {currentPage} / {totalPages}
        </span>
      );

      buttons.push(
        <Button
          key="next"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-md border hover:bg-muted"
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      );

      return buttons;
    }

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted"
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
    );

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          onClick={() => onPageChange(1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === 1
              ? "bg-muted text-muted-foreground"
              : "hover:bg-muted"
          }`}
        >
          1
        </Button>
      );

      if (startPage > 2) {
        buttons.push(
          <span
            key="ellipsis-start"
            className="w-10 h-10 flex items-center justify-center text-muted-foreground"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === i ? "bg-[#1f3044] text-white " : "hover:bg-muted"
          }`}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span
            key="ellipsis-end"
            className="w-10 h-10 flex items-center justify-center text-muted-foreground"
          >
            ...
          </span>
        );
      }

      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          onClick={() => onPageChange(totalPages)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border ${
            currentPage === totalPages
              ? "bg-muted text-muted-foreground"
              : "hover:bg-muted"
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-md border hover:bg-muted"
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    );

    return buttons;
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-1">
      {generatePaginationButtons()}
    </div>
  );
}
