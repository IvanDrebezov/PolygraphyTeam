import React from 'react';
import { Component } from 'react';

function getColor(rate = Number){
    let res = ""
    let red = `${((1-rate)*0) + (rate*0)}`
    let green = `${((1-rate)*0) + (rate*147)}`
    let blue = `${((1-rate)*0) + (rate*221)}`
    return `${red}, ${green}, ${blue}`
}

export class Draw extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
    this.state={curent: this.props.DefVal, minDes: false, plusDes: false}
    this.props = {DefVal: Number(), minVal: Number(), maxVal: Number(), stepAmount: Number()}
    this.Plus = this.Plus.bind(this)
    this.Minus = this.Minus.bind(this)
    this.getRange = this.getRange.bind(this)
    this.getInput = this.getInput.bind(this)
  }
  
  Plus(handler){
    let res = Number(this.state.curent) + this.props.stepAmount
    let desP = (res >= this.props.maxVal)? true: false
    let desM = (res <= this.props.minVal)? true: false
    if (res < this.props.minVal || res > this.props.maxVal) this.props.check(false)
    if (res >= this.props.minVal && res <= this.props.maxVal) this.props.check(true)
    this.setState({curent:res, plusDes: desP, minDes: desM })
    document.getElementById("range").style.accentColor = `rgb(${getColor(this.state.curent/this.props.maxVal)})`
  }

  Minus(handler){
    let res = Number(this.state.curent) - this.props.stepAmount
    let desP = (res >= this.props.maxVal)? true: false
    let desM = (res <= this.props.minVal)? true: false
    if (res < this.props.minVal || res > this.props.maxVal) this.props.check(false)
    if (res >= this.props.minVal && res <= this.props.maxVal) this.props.check(true)
    this.setState({curent:res, plusDes: desP, minDes: desM })
    document.getElementById("range").style.accentColor = `rgb(${getColor(this.state.curent/this.props.maxVal)})`
  }

  getRange(handler){
    let res = handler.target.value
    let desP = (res >= this.props.maxVal)? true: false
    let desM = (res <= this.props.minVal)? true: false
    if (res < this.props.minVal || res > this.props.maxVal) this.props.check(false)
    if (res >= this.props.minVal && res <= this.props.maxVal) this.props.check(true)
    this.setState({curent:res, plusDes: desP, minDes: desM })
    document.getElementById("range").style.accentColor = `rgb(${getColor(this.state.curent/this.props.maxVal)})`
  }

  getInput(handler){
    let res = handler.target.value
    let desP = (res >= this.props.maxVal)? true: false
    let desM = (res <= this.props.minVal)? true: false
    if (res < this.props.minVal || res > this.props.maxVal) this.props.check(false)
    if (res >= this.props.minVal && res <= this.props.maxVal) this.props.check(true)
    this.setState({curent:res, plusDes: desP, minDes: desM })
    document.getElementById("range").style.accentColor = `rgb(${getColor(this.state.curent/this.props.maxVal)})`
  }

  render()
  {
    
    return(
        <div class="draw"> 
        <p>Тираж</p>
        <div class={"buttons"}>
            <div>
                <input onClick={this.Minus} type={"button"} value={`-${this.props.stepAmount}`} disabled={this.state.minDes}/>
                <input onChange={this.getInput} type={"number"} id={"sum"} defaultValue={this.state.curent} value={this.state.curent}/>
                <input onClick={this.Plus} type={"button"} value={`+${this.props.stepAmount}`} disabled={this.state.plusDes}/>
            </div>
            <input onChange={this.getRange} id={"range"} type={"range"} min={this.props.minVal} max={this.props.maxVal} step={this.props.stepAmount} value={this.state.curent} />
        </div>
        </div>
        )
  }
}

export class PapperType extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div class={"PapperType"}>
                <p>Бумага</p>
                <select class={"Act_comp"}>
                    <option>мелоновая</option>
                    <option>обычная</option>
                </select>
            </div>
        )
    }
}

export class ColorType extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div class={"ColorType"}>
                <p>цветность</p>
                <select class={"Act_comp"}>
                    <option>без печати</option>
                    <option>одностороння 4+0</option>
                    <option>двухстороння 4+4</option>
                </select>
            </div>
        )
    }
}

export class Coating extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div class={"Coating"}>
                <p>Покрытие</p>
                <select class={"Act_comp"}>
                    <option>без покрытия</option>
                    <option>Ламинат 1 стр.</option>
                    <option>Ламинат 2 стр.</option>
                    <option>Матовый 1 стр.</option>
                    <option>Матовый 2 стр.</option>
                </select>
            </div>
        )
    }
}

export class Rounding extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div class={"Rounding"}>
                <p>Скргугление</p>
                <select class={"Act_comp"}>
                    <option>Без скргугление</option>
                    <option>С Скргуглением</option>
                </select>
            </div>
        )
    }
}

export class Format extends React.Component
{
    constructor(props){
        super(props);
    }

    render()
    {
        return(
            <div class={"Format"}>
                <p>формат</p>
                <select class={"Act_comp"}>
                    <option>10x15</option>
                    <option>15x20</option>
                    <option>20x30</option>
                </select>
            </div>
        )
    }
}