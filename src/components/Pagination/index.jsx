import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";
import { selectFilter, setPagination } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const { pagination } = useSelector(selectFilter);
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
      forcePage={pagination - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
