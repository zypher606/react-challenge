import React from 'react';
import logo from './../../../assets/logo.svg';
import './default.css';
import { Link } from 'react-router-dom';

function DefaultModule() {
  return (
    <div className="Default">
      <header className="Default-header">
        <img src={logo} className="Default-logo" alt="logo" />
        <p>
          React assessment app
        </p>

        <Link to="/product/all">Go to Assessment</Link>
      </header>
    </div>
  );
}

export default DefaultModule;
