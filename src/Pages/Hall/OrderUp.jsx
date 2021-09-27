import React, {useEffect, useState} from "react";
import HeaderHall from "../../components/header/HeaderHall";

export const OrderUp = () => {
  const [order, setOrder] = useState("")
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
      const order = json.filter(item => item)
      // const nameClientOrder = json.filter(item => item.name)
      // const tableOrder = json.filter(item => item.table)
      // const dataOrder = json.filter(item => item.processedAt)
      // const productsOrder = json.filter(item => item.products)
      setOrder(order)
      // setLoading(false)   
      });
  }, [token])

  useEffect(() => {
    console.log(order)
  }, [order])

  return (
    <div>
      <HeaderHall />
     <h1>Pedidos Prontos</h1>

       {/* <section className='restaurant-menu'>
            {order.map((items) => (       
                  <div className="products" key={items.id}>
                    <div>
                      <div className="all-day">
                        <div className='name-products'>
                          <ul>{items.name}</ul>
                        </div>
                        <div className="options">
                          <ul>{items.flavor}</ul>
                          <ul>{items.complement}</ul>
                        </div>
                        <ul > R$ {items.price},00</ul>
                        <div className="btn-order-items">
                           <button className="btn-add" onClick={(e) => addItem(e, items)}>+</button> 
                           <div>{items.qtd}</div> 
                          <button className="btn-less" onClick={(e) =>removeItem(e, items)}>-</button>   
                        </div>
                      </div>
                    </div>
                  </div>
              ))
            }
      </section>  */}
    </div>
  );
};

export default OrderUp;