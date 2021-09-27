import HeaderHall from "../../components/header/HeaderHall";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";
import Button from "../../components/button/button";


export const OrderUp = () => {
  const tokenUser = localStorage.getItem('token');
  const [PedidosProntos, setPedidosProntos] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const pedidosEntregar = products.filter((itens) =>
          itens.status.includes('ready')
        );
        setPedidosProntos(pedidosEntregar);
      });
  };

  
  useEffect(() => {
    listaPedidos();
  }, []);

  const handleEntregar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'finished' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos();
      });
    });
  };

  return (
    <main>
      <HeaderHall />
      <section className="orders-section">
        
        {PedidosProntos.map((pedido) => {
          return (
            <div className="orders" key={pedido.id}>
                <div className="details-client">
                <h3>Pedido nº {pedido.id}</h3>
                <p>Cliente: {pedido.client_name}</p>
                <p>Mesa: {pedido.table}</p>
            </div>
      
                <section>
                  {pedido.Products.map((itens, index) => (
                    <div key={index}>
                      <p>
                        {' '}
                        0{itens.qtd} {itens.name}
                      </p>
                      <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                      <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                    </div>
                  ))}
                </section>
                  <div className="buttons">
                    <Button variant="quaternary"
                      onClick={() => handleEntregar(pedido)}>
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