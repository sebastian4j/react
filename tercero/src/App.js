import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component { 
  // declaracion del *componente*, cada vez que se usa retornará una nueva *instancia*
  // se instancia con <App /> en alguna parte del jsx
  render() {
    const mensaje = 'Hola mundo!';
    const persona = {name: 'sebastian', lastName: 'avila'};
    return ( // *elemento*, es de lo que los componentes estan hechos
      // el contenido del render es jsx, mezcla js y html
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      </div>
      */
//solo html
/*
      <div className="App">
        <h2>Welcome to the Road to learn React</h2>
      </div>
*/
// hola mundo
// className = class de css
      <div className="App">
        <h2>{mensaje}</h2>
        {persona.name} - {persona.lastName}
      </div>
    );
  }
}

export default App;
