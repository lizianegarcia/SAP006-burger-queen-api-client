import React from "react";
import {useState, useEffect} from 'react';
import "../../Styles/kitchen.css";
import { ConvertDate, ConvertTime } from './utils.js';
import HeaderKitchen from "../../components/header/HeaderKitchen";
import Button from "../../components/button/button";

function Kitchen() {
  const tokenUser = localStorage.getItem('token');
  const [PedidosAFazer, setPedidosAFazer] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        const pedidosPendentes = pedidos.filter(
          (itens) =>
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setPedidosAFazer(pedidosPendentes);
      });
  };

  useEffect(() => {
    listaPedidos();
  }, []);

  
    const handlePreparar = (pedido, e) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'preparing' };

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

  const handleFinalizar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

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
    
    <main >
<HeaderKitchen />
      <section className="orders-section">

      {PedidosAFazer.map((pedido) => {
        return (
          <div className="orders" key={pedido.id}   >
            <div className="details-client">
            <h3>Status: {pedido.status 
                  .replace('pending', 'Pendente')
                  .replace('preparing', 'Preparando...')}
              </h3>
              <p>Pedido nº {pedido.id}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Data: {ConvertDate(pedido.createdAt)} {ConvertTime(pedido.createdAt)}</p>
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
            <div className="buttons">
              <Button variant="tertiary"
                onClick={(e) => handlePreparar(pedido, e)}
              >
                PREPARAR
              </Button>
              <Button variant="quaternary"
                onClick=
{() => 
                  handleFinalizar(pedido)}
              >
                ENTREGAR
              </Button>
            </div>
          </div>
        );
      })}
      </section>
    </main>
  );
}

export default Kitchen;