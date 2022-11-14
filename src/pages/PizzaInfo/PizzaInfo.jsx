import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PizzaInfo = () => {
  const [dataPizza, setDataPizza] = React.useState();
  const { id } = useParams();
  React.useEffect(() => {
    async function getDataPizza() {
      try {
        const { data } = await axios.get(
          `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas/${id}`
        );
        setDataPizza(data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataPizza();
  }, []);
  if (!dataPizza) {
    return "Загружаю....";
  }

  return (
    <div className="container">
      <img src={dataPizza.imageUrl} alt="pizza" />
      <h1>{dataPizza.title}</h1>
      <p>{dataPizza.title}</p>
      <h4>{dataPizza.price}</h4>
    </div>
  );
};

export default PizzaInfo;
