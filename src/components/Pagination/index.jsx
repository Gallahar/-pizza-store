import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";
import { setPagination } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const currentPage = useSelector((state) => state.sorting.pagination);
  const dispatch = useDispatch();
  const onChangePaginationPage = (event) => {
    dispatch(setPagination(event.selected + 1));
  };
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onChangePaginationPage}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
