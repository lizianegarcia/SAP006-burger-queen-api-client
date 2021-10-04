import HeaderHall from "../../components/header/HeaderHall";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";
import trash from "../../assets/icons/trash.png";

export const HistoricHall = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const ordersList = (token) => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((order) => {
        setOrders(order);
      });
  };

  useEffect(() => {
    ordersList(token);
  }, [token]);

  const handleDelete = (order) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = order.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        ordersList(token);
      });
    });
  };

  return (
    <main>
      <HeaderHall />
      <section className="orders-section"> 
      {orders.map((order) => {
        return (
          <div className="orders"  key={order.id}>
            <div className="details-client">
            <h3 className="historic-orders">{order.status
                .replace('pending', '⏱️ Pendente')
                .replace('ready', '✔️ Pronto')
                .replace('finished', '🍽️ Finalizado')
                .replace('preparing', '⏳ Preparando')}
            </h3>
              
              <p className="order-number">📋 Pedido nº {order.id}</p>
              <p>Cliente: {order.client_name}</p>
              <p>Mesa: {order.table}</p>
              <hr/> 
            </div>
            <section className="container-order">
              {order.Products.map((itens, index) => (
                <div key={index}>
                  <p>
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <hr className="break-line"/>
            <div>
              <button className="delete-btn"
                  onClick={() => handleDelete(order)}>
                    <img className="trash-icon" alt="" src={trash} />
              </button>
            </div>
          </div>
        );
      })}
   </section>
    </main>
  );
}

export default HistoricHall;