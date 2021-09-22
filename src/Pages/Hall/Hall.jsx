import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import cafe from "../../assets/icons/cafe.png";
import lanche from "../../assets/icons/lanche.png"
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";
// import HeaderMenu from "../../components/menu/headerBreakfest";


function Hall() {
  
  const [menu, setMenu] = useState([]);
  const [hamburguer, setHamburguer] = useState([]);
  const [side, setSide] = useState([]);
  const [drinks, setDrinks] = useState([]);
  // const [client, setClient] = useState('');
  // const [table, setTable] = useState('');
  const [breakfast, setBreakfast] = useState([]);
  const token = localStorage.getItem("token");
  const [quantity, setQuantity] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect (() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
        headers: {
            accept: 'application/json',
            Authorization: `${token}`,
       
        },
    })
    .then(response => response.json())
    .then((json) => {
      const breakfast = json.filter(item => item.type === 'breakfast')
      const hamburguer = json.filter(item => item.sub_type === 'hamburguer')
      const drinks = json.filter(item => item.sub_type === 'drinks')
      const side = json.filter(item => item.sub_type === 'side')
      setMenu(breakfast)
      setBreakfast(breakfast)
      setHamburguer(hamburguer)
      setDrinks(drinks)
      setSide(side)
       
      });
  }, [token])

  function quantityProducts(item) {
    const elementoExiste = quantity.find(element => element === item)
    if (elementoExiste) {
      elementoExiste.qtd += 1
      setQuantity(prevQuantidade => prevQuantidade.map(prevElem => prevElem.id === elementoExiste.id ? elementoExiste : prevElem))
    } else {
      item.qtd = 1;
      item.subtotal = item.price;
      setQuantity([...quantity, item]);
    }
  }

 
  
  return (
    <div className="hall">
      <form className="menu-forms" >
        <main className="hall-page-main">  
          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(menu)
          })}><img src={cafe} alt="" className='img-menu' /></button>

          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(hamburguer)
          })}><img src={lanche} alt="" className='img-menu' /></button>
          
          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(side);
          })}><img src={extras} alt="" className='img-menu' /></button>
          
          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(drinks)
          })}><img src={bebidas} alt="" className='img-menu' /></button>

          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            setBreakfast(total)
          })}><img src={cifrao} alt="" className='img-menu' /></button>
  
          <section className='Menu'>
           <div className='menuItens'> {
             breakfast.map((items) => {

              return (

                <div className="Produtos">
                  <div key={items.id}>
                    <div className="Allday">
                      <div className='nameProducts'>
                        <ul>{items.name}</ul>
                      </div>
                      <div className='sabor'>
                        <ul>{items.flavor}</ul>
                        <div>
                          <ul>{items.complement}</ul>
                        </div>
                      </div>
                      <ul >R$:{items.price},00</ul>
                      <button className="btnQtd" onClick={() => quantityProducts(items)}>+</button>
                  
                    </div>
                  </div>
                </div>
              )

            })
          } </div>

        </section>
          
        </main>
     
        
      </form>  
    </div>
  )
  
}

export default Hall;