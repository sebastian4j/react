import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
// clases son usadas para declarar componentes = ES6 class component
class App extends Component {
  render() {
    return (
      <div className='App'>
        {list.map(item =>  // puede ser (item, indice) --> no usar el indice como identificador, es variable debe ser estable
        
        /*function expresion
          function () { ... } -> tiene su propio this
          arrow expression
          () => { ... }       -> ocupa el this del contexto que la encierra
          a => {} // permitido
          a, b => {} // no permitido
        */
          // version original:
          /* 
          {list.map(function(item) {
            return (
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
            );
          })}
          */
          
            <div key={item.objectID}>
              <span>
                <a href={item.url}> {item.title} </a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
