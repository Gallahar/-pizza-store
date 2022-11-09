import React from "react";
import styles from "./styles.module.scss";

function NotFoundComp() {
  return (
    <div className={styles.notFound}>
      <span>🙁</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p>Такой страницы не существует в нашем онлайн-магазине</p>
    </div>
  );
}

export default NotFoundComp;
