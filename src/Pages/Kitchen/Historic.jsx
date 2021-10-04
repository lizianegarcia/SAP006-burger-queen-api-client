import HeaderKitchen from "../../components/header/HeaderKitchen";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";
import trash from "../../assets/icons/trash.png";
import ButtonMenu from "../../components/button/buttonIconsMenu";

export const Historic = () => {
  const [ordersAll, setOrdersAll] = useState([]);
  const tokenUser = localStorage.getItem('token');
  const url = 'https://lab-api-bq.herokuapp.com/orders/';

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        setOrdersAll(orders);
      });
  });
  
 
  const handleDelete = (idOrder) => { 
    const status = { status: 'ready' };
      fetch(url + idOrder, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenUser}`,
        },
        body: JSON.stringify(status),
      })
      .then((response) => {response.json()
      .then(() => {
        const order = ordersAll;
        return order;
      });
    });
  };

  const timePreparing = ( dataUpdated, dataCreated) => {
    const difference = Math.abs(new Date(dataUpdated) - new Date(dataCreated));
    return Math.floor(difference / 1000 / 60);
  } 
  
  return (
    <main>
      <HeaderKitchen />
      <body className="orders-section"> 
        {ordersAll.map((order) => {
          return (
            <article className="orders"  key={order.id}>

              <section className="details-client">
              <h3 className="historic-orders">
                {order.status
                  .replace('pending', '⏱️ Pendente')
                  .replace('ready', '✔️ Pronto')
                  .replace('finished', '🍽️ Finalizado')
                  .replace('preparing', '⏳ Preparando')
                }
              </h3>
                <p className="order-number">📋 Pedido nº {order.id}</p>
                <p>Cliente: {order.client_name}</p>
                <p>Mesa: {order.table}</p>
                {order.status === "ready" ? (<p>Tempo de preparação:{' '}{timePreparing(order.updatedAt, order.createdAt)} min</p>) : ""}
                <hr/> 
              </section>

              <section className="container-order">
                {order.Products.map((items, index) => (
                  <div key={index}>
                    <p>
                      {items.qtd} {items.name}
                    </p>
                    <p>{items.flavor === 'null' ? '' : items.flavor}</p>
                    <p>{items.complement === 'null' ? '' : items.complement}</p>
                  
                  </div>
                ))}
              </section>

              <hr className="break-line"/>

              <section>
                <button
                  className="btndelete"
                  onClick={() => handleDelete(order.id)} 
                > <img className="icontrash" src={trash} alt="" /> </button>
              </section>

            </article>
          );
        })}
      </body>
    </main>
  );
}

export default Historic;