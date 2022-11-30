import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";
import { setPagination } from "../../redux/fliter/slice";
import { useDispatch } from "react-redux";

type TPaginationProps = {
  pagination: number;
};

type PaginationEvent = {
  selected: number;
};

export const Pagination: React.FC<TPaginationProps> = React.memo(
  ({ pagination }) => {
    const dispatch = useDispatch();
    const onChangePaginationPage = (event: PaginationEvent) => {
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
      />
    );
  }
);
