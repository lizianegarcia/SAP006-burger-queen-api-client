import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import cafe from "../../assets/icons/cafe.png";
import lanche from "../../assets/icons/lanche.png"
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";
import ButtonMenu from "../../components/button/buttonIconsMenu";
import HeaderHall from "../../components/header/HeaderHall";
import HallInput from "../../components/input/HallIput";


function Hall() {
  const token = localStorage.getItem("token");
  const [menu, setMenu] = useState({}) // menu 
  const [client, setClient] = useState(''); // nome do cliente
  const [table, setTable] = useState(''); // numero da mesa
  const [summary, setSummary] = useState([]); //quantidade de um determinado item
  const [tab, setTab] = useState('breakfast');
  const [loading, setLoading] = useState(true);

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
      setMenu({
        breakfast,
        hamburguer, 
        drinks, 
        side
      })
      setLoading(false)   
      });
  }, [token])

  

  const addItem = (e, item) => {
    e.preventDefault()
    const quantityElement = summary.find(element => element === item)
    if (quantityElement) {
      quantityElement.qtd += 1
      setSummary(prevQuantidade => prevQuantidade.map(prevElem => prevElem.id === quantityElement.id ? quantityElement : prevElem))
    } else {
      item.qtd = 1;
      item.subtotal = item.price;
      setSummary([...summary, item]);
    }
  }

  const removeItem = (e, item) => {
    e.preventDefault();
    const quantityElement = summary.find(elemento => elemento === item)
    if (quantityElement.qtd !== 0) {
      quantityElement.qtd -= 1
      setSummary(prevLess => prevLess.map(lessPrev => lessPrev.id === quantityElement.id ? quantityElement : lessPrev))
    } else {
      
    }
  }

  const deleteItem = (e, item) => {
    e.preventDefault()
    item.remove()
  }

  useEffect(() => {
    console.log(summary)
  }, [summary])

  
 const calculateTotal = (items) => {
   
  const totalPrice = items.reduce((accumulator, array) => {
    const { qtd, price } = array;
    accumulator = Number(qtd * price + accumulator)
    return accumulator
  }, 0)

  return totalPrice;
 }

 const total = calculateTotal(summary)

 const showSummary = tab === 'summary';
 const showMenuTab = !showSummary && !loading;
  
  return (
    <div className="hall">
      <HeaderHall />
      <form className="menu-forms" >
        <main className="hall-page-main"> 
         <div className="menu-btn">
          <ButtonMenu 
            onClick={((e) => {
              e.preventDefault();
              // setBreakfast(menu)
              setTab('breakfast')
            })} src={cafe} 
          />

          <ButtonMenu
            onClick={((e) => {
              e.preventDefault();
              // setBreakfast(hamburguer)
              setTab('hamburguer')
            })} src={lanche} 
          />
          
          <ButtonMenu 
            onClick={((e) => {
              e.preventDefault();
              // setBreakfast(side);
              setTab('side')
            })} src={extras}  
          />
          
          <ButtonMenu  
            onClick={((e) => {
              e.preventDefault();
              // setBreakfast(drinks)
              setTab('drinks')
            })} src={bebidas} 
          />

          <button className="btn-menu" onClick={((e) => {
            e.preventDefault();
            // setBreakfast(quantity)
            setTab('summary')
          })}><img src={cifrao} alt="" className='img-menu' /></button>
        </div>
          <section className='restaurant-menu'>
              { showMenuTab && menu[tab].map((items) => (       
                  <div className="products">
                    <div key={items.id}>
                      <div className="all-day">
                        <div className='name-products'>
                          <ul>{items.name}</ul>
                        </div>
                        <div className="options">
                          <ul>{items.flavor}</ul>
                          <ul>{items.complement}</ul>
                        </div>
                        <ul > R$ {items.price},00</ul>
                        <div>
                          <button className="btn-add" onClick={(e) => addItem(e, items)}>+</button>
                          <button className="btn-less" onClick={(e) =>removeItem(e, items)}>-</button>  
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              } 
              {
                showSummary && <section className='order'>
                  <h1>Resumo do Pedido</h1> 
                  <div className="inputs">
                    <HallInput
                      name="client" 
                      placeholder="Digite o nome do cliente"
                      type="text" 
                      value={client} 
                      onChange={(event) =>
                      setClient(event.target.value)}  
                    />  
                    
                    <HallInput
                      name="number"   
                      placeholder="Mesa"
                      type="number"
                      min='0' 
                      max='20' 
                      value={table} 
                      onChange={(event) =>
                      setTable(event.target.value)} 
                    /> 
                  </div>
              <div className='summary-items'>
                <p>Item</p>
                <p>Preço</p>
                <p>Quantidade</p>
              </div>
              {summary.map(item =>
                <article>
                  <span className="summary-order">
                    <ol key={item.id}>
                    <p>{item.name}</p>
                    <p>{item.flavor}</p>
                    <p>{item.complement}</p>
                    </ol>
                    <p>R$ {item.price},00</p>
                    <p>{item.qtd}</p>
                    <button className="trash-btn" onClick={() => deleteItem(item.id)}>
                    x
                    </button>               
                  </span>
                </article>
              )}
              <p className="total">Total: R$ {total},00</p>
          </section>
              }
         </section>
        </main>  
      </form>  
    </div>
  )
  
}

export default Hall;