import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import searchSvg from "../../assets/img/search.svg";
import clearSvg from "../../assets/img/clear.svg";
import styles from "./Searching.module.scss";
import { setSearch } from "../../redux/fliter/slice";
import { selectFilter } from "../../redux/fliter/selectors";
import { RootStore } from "../../redux/store";

export const Searching: React.FC = memo(() => {
  const searchInput = useSelector(
    (state: RootStore) => selectFilter(state).searchInput
  );
  const dispatch = useDispatch();
  const [str, setStr] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement|null>(null);

  const onclickLoop = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  React.useEffect(() => {
    if (searchInput) {
      setStr(searchInput);
    }
  }, [searchInput]);

  const updateChangeStr = React.useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearch(str));
      }, 200),
    [dispatch]
  );
  const onSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStr(event.target.value);
    updateChangeStr(event.target.value);
  };

  const onClear = () => {
    setStr("");
    dispatch(setSearch(""));
  };

  return (
    <div className={styles.parent}>
      <img
        className={styles.lope}
        src={searchSvg}
        onClick={onclickLoop}
        alt="поиск"
      />
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
      ) : null}
      <input
        ref={inputRef}
        value={str}
        onChange={onSearchInput}
        className={styles.input}
        placeholder="найдите пиццу..."
      />
    </div>
  );
});
