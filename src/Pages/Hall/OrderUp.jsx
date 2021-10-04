import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import HeaderHall from "../../components/header/HeaderHall";
import "../../Styles/kitchen.css";
import Button from "../../components/button/button";

export const OrderUp = () => {
  const token = localStorage.getItem('token');
  const [ordersReady, setOrdersReady] = useState([]);

  const ordersList = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const orderUp = products.filter((itens) =>
          itens.status.includes('ready')
        );
        setOrdersReady(orderUp);
      });
  };

  useEffect(() => {
    ordersList();
  }, []);

  const handleDelivery = (order) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = order.id;
    const status = { status: 'finished' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        ordersList();
      });
    });
  };

  return (
    <main>
      <HeaderHall />
      <section className="orders-section">
        
        {ordersReady.map((order) => {
           const dataUpdated = new Date(order.updatedAt);
           const dataCreated = new Date(order.createdAt);
           const difference = Math.abs(dataUpdated) - dataCreated;
           const minutes = Math.floor(difference / 1000 / 60);
          return (
            <div className="orders" key={order.id}>
              <div className="details-client">
                  <h3 className="order-up"> {order.status 
                  .replace('ready', 'Pronto  ✔️')}
                  </h3>
                  <p className="order-number"> 📋 Pedido nº {order.id}</p>
                  <p> Cliente: {order.client_name}</p>
                  <p>Mesa: {order.table}</p>
                  {order.status === "ready" ? (<p>Tempo de preparação:{' '}{ minutes} min</p>) : ""}
                  <hr/> 
              </div>
              <section className="container-order">
                  {order.Products.map((itens, index) => (
                    <div key={index}>
                      <p>{itens.qtd} {itens.name}
                      </p>
                      <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                      <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                    </div>
                  ))}
               </section>
               <hr className="break-line" />
                <div className="serve-button">
                    <Button variant="quaternary"
                      onClick={() => handleDelivery(order)}>
                      Servir
                    </Button>
                </div>
             </div>
          );
        })}
      </section>
    </main>
  );
};

export default OrderUp;