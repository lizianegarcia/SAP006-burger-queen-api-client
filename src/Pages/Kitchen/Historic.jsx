import HeaderKitchen from "../../components/header/HeaderKitchen";
import React, { useEffect, useState } from 'react';
import "../../Styles/kitchen.css";
import trash from "../../assets/icons/trash.png";

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
        const dataUpdated = new Date(pedido.updatedAt);
        const dataCreated = new Date(pedido.createdAt);
        const difference = Math.abs(dataUpdated) - dataCreated;
        const minutes = Math.floor(difference / 1000 / 60);
        return (
          <div className="orders"  key={pedido.id}>
            <div className="details-client">
            <h3>Status: {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}    
              </h3>{pedido.status === "ready" ? (<p>Tempo de preparação:{' '}{ minutes} min</p>) : ""}
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

export default Historic;