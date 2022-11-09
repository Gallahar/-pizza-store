import React from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import searchSvg from "../../assets/img/search.svg";
import clearSvg from "../../assets/img/clear.svg";
import styles from "./Searching.module.scss";
import { setSearch } from "../../redux/slices/filterSlice";

const Searching = () => {
  const dispatch = useDispatch();
  const [str, setStr] = React.useState("");

  const updateChangeStr = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 200),
    []
  );
  const onSearchInput = (event) => {
    setStr(event.target.value);
    updateChangeStr(event.target.value);
  };

  const onClear = () => {
    setStr("");
    dispatch(setSearch(""));
  };

  return (
    <div className={styles.parent}>
      <img className={styles.lope} src={searchSvg} alt="поиск" />
      {str ? (
        <img
          className={styles.clear}
          src={clearSvg}
          alt="clear"
          onClick={onClear}
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        />
      ) : (
        ""
      )}
      <input
        value={str}
        onChange={onSearchInput}
        className={styles.input}
        placeholder="найдите пиццу..."
      />
    </div>
  );
};

export default Searching;
