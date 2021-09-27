import HeaderKitchen from "../../components/header/HeaderKitchen";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";

export const Historic = () => {
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
      <HeaderKitchen />
      <section className="orders-section"> 
      {Pedidos.map((pedido) => {
        return (
          <div className="orders"  key={pedido.id}>
            <div className="details-client">
            <h3>Status: {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </h3>
              <p>Pedido nº {pedido.id}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p>Mesa: {pedido.table}</p>
            </div>
            <section>
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
            <div>
              <button className="btn-delete"
                  onClick={() => handleExcluir(pedido)}> x
              </button>
            </div>
          </div>
        );
      })}
   </section>
    </main>
  );
}

export default Historic;