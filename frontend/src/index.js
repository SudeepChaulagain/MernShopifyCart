import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {ProductProvider} from './context/reducers/productContext'
import { CartProvider } from './context/reducers/cartContext'
import {AuthProvider} from './context/reducers/authContext'
ReactDOM.render(
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>,
  document.getElementById('root')
);

