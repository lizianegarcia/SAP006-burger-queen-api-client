import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import cafe from "../../assets/icons/cafe.png";
import lanche from "../../assets/icons/lanche.png"
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";
import Input from "../../components/input/input"
// import HeaderMenu from "../../components/menu/headerBreakfest";


function Hall() {
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState([]); // menu 
  const [breakfast, setBreakfast] = useState([]); // menu cafe da manha
  const [hamburguer, setHamburguer] = useState([]); //menu de hamburguers
  const [side, setSide] = useState([]); // menu de extras
  const [drinks, setDrinks] = useState([]); // menu de drinks
  const [client, setClient] = useState(''); // nome do cliente
  const [table, setTable] = useState(''); // numero da mesa
  const [quantity, setQuantity] = useState([]); //quantidade de um determinado item
  const [total, setTotal] = useState(0); //total do valor do pedido

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

  function quantityProducts(e, item) {
    e.preventDefault()
    const quantityElement = quantity.find(element => element === item)
    if (quantityElement) {
      quantityElement.qtd += 1
      setQuantity(prevQuantidade => prevQuantidade.map(prevElem => prevElem.id === quantityElement.id ? quantityElement : prevElem))
    } else {
      item.qtd = 1;
      item.subtotal = item.price;
      setQuantity([...quantity, item]);
    }
  }

  function clickLess(e, item) {
    e.preventDefault();
    const quantityElement = quantity.find(elemento => elemento === item)
    if (quantityElement.qtd != 0) {
      quantityElement.qtd -= 1
      setQuantity(prevLess => prevLess.map(lessPrev => lessPrev.id === quantityElement.id ? quantityElement : lessPrev))
    } else {
      
    }
  }
  function removeItem (e, item) {
    e.preventDefault()
    item.remove()
  }

  useEffect(() => {
    console.log(quantity)
  }, [quantity])

  useEffect(() => {
    
    setTotal(() => {
      const totalPrice = quantity.reduce((accumulator, array) => {
        const { qtd, price } = array;
        accumulator = Number(qtd * price + accumulator)
        return accumulator
      }, 0)
      console.log(quantity)
      return totalPrice;
    })
  }, [quantity]
  )
 
  
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
            setBreakfast(quantity)
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
                        <button className="btnQtd" onClick={(e) => quantityProducts(e, items)}>+</button>
                        <button className="btnQtd" onClick={(e) =>clickLess(e, items)}>-</button>  
                      </div>
                    </div>
                  </div>
                )

              })
            } </div>

         </section>
        

        
          <section className='order'>
            <h1>Resumo</h1>   
            <Input
              name="client" 
              placeholder="Digite o nome do cliente"
              type="text" 
              value={client} 
              onChange={(event) =>
              setClient(event.target.value)} 
            />

            <Input
              name="number"   
              placeholder="Mesa"
              type="number"
              min='0' 
              max='20' 
              value={table} 
              onChange={(event) =>
              setTable(event.target.value)} 
            /> 

              {quantity.map(item =>
                <article>
                  <span className="Map">
                    <ol className="ComplementItem" key={item.id}>
                    <p className='orderProducts'>{item.name}</p>
                    <p className='complement'>{item.flavor}</p>
                    <p className='complement'>{item.complement}</p>
                    </ol>
                    <p className='price'>R$:{item.price},00</p>
                    <p className='complementQtd'> {item.qtd}</p>
                    <button className="btn-delete" onClick={() => removeItem(item.id)}>X</button>               
                  </span>
                </article>
              
              )}
              <p className="total">Total: R$:{total},00</p>
           
          </section>
        )
        </main>  
      </form>  
    </div>
  )
  
}

export default Hall;