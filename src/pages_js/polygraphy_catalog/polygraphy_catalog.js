import React,{useState} from 'react';
import {Routes, Route, Link, useLocation, useParams} from 'react-router-dom';
import {Draw, PapperType, ColorType, Coating, Rounding, Format} from '../actionList/actList.js'
import { useDispatch, useSelector } from 'react-redux';



//draw - тираж - 1
//paper_type - бумага - 2
//color_type - цветность - 3
//coating - покрытие - 4
//rounding - скругления - 5
//format - формат - 6

let ListAct = [<PapperType/>, <ColorType/>, <Coating/>, <Rounding/>, <Format/>]

var item_poly_arr = [
  {
    iName: "Календари",
    index: 1,
    act: [2, 3],
    basePrice: 100,
    discount: 0.98,
  },
  {
    iName: "флаеры",
    index: 2,
    act: [1, 2, 3, 5],
    basePrice: 10,
    discount: 0.98,
  },
  {
    iName: "визитки",
    index: 3,
    act: [1, 2, 3, 4],
    basePrice: 10,
    discount: 0.98,
  },
  {
    iName: "буклеты",
    index: 4,
    act: [1, 2, 3, 5],
    basePrice: 10,
    discount: 0.98,
  },

  {
    iName: "Наклейки",
    index: 5,
    act: [1, 2, 3],
    basePrice: 10,
    discount: 0.98,
  },
  {
    iName: "Блокноты",
    index: 6,
    act: [5],
    basePrice: 50,
    discount: 0.98,
  },
  {
    iName: "Открытки",
    index: 7,
    act: [1, 2, 3, 4, 5],
    basePrice: 10,
    discount: 0.98,
  },
  {
    iName: "Плакаты",
    index: 8,
    act: [1, 2, 3, 5],
    basePrice: 20,
    discount: 0.98,
  },

  {
    iName: "Дипломы/грамоты",
    index: 9,
    act: [5],
    basePrice: 50,
    discount: 0.98,
  },
  {
    iName: "Упаковка",
    index: 10,
    act: [],
    basePrice: 20,
    discount: 0.98,
  },
  {
    iName: "книги/переплёты",
    index: 11,
    act: [],
    basePrice: 50,
    discount: 0.98,
  },
  {
    iName: "Журналы",
    index: 12,
    act: [2, 5],
    basePrice: 40,
    discount: 0.98,
  },
]

class Polygraphy_catalog extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state={myarray:item_poly_arr}
    this.render =this.render.bind(this)
  }

  
  render()
  {
    let rows=[];
    let iter=0;

    for(const item of this.state.myarray)
    { 
      rows.push(
      <Poly_Node 
        index={item.index} 
        goodsname={item.iName}  
        key={item.iName}
      />)
    }
    return (
      <div class = {"polygraphy_catalog"}>
        <h1>Полиграфическая продукция</h1>
        <div class={"market"}>{rows}</div>
      </div>
      )
  }
}

class Poly_Node extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={goodsname:String(),index:String()}
  }

  render()
  {
    return (
    <div class={"poly_item_card"}><a href={`/polygraphy_catalog/${this.props.index}`}>
      <div>
        <img class="poly_item" src={`./pics/polygraphy/item${this.props.index}.png`}/>
        <p>{this.props.goodsname}</p>
      </div>
    </a></div>)
  }
}

export function Item_card() 
{ 
  const dispatch = useDispatch()
  
  function getItem() {

    let t_name = document.getElementById("name").innerText
    let t_id = item_poly_arr.findIndex(itm => itm.iName == t_name)
    let t_amount = document.getElementById("sum").value
    let t_acts = "";
    let t_img = '' + document.getElementById("pic").getAttribute("src")
    console.log(t_img)
    let step = Math.floor(t_amount / 100)
    let t_price = Math.round(item_poly_arr[t_id].basePrice+((item_poly_arr[t_id].basePrice*step)*(item_poly_arr[t_id].discount**step)*step))

    for(let iter = 0; iter < document.getElementsByClassName("Act_comp").length; iter++){
      t_acts += document.getElementsByClassName("Act_comp")[iter].options[document.getElementsByClassName("Act_comp")[iter].selectedIndex].text + " | "
    }

    let item = {
      name: t_name,
      id: t_id,
      amount: t_amount,
      acts: t_acts,
      price: t_price,
      image: t_img
    }
    localStorage.setItem(`storeItem_${localStorage.length}`, JSON.stringify(item))
    dispatch({type: "ADD"})
  }
  
  const {id} = useParams()


  return(
    <Poly_Item id = {id} getItem={getItem}/>
    )
}

class Poly_Item extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={id:Number()}
    this.state={buttonDes: false}
    this.checkInput = this.checkInput.bind(this)
    this.getSum = this.getSum.bind(this)
  }

  checkInput(inp = Boolean()){
    if (inp) this.setState({buttonDes: false})
    else this.setState({buttonDes: true})
  }

  getSum(){
    let x = document.getElementById("sum").value
    localStorage.setItem("item", x)
    alert(localStorage.getItem("item"))
  }

  render()
  {
   
    let item_x = item_poly_arr[this.props.id-1]
    let name = item_poly_arr[this.props.id-1].iName
    let index = item_poly_arr[this.props.id-1].index
    let list = []
   
    for (let iter = 1; iter <= ListAct.length; iter++){
      if (item_x.act.includes(iter)) list.push(ListAct[iter-1])
    }
    return (
      <div class={"itemPage"}>
        <p id={"name"}>{name}</p>
        <div class={"actSection"}>
          <div class={"image"}>
            <img class={"poly_item"} id={"pic"} src={`./pics/polygraphy/item${index}.png`}/>
          </div>
          <div class={"action"}>
            <Draw check={this.checkInput} DefVal={100} minVal={50} maxVal={5000} stepAmount={5}/>
            {list}
            
            <input onClick={this.props.getItem} type={"button"} value={"Заказать"} disabled={this.state.buttonDes}/>
          </div>
        </div>
        <div class={"infoSection"}>
          {/* {ListInfo[this.props.id-1]} */}
          {createPriceTable(item_poly_arr[this.props.id-1].basePrice, item_poly_arr[this.props.id-1].discount)}
        </div>
    </div>)
  }
}

function createPriceTable(price, discount){
  let TRarr = [<tr><td>Колличество</td><td>Цена за тираж</td></tr>]
  let TDarr = []
  let step = 0;
  for(let curentAmount = 0; curentAmount <5000; curentAmount+=100){
    TRarr.push(<tr><td>{curentAmount}-{curentAmount+99}</td><td>{Math.round(price+((price*step)*(discount**step)*step))}</td></tr>)
    step++
  }
  
  return(
    <table>
      {TRarr}
    </table>
  )
}

export {Polygraphy_catalog};