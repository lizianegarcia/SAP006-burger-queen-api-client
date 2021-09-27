import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import HeaderHall from "../../components/header/HeaderHall";
import "../../Styles/orderup.css";

export const OrderUp = () => {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect (() => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
        headers: {
            accept: 'application/json',
            Authorization: `${token}`,
       
        },
    })
    .then(response => response.json())
    .then((json) => {
      const orders = json.filter(item => item)
      const orderProducts = json.filter(item => item.Products)
      console.log(orderProducts)
      setOrder(orders)
      setProducts(orderProducts)
      // setLoading(false)   
      });
  }, [token])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div>
      <HeaderHall />
     <h1>Pedidos Prontos</h1>

      <section className='templete-order'>
            {order.map((items) => (       
                  <div className="orders" key={items.id}>
                      <article className="">
                        <div className='details-client'>
                        <h3>Status: {items.status.replace('ready', 'Pronto')
                        .replace('pending', 'Pendente')
                        .replace('finished', 'Finalizado')

                        }
                        </h3>
                          <p>Cliente: {items.client_name}</p>
                          <p>Mesa: {items.table}</p>
                          <time>Horário: {items.createdAt.slice(11,16)}</time>
                        </div>
                        <div className="choice-products">
                          {items.Products.map((product) => (
                            <div>
                            <p> {product.qtd} {product.name}
                            </p>
                            </div>
                          ))
                          }
                          </div>
                       
                      </article>
                  </div>
              ))
            }
      </section>  
    </div>
  );
};

export default OrderUp;