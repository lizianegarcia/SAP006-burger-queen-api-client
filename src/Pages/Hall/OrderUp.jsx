import HeaderHall from "../../components/header/HeaderHall";
import React, { useEffect, useState } from 'react';


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
    <main style={{ display: 'block' }} className="page">
      <HeaderHall />
     <div component="h1" variant="h4" style={{paddingBottom: '20px', paddingRight: '50px', textAlign: 'center', fontWeight: 'bolder', color: '#ce5f18', marginLeft: '0.5rem' }}>
     Pedidos Prontos
        </div> 
      <section style={{  textTransform: 'uppercase',display: 'flex',flexWrap: 'wrap', justifyContent: 'space-around',
         width: '100%', textAlign: 'center', margin: '0 auto', gap: '3vw 10px' }}>
        
        {PedidosProntos.map((pedido) => {
          return (
            <section style={{width: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '3vw 10px',
            }} className="container-pending" key={pedido.id}>
             <div style={{   backgroundColor: '#f5f5f5' , color: '#222', textAlign: 'center',
    borderRadius: '3px', position: 'relative', width: '29vw',padding: '30px 31px',}}>
                <div className="details-client">
                <p>Cliente: {pedido.client_name}</p>
                <p>Mesa: {pedido.table}</p>
                  <p>Pedido nº {pedido.id}</p>
                        </div>
                <div className="details-status">
                </div>
                <section className="container-order scroll">
                  {pedido.Products.map((itens, index) => (
                    <div className="details-order-pending" key={index}>
                      <p>
                        {' '}
                        0{itens.qtd} {itens.name}
                      </p>
                      <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                      <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                    </div>
                  ))}
                </section>
                <div>
                  <button content="Servir"
                    className="btn-finalizar"
                    onClick={() => handleEntregar(pedido)}
                  >
                    SERVIR
              </button>
                </div>
                 </div>
          </section>
        
          );
        })}
      </section>
    </main>
  );
};


//   return (
//     <div>
//       <HeaderHall />
//      <h1>Pedidos Prontos</h1> 
//     </div>
//   );
// };

export default OrderUp;