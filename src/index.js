import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Normalize } from 'styled-normalize';

ReactDOM.render(
  <React.StrictMode>
    <Normalize />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
