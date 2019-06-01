import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Publico from './Publico';
import Protegido from './Protegido';
import './App.css';

// datos muy importantes
// https://scalac.io/user-authentication-keycloak-1/
// https://scalac.io/user-authentication-keycloak-2/

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="enlace"><Link to="/">Contenido Publico</Link></div>
          <div className="enlace"><Link to="/protegido">Contenido Protegido</Link></div>
          <Route exact path="/" component={Publico} />
          <Route path="/protegido" component={Protegido} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;