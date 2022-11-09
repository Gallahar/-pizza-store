import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryIndex,
  setFilterOrder,
  setParams,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortArr } from "../components/Sort";
import ContentLoading from "../components/PizzaCard/ContentLoading";
import PizzaCard from "../components/PizzaCard";

import ProductStorage from "../context";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryIndex = useSelector((state) => state.sorting.categoryIndex);
  const filterOrder = useSelector((state) => state.sorting.sort);
  const searchInput = useSelector((state) => state.sorting.search);
  const selectedPage = useSelector((state) => state.sorting.pagination);

  const [dataPizzas, setDataPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [order, setOrder] = React.useState(false);

  const onClickSort = (obj) => {
    dispatch(setFilterOrder(obj));
  };

  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id));
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      const sort = sortArr.find((obj) => obj.sort === params.sort);
      dispatch(
        setParams({
          ...params,
          sort,
        })
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    const getSortedPizzaData = async () => {
      const searching = searchInput ? `&search=${searchInput}` : "";
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          order
            ? `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${selectedPage}&l=4&${
                categoryIndex ? `category=${categoryIndex}&` : ""
              }sortBy=${filterOrder.sort}${searching}`
            : `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${selectedPage}&l=4&${
                categoryIndex ? `category=${categoryIndex}&` : ""
              }sortBy=${filterOrder.sort}&order=desc${searching}`
        );
        setDataPizzas(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSortedPizzaData();
    window.scrollTo(0, 0);
  }, [categoryIndex, searchInput, filterOrder, order, selectedPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sort: filterOrder.sort,
      categoryIndex,
      selectedPage,
    });
    navigate(`?${queryString}`);
  }, [categoryIndex, navigate, filterOrder, order, selectedPage]);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   const getSortedData = async () => {
  //     try {
  //       switch (selectedSort) {
  //         case 0:
  //           const sortedRating = await axios.get(
  //             `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?sortBy=rating&order=desc`
  //           );
  //           setDataPizzas(sortedRating.data);
  //           setIsLoading(false);
  //           break;
  //         case 1:
  //           const sortedPrice = await axios.get(
  //             "https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?sortBy=price&order=desc"
  //           );
  //           setDataPizzas(sortedPrice.data);
  //           setIsLoading(false);
  //           break;
  //         case 2:
  //           const sortedAlphabet = await axios.get(
  //             "https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?sortBy=title&order=asc"
  //           );
  //           setDataPizzas(sortedAlphabet.data);
  //           setIsLoading(false);
  //           break;
  //         default:
  //           break;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getSortedData();
  // }, [selectedSort]);

  const renderedPizzas = dataPizzas.map((obj) => (
    <PizzaCard key={obj.id} {...obj} />
  ));

  return (
    <ProductStorage.Provider
      value={{
        order,
        setDataPizzas,
        selectedPage,
        setIsLoading,
        isLoading,
        setOrder,
        dataPizzas,
      }}
    >
      <div className="container">
        <div className="content__top">
          <Categories
            onClickCategory={onClickCategory}
            categoryIndex={categoryIndex}
          />
          <Sort filterOrder={filterOrder} onClickSort={onClickSort} />
        </div>
        <h2 className="content__title">
          {searchInput ? `Ищем пиццы по названию: ${searchInput}` : "Все пиццы"}
        </h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(10)].map((_, i) => <ContentLoading key={i} />)
            : renderedPizzas}
        </div>
        <Pagination />
      </div>
    </ProductStorage.Provider>
  );
};

export default Home;
