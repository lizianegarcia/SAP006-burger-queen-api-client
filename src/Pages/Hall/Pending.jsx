import React from "react";
import {useState, useEffect} from 'react';
import "../../Styles/kitchen.css";
import HeaderHall from "../../components/header/HeaderHall";

function Pending() {
  const token = localStorage.getItem('token');
  const [ordersToDo, setOrdersToDo] = useState([]);

  const ordersList = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        const ordersPending = orders.filter(
          (itens) =>
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setOrdersToDo(ordersPending);
      });
  };

  useEffect(() => {
    ordersList();
  }, []);

  return (
    <main >
<HeaderHall />
      <section className="orders-section">

      {ordersToDo.map((order) => {
        return (
          <div className="orders" key={order.id}   >
            <div className="details-client">
              <h3 className="pending-orders"> {order.status 
                .replace('pending', '⏱️ Pendente')
                .replace('preparing', '⏳ Preparando')}
              </h3>
              <p className="order-number">📋 Pedido nº {order.id}</p>
              <p>Cliente: {order.client_name}</p>
              <p>Mesa: {order.table}</p>
              <span>Data: {`${new Date(order.createdAt).toLocaleDateString('pt-br',
              )} - ${new Date(order.createdAt).toLocaleTimeString(
              'pt-br', {
               hour: '2-digit',
               minute: '2-digit',
              })}h`}</span>
            </div>
            <hr/>
            <section className="container-order">
              {order.Products.map((itens, index) => (
                <div key={index}>
                  <p>{itens.qtd} {itens.name}</p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <hr/>
          </div>
        );
      })}
      </section>
    </main>
  );
}

export default Pending;