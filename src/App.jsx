import React from "react";
import { useState,useEffect } from 'react';
import './App.css';

function App() {
 const [data, setData] = useState([])
 const [isloading, setisloading] = useState(true)
 const [basket, setBasket] = useLocalStorage("basket")
 useEffect(()=>{
  getProducts()
  
   },[])
   
   function useLocalStorage (key)  {
    const [localData, setlocalData] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)):[])
    useEffect(()=>{
        localStorage.setItem("basket",JSON.stringify(localData))
    },[localData])
    function handleLocalStorage(data) {
        setlocalData(data)     
    }
  
    return [localData,handleLocalStorage]
}
 async function getProducts() {
  const data= await fetch("http://localhost:3000/products")
const res= await data.json()
  setData(res)
  setisloading(false)
 }





 function HandleAddBasket (item){
const elementIndex =basket.findIndex((x)=>x.id === item.id)

if (elementIndex !==-1){
  const newBasket=[...basket]
  newBasket[elementIndex].count++
  setBasket(newBasket)
}
else{
  setBasket([...basket,{...item,count:1}])
}
 }
 function handleremove(id) {
  setBasket(basket.filter((x)=>
x.id !==id
  ))
 
 }
 function handleCountVal(isAdd,item) {
  const elementIndex =basket.findIndex((x)=>x.id === item.id)
  const newBasket=[...basket]
  if (isAdd) {
    newBasket[elementIndex].count++
    setBasket(newBasket)
  }
  else {
if (newBasket[elementIndex].count === 1) {
  return
}
newBasket[elementIndex].count--
setBasket(newBasket)
  }
}
  return (
   <>
   <h1 style={{textAlign:'center'}}>Phone Shop</h1>
   {isloading ? (
    <h1 style={{textAlign:"center",fontSize:'100px'}}>Loading...</h1>) : (
      <div className="container">
      {data && data.map((item)=>(
       <div className="card" >
         <img src={item.productimage} alt="" />
         <h1>{item.name}</h1>
     <h3>{item.price}$</h3>
     <button onClick={()=>HandleAddBasket(item)} style={{padding:"10px 30px"} }>add to cart</button>
       </div>
        ))}
      </div> 
    )
  
   }
<h1 style={{textAlign:"center"}}>My busket</h1>
   {basket.map((x)=>(
    <ul>
<li><img src={x.productimage} alt="" style={{height:"100px",width:"100px"}}/></li>
<li>{x.name}</li>
<li>{x.price}</li>
<li>{x.count}</li>
<button onClick={()=>handleremove(x.id)}>Remove</button>
<button onClick={()=>handleCountVal(true,x)}>+</button>
<button onClick={()=>handleCountVal(false,x)}>-</button>

    </ul>
   ))}
   </>
  );
}

export default App;

