import React from "react"; 
import Breakfest from "../../components/menu/breakfest";
import HeaderMenu from "../../components/menu/headerBreakfest";

function Menu () {

    return (
    <div> 
        <form>
            <HeaderMenu />
             
            <Breakfest
            name= "pao"
            id= "30"
            type= "breakfest" />
        </form>
    </div>
       
    )
}

export default Menu;