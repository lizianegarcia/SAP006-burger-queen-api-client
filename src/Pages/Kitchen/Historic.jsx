import HeaderKitchen from "../../components/header/HeaderKitchen";
import React, { useEffect, useState } from 'react';

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
    <main className="page" style={{display:  'block'}}>
      <HeaderKitchen />
      <section className="order-history" style={{gap: '2vh', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginInline: '50px',  }}> 
      {Pedidos.map((pedido) => {
        return (
          <div style={{ textTransform: 'uppercase',  backgroundColor: '#f5f5f5' , color: '#222', textAlign: 'center',
          borderRadius: '3px', position: 'relative', width: '29vw',padding: '30px 31px',}}  key={pedido.id}>
            <div className="details-client">
            <h3 style={{color: '#cf5e18'}}>Status: {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </h3>
              <p>Pedido nº {pedido.id}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Cliente: {pedido.client_name}</p>
            </div>
            <div className="details-status">
              
            </div>
            <section className="container-order scroll">
              {pedido.Products.map((itens, index) => (
                <div className="details-order-pending" key={index}>
                  <p>
                    {' '}
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <div>
              <button className="btn-delete" style={{ color: 'red'}}
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
  // return (
  //   <div>
  //     <HeaderKitchen />
  //    <h1>Histórico de Pedidos</h1> 
  //   </div>
  // );
// };

export default Historic;