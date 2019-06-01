import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import Logout from './Logout';

class Protegido extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, datos: []};
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      this.cargarDatosProtegidos();
    })
  }

  authorizationHeader() {
    if(!this.state.keycloak) return {};
    return {
      headers: {
        "Authorization": "Bearer " + this.state.keycloak.token
      }
    };
  }

  cargarDatosProtegidos() {
    fetch('http://localhost:8080/personas', this.authorizationHeader())
    .then(response => response.json())
    .then(result => this.setState({datos: result}))
    .catch(error => console.log(error));
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>          
          <h1>Acceso Restringido</h1>
          {this.state.datos.map(item => 
            <div key={item.id} className="divItem">
              <span className="spanItem">{item.id}</span>
              <span className="spanItem">{item.nombre}</span>
            </div>           
          )
          }
          <Logout keycloak={this.state.keycloak} />
        </div>
      ); else return (<div>NO fue posible la autenticación</div>)
    }
    return (
      <div>No Autenticado</div>
    );
  }
}
export default Protegido;