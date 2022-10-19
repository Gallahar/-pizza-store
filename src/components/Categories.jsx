import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (val) => {
    setActiveIndex(val);
  };
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCategory(0)}
          className={activeIndex === 0 ? "active" : ""}
        >
          Все
        </li>
        <li
          onClick={() => onClickCategory(1)}
          className={activeIndex === 1 ? "active" : ""}
        >
          Мясные
        </li>
        <li
          onClick={() => onClickCategory(2)}
          className={activeIndex === 2 ? "active" : ""}
        >
          Вегетарианская
        </li>
        <li
          onClick={() => onClickCategory(3)}
          className={activeIndex === 3 ? "active" : ""}
        >
          Гриль
        </li>
        <li>Острые</li>
        <li>Закрытые</li>
      </ul>
    </div>
  );
}

export default Categories;
