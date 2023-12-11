import '../pages_style/app/css/styles.css';
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {Polygraphy_catalog, Item_card} from './polygraphy_catalog/polygraphy_catalog.js'
import {Gift_card, Gift_catalog} from '../pages_js/gift_catalog/gift_catalog.js'
import Home from './main/main.js'
import { legacy_createStore as createStore} from 'redux'
import { Printer } from './printer/printer.js';
import { useDispatch, useSelector } from 'react-redux';
import { Requirements } from '../requirements/requirements.js';
import { About_formats } from './about_formats/about_formats.js';
import { Emploers_catalog } from './contacts/contacts.js';
import { Order_Form } from './form/form.js';



function App() {
    
    const url = window.location.href;
    const hasHello = String(!/http:\/\/.*\/..*/.test(window.location.href))
  return (
    <div className="App">
    <a name="top"></a>
    
    <header class={hasHello}>
        <div>
            <a href="/"><img class="logo" src="./pics/all/logo_mini.svg" alt="img"/></a>
            <nav>
                <ul>
                    <li class="menu-item"><a href="/polygraphy_catalog">Полиграфия</a></li>
                    <li class="menu-item"><a href="/gift_catalog">Сувениры</a></li>
                    <li class="menu-item"><a >Информация</a>
                        <ul class="submenu">
                            <li><a href="/requirements">Требования к макетам</a></li> 
                            <li><a href="/about_formats">Форматы в полиграфии</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="/contacts">Контакты</a></li>
                </ul>
            </nav>
            <a href="/printer" class={"printIcon"}><img class="logo" src="./pics/all/printer.svg" alt="img"/><h2 class={useSelector(state => state.storeAmount)}>{useSelector(state => state.storeAmount)}</h2></a>
        </div>
    </header>
    <article>
        <div class="container">
            <Routes>
                <Route path="/" element={<Home/>}  exact />
                <Route path="/polygraphy_catalog" element={<Polygraphy_catalog/>} exact/>
                <Route path="/polygraphy_catalog/:id" element={<Item_card/>} exact/>
                <Route path="/gift_catalog" element={<Gift_catalog/>} exact />
                <Route path="/gift_catalog/:id" element={<Gift_card/>} exact />
                <Route path="/printer" element={<Printer/>} exact />
                <Route path="/requirements" element={<Requirements/>} exact />
                <Route path="/about_formats" element={<About_formats/>} exact />
                <Route path="/contacts" element={<Emploers_catalog/>} exact />
                <Route path="/form" element={<Order_Form/>} exact />
            </Routes>
        </div>
    </article>
    <footer>
        <h3>Ivan Drebezov | FIT | ISIT - 2 | 2023</h3>
    </footer>
    </div>
  );
}



export default App;
