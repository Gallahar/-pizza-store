import React from "react";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFilter } from "../redux/fliter/selectors";
import { setParams } from "../redux/fliter/slice";

import { sortArr } from "../components/Sort";
import {
  ContentLoading,
  Categories,
  PizzaCard,
  Pagination,
  Sort,
} from "../components";

import { fetchPizzasById } from "../redux/pizzas/slice";
import { selectPizzaDataStatus } from "../redux/pizzas/selectors";
import { useAppDispatch } from "../redux/store";

type TParsedQuery = {
  pagination: string;
  categoryIndex: string;
  order: string;
  sort: string;
  searchInput: string;
};

const Home: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        searchInput,
        order: order ? "desc" : "",
      });
      navigate(`?${queryString}`);
    }
    isComponentMounted.current = true;
  }, [categoryIndex, searchInput, navigate, sort, order, pagination]);

  React.useEffect(() => {
    if (search) {
      const params = qs.parse(search.slice(1)) as TParsedQuery;

      const sort =
        sortArr.find((obj) => obj.sort === params.sort) || sortArr[0];

      dispatch(
        setParams({
          pagination: Number(params.pagination || "0"),
          categoryIndex: Number(params.categoryIndex || "0"),
          searchInput: params.searchInput || "",
          sort: sort,
          order: params.order,
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

  const renderedPizzas = pizzas.map((obj) => (
    <PizzaCard key={obj.id} {...obj} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryIndex} />
        <Sort sort={sort} order={order} />
      </div>
      <h2 className="content__title">
        {searchInput ? `Ищем пиццы по названию: ${searchInput}` : "Все пиццы"}
      </h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(10)].map((_, i) => <ContentLoading key={i} />)
          : renderedPizzas}
      </div>
      <Pagination pagination={pagination} />
    </div>
  );
};

export default Home;
