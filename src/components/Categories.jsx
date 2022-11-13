import React from "react";

const Categories = ({ onClickCategory, categoryIndex }) => {
  const categoryArr = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
