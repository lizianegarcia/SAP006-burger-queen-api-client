import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import HeaderHall from "../../components/header/HeaderHall";

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

      <section className='tamplete-order'>
            {order.map((items) => (       
                  <div className="orders" key={items.id}>
                      <article className="">
                        <ul className='individualOrder'>
                          <li>Nome cliente:{items.client_name}</li>
                          <li>Mesa:{items.table}</li>
                          <time>Horário:{items.createdAt.slice(11,16)}</time>
                        </ul>
                        <ul className="choice-products">
                          {items.Products.map((product) => (
                          <ul className="choice-products">
                            <li>{product.name}</li>
                            <li>Qtd:{product.qtd}</li>
                          </ul>
                          ))
                          }
  
                        </ul>
                        <ul >Status:{items.status}</ul>
                       
                      </article>
                  </div>
              ))
            }
      </section>  
    </div>
  );
};

export default OrderUp;