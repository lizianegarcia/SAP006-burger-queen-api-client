import React from "react";


const Breakfest = ({name, id, price, type}) => {
    
    return (
        <div>
            <section>
                <ul>
                    name={name}
                    id={id}
                    type={type} 
                  <aside>
                    price={price}
                  </aside>
                </ul> 
            </section> 
        </div>
             
    )
}

export default Breakfest;