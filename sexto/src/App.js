import React, { Component } from 'react';
import './App.css';

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
      inicio: new Date().getTime()
    };
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
                <button onClick={()=> this.quitar(item.objectID)}>quitar</button>
              </span>
            </div>
          )
        }
        {this.state.inicio}
      </div>
    );
  }
}

export default App;
