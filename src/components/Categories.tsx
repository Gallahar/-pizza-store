import React from "react";
import { setCategoryIndex } from "../redux/fliter/slice";
import { useDispatch } from "react-redux";

type TCategoryProps = {
  value: number;
};

const categoryArr: string[] = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const Categories: React.FC<TCategoryProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const onClickCategory: (param: number) => void = (id) => {
    dispatch(setCategoryIndex(id));
  };

  return (
    <div className="categories">
      <ul>
        {categoryArr.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
