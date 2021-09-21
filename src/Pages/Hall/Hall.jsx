import React, {useEffect} from "react";
import "../../Styles/hall.css";
import HeaderIcons from "../../components/header/headerHallIcons";
import HeaderHall from "../../components/header/headerHall";
// import  Auth  from "../../Api/getProducts";
import cafe from "../../assets/icons/cafe.png";
import hamburguer from "../../assets/icons/hamburguer.png";
import extras from "../../assets/icons/extras.png";
import bebidas from "../../assets/icons/bebidas.png";
import cifrao from "../../assets/icons/cifrao.png";
import Menu from "./Menu";


function Hall() {
  useEffect(() => {
    Auth();
  }, []);

  // const menu = [breakfast, setBreakfast] = useState('')
  const token = localStorage.getItem('token');
  const Auth = () => {
    
    fetch('https://lab-api-bq.herokuapp.com/products', {
        headers: {
            accept: 'application/json',
            Authorization: `${token}`,
       
        },
    })
    .then(response => response.json())
    .then((json) => {
        const breakfast = json.filter((item) => item.type === "breakfast");
        console.log(breakfast)
      });
  }
  
  return (
    <div className="hall">
      <form >
        <HeaderHall />
        <main className="hall-page-main">
          <HeaderIcons img={cafe} />

          <HeaderIcons img={hamburguer} />
          <HeaderIcons img={extras} />
          <HeaderIcons img={bebidas} />
          <HeaderIcons img={cifrao} />

          
        </main>
     
        
      </form>  
    </div>
  )
  
}

export default Hall;