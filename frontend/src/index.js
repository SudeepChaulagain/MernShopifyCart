import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {ProductProvider} from './context/reducers/productContext'
import { CartProvider } from './context/reducers/cartContext';
ReactDOM.render(
    <Router>
      <CartProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CartProvider>
    </Router>,
  document.getElementById('root')
);

