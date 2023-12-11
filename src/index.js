import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages_js/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { legacy_createStore as createStore} from 'redux'
import { Provider } from 'react-redux';
import { version } from 'react';
console.log(version);

const defaultState = {
  storeAmount: localStorage.length,

}

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case "ADD":
      return {...state, storeAmount: state.storeAmount+1,}
    case "DEL":
      return {...state, storeAmount: state.storeAmount-1,}
    case "CLR":
      return {...state, storeAmount: 0,}
    default:
      return state
  }

}

const store = createStore(reducer)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
