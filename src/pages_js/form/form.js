import React from "react";

let regread =/[0-9]{1,3}/;

var phones=[
{
  state:"Беларусь",
  code:"375",
  flag:`bel`,
  format:"(XX) XXX-XX-XX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/,
  regea:"+$1($2) $3-$4-$5",
  len:18
},
{
  state:"Россия",
  code:"7",
  flag:"🇷🇺",
  format:"(XXX) XXX-XX-XX",
  regeb:/([0-9]{1})([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,3})/,
  regea:"+$1($2) $3-$4-$5",
  len:17
},
{
  state:"Литва",
  code:"370",
  flag:" 🇱🇹 ",
  format:"(XX) XXX-XX-XX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/,
  regea:"+$1($2) $3-$4-$5",
  len:18
},
{
  state:"Латвия",
  code:"371",
  flag:"🇱🇻",
  format:"XXXX-XXXX",
  regeb:/([0-9]{1,3})([0-9]{0,4})([0-9]{0,4})/,
  regea:"+$1 $2-$3",
  len:14
},
{
  state:"Украина",
  code:"380",
  flag:"🇺🇦",
  format:"(XX) XXX-XX-XXX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,3})/,
  regea:"+$1($2) $3-$4-$5",
  len:19
},
{
  state:"Польша",
  code:"48",
  flag:"🇵🇱",
  format:"XXX-XXX-XXX",
  regeb:/([0-9]{1,2})([0-9]{0,3})([0-9]{0,3})([0-9]{0,3})/,
  regea:"+$1 $2-$3-$4",
  len:15
}
]

function clearinp(){
    document.getElementById("inputer").value=""
  }

class MailArea extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
  }
  render()
  {
    return(
        <div class="mail">  
        <input onChange={this.props.changer} pattern='^.+?@.+?\..+?'  type={"text"} placeholder={"Введите email"}></input>
        </div>
        )
  }
}

class PhoneInput extends React.Component {
    constructor(props) {
      super(props)
      this.state={selected_code:375,rcode:0}
      this.setnum = this.setnum.bind(this);
      this.setnum_inp = this.setnum_inp.bind(this);
    }
  
    setnum(handler){
      clearinp()
      this.setState(
        function(){
          return({selected_code:handler.target.value,}) 
        }
      )
      
      console.log(this.state.rcode)
      this.forceUpdate()
    }
  
    setnum_inp(handler){
      
  
      
  
      try{
        let afterbuff=handler.target.value.match(regread) 
      for(let code of phones){
        if(code.code==afterbuff){
          afterbuff=code;break
        }
       }
  
      this.setState({selected_code:afterbuff.code})
        let buff2=handler.target.value.replace(/[^0-9]/g, '')
      console.log(buff2)
      console.log(afterbuff.regeb)
      console.log(afterbuff.regea)
      buff2=buff2.replace(afterbuff.regeb,afterbuff.regea)
      console.log(buff2)
      handler.target.value=buff2
      this.forceUpdate()
      }
      catch(e){
        this.forceUpdate()
      }
    
    
    }
  
  render(){
    
    return(
    <div>
      
      <input type='text' id="inputer" onChange={this.setnum_inp} maxLength={phones[this.state.rcode].len} placeholder={"Номер телефона"}/>
      <button onClick={clearinp}>очистить</button>
      </div>
  
    
    
    )}
  }



export class Order_Form extends React.Component
{
    constructor(props) 
    {
      super(props); 
      this.state={block_name: true, block_surname: true,block_mail: true}
      this.mailValid=this.mailValid.bind(this)
      this.nameValid=this.nameValid.bind(this)
      this.surnameValid=this.surnameValid.bind(this)
    }

    nameValid(handler){
        this.setState({block_name: (handler.target.value == "")})
    }
    
    surnameValid(handler){
        this.setState({block_surname: (handler.target.value == "")})
    }

    mailValid(handler)
    {
      const mailRegEx=/.*@.*\..*/
      this.setState({block_mail: !mailRegEx.test(handler.target.value)})
    }
  
    render()
    {
        let sum = 0;
        for(let iter = 0; iter < localStorage.length; iter++) sum += Number(JSON.parse(localStorage.getItem(`storeItem_${iter}`)).price)
      return (
        <div class={"form"}>
            <h1>Оформить заказ</h1>
            <h2>сумма заказа: {sum}р.</h2>
            <p><input onChange={this.nameValid} id={"Name"} type={"text"} placeholder={"Введите имя*"}></input></p>
            <p><input onChange={this.surnameValid} id={"Surname"} type={"text"} placeholder={"Введите фамилию*"}></input></p>
            <p><PhoneInput/></p>
            <p><MailArea changer={this.mailValid}></MailArea></p>
            <p><input type="file" id="docpicker" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.jpg,.zip" /></p>
            <input type={"submit"} disabled={(this.state.block_mail || this.state.block_name || this.state.block_surname)}></input>
        </div>  
      );
  
    }
  }