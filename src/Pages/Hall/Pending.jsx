import React from "react";
import {useState, useEffect} from 'react';
import "../../Styles/kitchen.css";
import { ConvertDate, ConvertTime } from "../Kitchen/utils";
import HeaderHall from "../../components/header/HeaderHall";

function Pending() {
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


  return (
    
    <main >
<HeaderHall />
      <section className="orders-section">

      {PedidosAFazer.map((pedido) => {
        return (
          <div className="orders" key={pedido.id}   >
            <div className="details-client">
              <h3 className="pending-orders"> {pedido.status 
                .replace('pending', '⏱️ Pendente')
                .replace('preparing', '⏳ Preparando')}
              </h3>
              <p className="order-number">📋 Pedido nº {pedido.id}</p>
              <p>Cliente: {pedido.client_name}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Data: {ConvertDate(pedido.createdAt)} {ConvertTime(pedido.createdAt)}</p>
              <hr/> 
            </div>

            <section className="container-order">
              {pedido.Products.map((itens, index) => (
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