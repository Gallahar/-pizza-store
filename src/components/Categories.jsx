import React from "react";
import { selectFilter, setCategoryIndex } from "../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const { categoryIndex } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const categoryArr = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id));
  };

  return (
    <div className="categories">
      <ul>
        {categoryArr.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(index)}
            className={categoryIndex === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
