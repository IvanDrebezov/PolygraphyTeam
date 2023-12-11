import { useReducer } from "react"
import { useDispatch, useSelector } from 'react-redux';


export function Printer(){
    //localStorage.clear()
    const [ , forceUpdate] = useReducer(x => x+1,0)
    const dispatch = useDispatch()
    function clearPrinter(){
        localStorage.clear()
        dispatch({type: "CLR"})
        forceUpdate()
    }

    function delPrintItem(handler){
        let item_i = handler.target.id
        console.log(handler.target.id)
        while(item_i<localStorage.length-1){
            let temp = JSON.parse(localStorage.getItem(`storeItem_${Number(item_i)+1}`))
            localStorage.setItem(`storeItem_${item_i}`, JSON.stringify(temp))
            item_i++
        }
        localStorage.removeItem(`storeItem_${localStorage.length-1}`)
        dispatch({type: "DEL"})
        forceUpdate()
    }
    let sum = 0
    let store_arr = []
    for(let iter = 0; iter < localStorage.length; iter++){
        sum += Number(JSON.parse(localStorage.getItem(`storeItem_${iter}`)).price)
        store_arr.push(
            <div class={"printerItem"}>
                <div class={"printerItemPic"}>
                    <img src={JSON.parse(localStorage.getItem(`storeItem_${iter}`)).image}/>
                </div>
                <div class={"printerItemInfo"}>
                <h2>{JSON.parse(localStorage.getItem(`storeItem_${iter}`)).name}</h2>
                <h3>{JSON.parse(localStorage.getItem(`storeItem_${iter}`)).acts}</h3>
                <h2>{JSON.parse(localStorage.getItem(`storeItem_${iter}`)).amount} экз. | {JSON.parse(localStorage.getItem(`storeItem_${iter}`)).price} р.</h2>
                </div>
                <button id={iter} value={iter} onClick={delPrintItem}>&#215;</button>

            </div>
        )
    }

    return(
    <div class={"printerPage"}>
        <h1>Корзина</h1>
        {store_arr}
        <h2>сумма: {sum}</h2>
        <button onClick={clearPrinter}>очистить</button>
        <button disabled={localStorage.length==0}><a href="/form" class={`${localStorage.length==0}`}>оформить</a></button>
        
    </div>
    )
}