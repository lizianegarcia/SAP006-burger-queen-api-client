import HeaderHall from "../../components/header/HeaderHall";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";
import trash from "../../assets/icons/trash.png";

export const HistoricHall = () => {
  const [Pedidos, setPedidos] = useState([]);
  const tokenUser = localStorage.getItem('token');

  const listaPedidos = (tokenUser) => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        setPedidos(pedidos);
      });
  };

  useEffect(() => {
    listaPedidos(tokenUser);
  }, [tokenUser]);

 
  const handleExcluir = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos(tokenUser);
      });
    });
  };

  return (
    <main>
      <HeaderHall />
      <section className="orders-section"> 
      {Pedidos.map((pedido) => {
        return (
          <div className="orders"  key={pedido.id}>
            <div className="details-client">
            <h3 className="historic-orders">{pedido.status
                  .replace('pending', '⏱️ Pendente')
                  .replace('ready', '✔️ Pronto')
                  .replace('finished', '🍽️ Finalizado')
                  .replace('preparing', '⏳ Preparando')}
              </h3>
              
              <p className="order-number">📋 Pedido nº {pedido.id}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p>Mesa: {pedido.table}</p>
              <hr/> 
            </div>
            <section className="container-order">
              {pedido.Products.map((itens, index) => (
                <div key={index}>
                  <p>
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <hr/>
            <div>
              <button className="delete-btn"
                  onClick={() => handleExcluir(pedido)}>
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