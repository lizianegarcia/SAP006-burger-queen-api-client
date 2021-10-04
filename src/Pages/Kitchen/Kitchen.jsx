import React from "react";
import {useState, useEffect} from 'react';
import "../../Styles/kitchen.css";
import HeaderKitchen from "../../components/header/HeaderKitchen";
import Button from "../../components/button/button";

function Kitchen() {
  const tokenUser = localStorage.getItem('token');
  const [preparerOrder, setPreparerOrder] = useState([]);
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
        const ordersPending = orders.filter((itens) => 
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setPreparerOrder(ordersPending);
      });
  })
 
    const handleStatusOrder = (idOrder, changeStatus) => {
      const status = { status: changeStatus };
    
      fetch(url + idOrder, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenUser}`,
        },
        body: JSON.stringify(status),
      })
      .then((response) => {
        response.json().then(() => {
          const order = preparerOrder
          return order
        });
      });
    };

  return (
    <main >
     <HeaderKitchen />
      <body className="orders-section">
       {preparerOrder.map((order) => {
         return (
          <section className="orders" key={order.id}>

            <article className="details-client">
              <h3 className="pending-orders"> {order.status 
                .replace('pending', '⏱️ Pendente')
                .replace('preparing', '⏳ Preparando')}
              </h3>
              <p className="order-number"> 📋 Pedido nº {order.id}</p>
              <p>Cliente: {order.client_name}</p>
              <p>Mesa: {order.table}</p>
              <time>Data: 
                {`${new Date(order.createdAt).toLocaleDateString('pt-br',)} - 
                  ${new Date(order.createdAt).toLocaleTimeString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }h`}
              </time> 
            </article>

            <article className="container-order">
              {order.Products.map((items, index) => (
                <div key={index}>
                  <p> {items.qtd} {items.name}</p>
                  <p>{items.flavor === 'null' ? '' : items.flavor}</p>
                  <p>{items.complement === 'null' ? '' : items.complement}</p>
                </div>
              ))}
            </article>

            <hr/>

            <div className="buttons">
              <Button 
                variant="tertiary"
                onClick={() => handleStatusOrder(order.id, 'preparing')}>
                PREPARAR
              </Button>

              <Button 
                variant="quaternary"
                onClick={() => handleStatusOrder(order.id, 'ready')}>
                ENTREGAR
              </Button>
            </div>
          </section>
         );
       })}
      </body>
    </main>
  );
}

export default Kitchen;