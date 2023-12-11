import React from "react";

let emploersArr = [
{
    emplIndex: 1,
    emplName: "Cотрудник 1",
    emplpost: "Начальник отдела продаж",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
{
    emplIndex: 2,
    emplName: "Cотрудник 2",
    emplpost: "Менеджер",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
{
    emplIndex: 3,
    emplName: "Cотрудник 3",
    emplpost: "Менеджер",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
{
    emplIndex: 4,
    emplName: "Cотрудник 4",
    emplpost: "Менеджер",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
{
    emplIndex: 5,
    emplName: "Cотрудник 5",
    emplpost: "Дизайнер",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
{
    emplIndex: 6,
    emplName: "Cотрудник 6",
    emplpost: "Менеджер",
    emplPhoto: "default",
    emplNum: "+123456789",
    emplEmail: "Электронная почта"
},
]

export class Emploers_catalog extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state={myarray: emploersArr}
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
        index={item.emplIndex} 
        key={item.emplIndex}
      />)
    }
    return (
      <div class = {"emploer_catalog"}>
        <h1>Контакты</h1>
        <h2>Адрес офиса: ул. Селицкого д. 105</h2>
        <h2>телефон: +375 29 2533208</h2>
        <h2></h2>
        <div class={"emploers_table"}>{rows}</div>
      </div>
      )
  }
}

class Poly_Node extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={index:Number()}
  }

  render()
  {
    
    return (
    <div class={"emploer_card"}>
      <div>
        <img src={`./pics/emploers/empl_${this.props.index}.jpg`}/>
        <h2>{emploersArr[this.props.index-1].emplName}</h2>
        <h3>{emploersArr[this.props.index-1].emplpost}</h3>
        <p>{emploersArr[this.props.index-1].emplNum}</p>
        <p>{emploersArr[this.props.index-1].emplEmail}</p>
      </div>
    </div>)
  }
}