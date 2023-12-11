import React,{useState} from 'react';
import {Routes, Route, Link, useLocation, useParams} from 'react-router-dom';
import {Draw, PapperType, ColorType, Coating, Rounding, Format} from '../actionList/actList.js'
import { useDispatch, useSelector } from 'react-redux';
var currenc ="$"

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
    index: "1",
    act: [1, 2, 4]
  },
  {
    iName: "флаеры",
    index: "2",
    act: [1, 2, 3, 4, 6]
  },
  {
    iName: "визитки",
    index: "3",
    act: [1, 2, 3, 4, 5]
  },
  {
    iName: "буклеты",
    index: "4",
    act: [1, 2, 3, 4, 6]
  },

  {
    iName: "Календари",
    index: "1",
  },
  {
    iName: "флаеры",
    index: "2",
  },
  {
    iName: "визитки",
    index: "3",
  },
  {
    iName: "буклеты",
    index: "4",
  },

  {
    iName: "Календари",
    index: "1",
  },
  {
    iName: "флаеры",
    index: "2",
  },
  {
    iName: "визитки",
    index: "3",
  },
  {
    iName: "буклеты",
    index: "4",
  },
]

var item_gift_arr =[
  {
    iName: "Рамка 10x15",
    index: "1",
    category: "PBorders",
    ratio: "10x15",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Рамка 15x20",
    index: "2",
    category: "PBorders",
    ratio: "15x20",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Фото 10x15",
    index: "3",
    category: "Photo",
    ratio: "10x15",
    basePrice: 5,
    discount: 1,
    act: [ 3]
  },
  {
    iName: "Фото 15x20",
    index: "4",
    category: "Photo",
    ratio: "15x20",
    basePrice: 5,
    discount: 1,
    act: [ 3]
  },
  {
    iName: "Фото альбом 15x20",
    index: "5",
    category: "PAlbum",
    ratio: "15x20",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Фото альбом 10x15",
    index: "6",
    category: "PAlbum",
    ratio: "10x15",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Магнит 10x15",
    index: "7",
    category: "Stuff",
    ratio: "10x15",
    basePrice: 5,
    discount: 1,
    act: [3, 4]
  },
  {
    iName: "Магнит 20x15",
    index: "8",
    category: "Stuff",
    ratio: "15x20",
    basePrice: 5,
    discount: 1,
    act: [3, 4]
  },
  {
    iName: "Кружка 330мл",
    index: "9",
    category: "Stuff",
    ratio: "none",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "майка",
    index: "10",
    category: "Stuff",
    ratio: "none",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Значок",
    index: "11",
    category: "Stuff",
    ratio: "none",
    basePrice: 5,
    discount: 1,
    act: []
  },
  {
    iName: "Стикеры",
    index: "12",
    category: "Stuff",
    ratio: "none",
    basePrice: 5,
    discount: 1,
    act: [3, 4]
  },
]

export class Gift_catalog extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state={myarray:item_gift_arr, filterStatus: false}
    this.render =this.render.bind(this)
    this.Sort =this.Sort.bind(this)
    this.Clean =this.Clean.bind(this)
  }

  Sort(){
    let itmArr = [];
    let fArr = document.getElementsByClassName("format")
    let cArr = document.getElementsByClassName("category")
    for(let iter = 0 ; iter < fArr.length; iter++){
      if(fArr[iter].checked){
        for(let item_iter = 0; item_iter < item_gift_arr.length; item_iter++){
          if(item_gift_arr[item_iter].ratio == fArr[iter].value) itmArr.push(item_gift_arr[item_iter])
        }
      }
    }
    let finalArr = []
    for(let iter = 0 ; iter < cArr.length; iter++){
      if(cArr[iter].checked){
        for(let item_iter = 0; item_iter < itmArr.length; item_iter++){
          if(itmArr[item_iter].category == cArr[iter].value) finalArr.push(itmArr[item_iter])
        }
      }
    }
    finalArr.sort((v_a,v_b)=>1*(v_a.index -v_b.index))
    this.setState({myarray: finalArr})
  }

  Clean(){
    let fArr = document.getElementsByClassName("format")
    let cArr = document.getElementsByClassName("category")
    for(let iter = 0 ; iter < fArr.length; iter++){
      fArr[iter].checked = this.state.filterStatus
    }
    for(let iter = 0 ; iter < cArr.length; iter++){
      cArr[iter].checked = this.state.filterStatus
    }
    this.setState({filterStatus: !this.state.filterStatus})
    this.Sort();
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
      <div class = {"Gift_catalog"}>
        <h1>Сувениры</h1>
        <div class={"marketContr"}>
        <div class={"ctrl"}>
        <Controls sort={this.Sort} offAll={this.Clean}/>
        </div>
        <div class={"market"}>{rows}</div>
        </div>
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
    <div class={"poly_item_card"}><a href={`/gift_catalog/${this.props.index}`}>
      <div>
        <img class="poly_item" src={`./pics/gift/item${this.props.index}.jpg`}/>
        <p>{this.props.goodsname}</p>
      </div>
    </a></div>)
  }
}

