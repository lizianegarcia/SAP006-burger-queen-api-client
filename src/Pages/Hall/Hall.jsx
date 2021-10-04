import React, {useEffect, useState} from "react";
import "../../Styles/hall.css";
import cafe from "../../assets/icons/cafe.png";
import lanche from "../../assets/icons/lanche.png"
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";
import trash from "../../assets/icons/trash.png";
import ButtonMenu from "../../components/button/buttonIconsMenu";
import HeaderHall from "../../components/header/HeaderHall";
import HallInput from "../../components/input/HallIput";
import Button from "../../components/button/button";
import Order from "../../Api/postOrder";


function Hall() {
  const token = localStorage.getItem('token');
  const [menu, setMenu] = useState({});
  const [client, setClient] = useState(''); 
  const [table, setTable] = useState(''); 
  const [summary, setSummary] = useState([]);
  const [tab, setTab] = useState('breakfast');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    client: '',
    table: '',
    summary: '',
  });


  useEffect (() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
        headers: {
          'Content-Type': 'application/json',
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

  
  const deleteItem = (index) => {
      const list = summary
      list.splice(index, 1)
      setSummary([...list])
  } 

  const addItem = (e, item) => {
    e.preventDefault()
    const quantityElement = summary.find(element => element === item)
    if (quantityElement) {
      quantityElement.qtd += 1
      
      setSummary(prevQuantidade => prevQuantidade.map(prevElem => prevElem.id === quantityElement.id ? quantityElement : prevElem))
    } 
    else {
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
    } 
    if (quantityElement.qtd === 0) {
      deleteItem()
    }
  }

 const calculateTotal = (items) => {
  const totalPrice = items.reduce((accumulator, array) => {
    const { qtd, price } = array;
    accumulator = Number(qtd * price + accumulator)
    return accumulator
  }, 0)

  return totalPrice;
 }

 const validationOrder = () => {
  let error = {}
  error.isFormValid = true

  if (!client) {
    error.client = 'Preencha o nomedo cliente corretamente'
    error.isFormValid = false
  }
  if (!table || table >= 10 ) {
    error.table = 'Escolha um numero de 1 à 10'
    error.isFormValid = false
  } 
  if (summary.length === 0) {
    
    error.summary = 'Não há itens para realizar o pedido';
    error.isFormValid = false
  }
  return error
}

 useEffect(() => {
    console.log(summary, client)
  }, [summary, client])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = validationOrder()
    setError(valid)
    if (valid.isFormValid) {
      const pedido =  ({
        "client": client,
        "table": table,
        "products":
        summary.map((item) => (
          {
            id: Number(item.id),
            qtd: Number(item.qtd),
          }))
      }) 
      Order(pedido, "orders", "POST")
      setClient([])
      setTable([])
      setSummary([])
    }
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
            className="btn-menu"
            onClick={((e) => {
              e.preventDefault();
              setTab('breakfast')
            })} src={cafe} 
          />

          <ButtonMenu
            className="btn-menu"
            onClick={((e) => {
              e.preventDefault();
              setTab('hamburguer')
            })} src={lanche} 
          />
          
          <ButtonMenu 
            className="btn-menu"
            onClick={((e) => {
              e.preventDefault();
              setTab('side')
            })} src={extras}  
          />
          
          <ButtonMenu  
            className="btn-menu"
            onClick={((e) => {
              e.preventDefault();
              setTab('drinks')
            })} src={bebidas} 
          />

          <ButtonMenu
            className="btn-menu" 
            onClick={((e) => {
              e.preventDefault();
              setTab('summary')
            })} src={cifrao} 
          />
        </div>
        
          <section className='restaurant-menu'>
              { showMenuTab && menu[tab].map((items) => (       
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
              {
                showSummary && <section className='order'>
                  <h1>Resumo do Pedido</h1> 
                  <section className="inputs">
                    <HallInput
                      name="client" 
                      placeholder="Digite o nome do cliente"
                      type="text" 
                      value={client} 
                      onChange={(event) =>
                      setClient(event.target.value)}  
                    />  
                    <div className="hidden">{error.client && <p>{error.client}</p>} </div>

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
                    <div className="hidden">{error.table && <p>{error.table}</p>} </div>
                  </section>
              <div className='summary-items'>
                <p>Item</p>
                <p>Preço</p>
                <p>Quantidade</p>
              </div>
              {summary.map((item, index)=>
                <article key={item.id}>
                  <span className="summary-order">
                    <ol >
                    <p>{item.name}</p>
                    <p>{item.flavor}</p>
                    <p>{item.complement}</p>
                    </ol>
                    <p>R$ {item.price},00</p>
                    <p>{item.qtd}</p>
                    <button className="btn-delete" onClick={() => deleteItem(index)} > <img className="icon-trash" alt="" src={trash} />
                    </button>           
                  </span>
                </article>
              )}
              <p className="total">Total: R$ {total},00</p>
              <div className="hidden">{error.summary && <p>{error.summary}</p>} </div>
              <Button variant="primary-hall" onClick={handleSubmit}>Enviar Pedido</Button>
            </section>
              }
         </section>
        </main>  
      </form>  
    </div>
  )
  
}

export default Hall;