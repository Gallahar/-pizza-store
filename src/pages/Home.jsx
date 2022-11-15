import React from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setParams } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortArr } from "../components/Sort";
import ContentLoading from "../components/PizzaCard/ContentLoading";
import PizzaCard from "../components/PizzaCard";

import Pagination from "../components/Pagination";
import {
  fetchPizzasById,
  selectPizzaDataStatus,
} from "../redux/slices/pizzasSlice";

const Home = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pizzas, status } = useSelector(selectPizzaDataStatus);
  const { pagination, categoryIndex, sort, searchInput, order } =
    useSelector(selectFilter);
  const isSearch = React.useRef(false);

  const isComponentMounted = React.useRef(false);
  const getSortedPizzaData = () => {
    dispatch(
      fetchPizzasById({
        order,
        pagination,
        sort,
        searchInput,
        categoryIndex,
      })
    );
  };

  React.useEffect(() => {
    if (isComponentMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryIndex,
        pagination,
      });
      navigate(`?${queryString}`);
    }
    isComponentMounted.current = true;
  }, [categoryIndex, navigate, sort, order, pagination]);

  React.useEffect(() => {
    if (search) {
      const params = qs.parse(search.slice(1));
      const sort = sortArr.find((obj) => obj.sort === params.sort);
      dispatch(
        setParams({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getSortedPizzaData();
    }
    isSearch.current = false;
  }, [categoryIndex, searchInput, sort, order, pagination, isSearch]);

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

  const renderedPizzas = pizzas.map((obj) => (
    <PizzaCard key={obj.id} {...obj} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">
        {searchInput ? `Ищем пиццы по названию: ${searchInput}` : "Все пиццы"}
      </h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(10)].map((_, i) => <ContentLoading key={i} />)
          : renderedPizzas}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