class Controls extends React.Component
{
render(){return(

<div class={"controls"}> 
  <p>фильтр</p>
  <button onClick={this.props.offAll}>выкл/вкл всё</button>
  <div>
    <p>формат</p>
    <div><input id={"chf1"} onClick={this.props.sort} class={"format"} type={"checkbox"} value={"10x15"} defaultChecked/> <label for={"chf1"}>10x15</label></div>
    <div><input id={"chf2"} onClick={this.props.sort} class={"format"} type={"checkbox"} value={"15x20"} defaultChecked/> <label for={"chf2"}>15x20</label></div>
    <div><input id={"chf3"} onClick={this.props.sort} class={"format"} type={"checkbox"} value={"none"} defaultChecked/> <label for={"chf3"}>вне формата</label></div>
  </div>
  <div>
  <p>Категория</p>
    <div><input id={"chc1"} onClick={this.props.sort} class={"category"} type={"checkbox"} value={"Photo"} defaultChecked/> <label for={"chc1"}>Печать</label></div>
    <div><input id={"chc2"} onClick={this.props.sort} class={"category"} type={"checkbox"} value={"PAlbum"} defaultChecked/> <label for={"chc2"}>Альбомы</label></div>
    <div><input id={"chc3"} onClick={this.props.sort} class={"category"} type={"checkbox"} value={"PBorders"} defaultChecked/> <label for={"chc3"}>Рамки</label></div>
    <div><input id={"chc4"} onClick={this.props.sort} class={"category"} type={"checkbox"} value={"Stuff"} defaultChecked/> <label for={"chc4"}>Сувениры</label></div>
    
  </div>
  </div>)}

}

export function Gift_card() 
{ 
  const dispatch = useDispatch()
  
  function getItem() {
    let t_name = document.getElementById("name").innerText
    let t_id = item_gift_arr.findIndex(itm => itm.iName == t_name)
    let t_amount = document.getElementById("sum").value
    let t_acts = "";
    let t_img = '' + document.getElementById("pic").getAttribute("src")
    console.log(t_img)
    let step = Math.floor(t_amount / 100)
    let t_price = Math.round(item_gift_arr[t_id].basePrice+((item_gift_arr[t_id].basePrice*step)*(item_gift_arr[t_id].discount**step)*step))

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
   
    let item_x = item_gift_arr[this.props.id-1]
    let name = item_gift_arr[this.props.id-1].iName
    let index = item_gift_arr[this.props.id-1].index
    let list = []
   
    for (let iter = 1; iter <= ListAct.length; iter++){
      if (item_x.act.includes(iter)) list.push(ListAct[iter-1])
    }
    return (
      <div class={"itemPage"}>
        <p id={"name"}>{name}</p>
        <div class={"actSection"}>
          <div class={"image"}>
            <img class={"poly_item"} id={"pic"} src={`./pics/gift/item${index}.jpg`}/>
          </div>
          <div class={"action"}>
            <Draw check={this.checkInput} DefVal={1} minVal={1} maxVal={100} stepAmount={1}/>
            {list}
            
            <input onClick={this.props.getItem} type={"button"} value={"Заказать"} disabled={this.state.buttonDes}/>
          </div>
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