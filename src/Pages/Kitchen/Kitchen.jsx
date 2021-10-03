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
      .then((pedidos) => {
        const pedidosPendentes = pedidos.filter((itens) => 
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setPreparerOrder(pedidosPendentes);
      });
  })
 
    const handleStatusOrder = (pedido, changeStatus) => {
      const id = pedido.id;
      const status = { status: changeStatus };
    
      fetch(url + id, {
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
       {preparerOrder.map((pedido) => {
         return (
          <section className="orders" key={pedido.id}>

            <article className="details-client">
              <h3 className="pending-orders"> {pedido.status 
                .replace('pending', '⏱️ Pendente')
                .replace('preparing', '⏳ Preparando')}
              </h3>
              <p className="order-number"> 📋 Pedido nº {pedido.id}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p>Mesa: {pedido.table}</p>
              <time>Data: 
                {`${new Date(pedido.createdAt).toLocaleDateString('pt-br',)} - 
                  ${new Date(pedido.createdAt).toLocaleTimeString('pt-br', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }h`}
              </time> 
            </article>

            <article className="container-order">
              {pedido.Products.map((itens, index) => (
                <div key={index}>
                  <p>
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </article>

            <hr/>
            
            <div className="buttons">
              <Button variant="tertiary"
                onClick={() => handleStatusOrder(pedido, 'preparing')}
              >
                PREPARAR
              </Button>
              <Button variant="quaternary"
                onClick=
                  {() => handleStatusOrder(pedido, 'ready')}>
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