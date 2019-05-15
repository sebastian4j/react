import React, { Component } from 'react';
import './App.css';

// https://reactjs.org/docs/state-and-lifecycle.html

const listado = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/d',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 1,
  },
  {
    title: 'tcaer',
    url: 'https://google.cl/e',
    author: 'otro autor',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }
];

class App extends Component {
  constructor(props) { // obligatorio porque extiende Component
    super(props);
    this.state = { // cada vez que se cambia el estado render es lanzado
      listado,
      inicio: new Date()
    };
    // es necesario porque no es automatico el binding this con la instancia de la clase
    this.quitar = this.quitar.bind(this);
  }

  click () {
    console.log('undefined: ', this);
  }
  
  quitar(id) {
    // con filter obtiene una nueva lista inmutable (que es lo que le agregada a react...), no cambia la actual
    this.setState({ listado: this.state.listado.filter(item => item.objectID !== id) });
  }

  componentDidMount() { // luego de ser renderizado en el DOM
    console.log('post renderizado');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() { // se elimina
    console.log('eliminado');
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({inicio: new Date()});
  }

  render() {
    return (
      <div className='App'>
        {
          this.state.listado.map(item =>
            <div key={item.objectID}>
              <span>{item.url}</span>&nbsp;
              <span>{item.author}</span>
              <span></span>
              <span>
                <button onClick={() => this.quitar(item.objectID)}>quitar</button>
                <button onClick={this.click}>click</button>
              </span>
            </div>
          )
        }
        {this.state.inicio.toISOString()}
      </div>
    );
  }
}

export default App;
