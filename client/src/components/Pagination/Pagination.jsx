import React from "react";
import Styles from "../Pagination/Pagination.module.css";

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pokemonForPage,
  totalPokemon,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonForPage); i++) {
    pageNumbers.push(i);
  }

  const buttonPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const buttonNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPage = (numPage) => {
    setCurrentPage(numPage);
  };

  return (
    <nav className={Styles.pagination}>
      <button
        className={`${Styles.paginationprevious} ${
          currentPage === 1 ? Styles["isdisabled"] : ""
        }`}
        onClick={buttonPrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul className={Styles.paginationlist}>
        {pageNumbers.map((numPage) => (
          <li key={numPage}>
            <a
              className={`${Styles["paginationlink"]} ${
                currentPage === numPage ? Styles["iscurrent"] : ""
              }`}
              onClick={() => {
                onPage(numPage);
              }}
            >
              {numPage}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`${Styles["paginationnext"]} ${
          currentPage >= pageNumbers.length ? Styles["isdisabled"] : ""
        }`}
        onClick={buttonNext}
        disabled={currentPage === pageNumbers.length}
      >
        Next page
      </button>
    </nav>
  );
};
