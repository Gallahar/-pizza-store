import React from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.scss";

const PizzaInfo: React.FC = () => {
  const [dataPizza, setDataPizza] = React.useState<{
    imageUrl: string;
    title: string;
    description: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function getDataPizza() {
      try {
        const { data } = await axios.get(
          `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas/${id}`
        );
        setDataPizza(data);
      } catch (error) {
        alert("Не удалось загрузить пиццу!");
        return navigate("/");
      }
    }
    getDataPizza();
  }, []);
  if (!dataPizza) {
    return (
      <div className={styles.parent}>
        <p>Загружаю....</p>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      <h1>{dataPizza.title}</h1>
      <img src={dataPizza.imageUrl} alt="pizza" />
      <p>{dataPizza.description}</p>
      <Link to="/" className="button button--outline go-back-btn">
        <span>Вернуться на главную ?</span>
      </Link>
    </div>
  );
};

export default PizzaInfo;
