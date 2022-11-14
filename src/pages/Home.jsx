import React from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

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
  const categoryIndex = useSelector((state) => state.sorting.categoryIndex);
  const filterOrder = useSelector((state) => state.sorting.sort);
  const searchInput = useSelector((state) => state.sorting.search);
  const selectedPage = useSelector((state) => state.sorting.pagination);
  const isSearch = React.useRef(false);
  const [order, setOrder] = React.useState(false);
  const isComponentMounted = React.useRef(false);
  const getSortedPizzaData = () => {
    dispatch(
      fetchPizzasById({
        order,
        selectedPage,
        filterOrder,
        searchInput,
        categoryIndex,
      })
    );
  };

  const onClickSort = (obj) => {
    dispatch(setFilterOrder(obj));
  };

  const onClickCategory = (id) => {
    dispatch(setCategoryIndex(id));
  };

  React.useEffect(() => {
    if (isComponentMounted.current) {
      const queryString = qs.stringify({
        sort: filterOrder.sort,
        categoryIndex,
        selectedPage,
      });
      navigate(`?${queryString}`);
    }
    isComponentMounted.current = true;
  }, [categoryIndex, navigate, filterOrder, order, selectedPage]);

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
  }, [categoryIndex, searchInput, filterOrder, order, selectedPage, isSearch]);

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
        <Categories
          onClickCategory={onClickCategory}
          categoryIndex={categoryIndex}
        />
        <Sort
          filterOrder={filterOrder}
          onClickSort={onClickSort}
          order={order}
          setOrder={setOrder}
        />
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
