// src/app-client.js
import React from 'react';
import ReactDOM from 'react-dom';
import TrialComponent from './components/TrialComponent';

window.onload = () => {
  ReactDOM.render(<TrialComponent/>, document.getElementById('main'));
};