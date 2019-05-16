import React, { Component } from 'react';
import './App.css';

// https://reactjs.org/docs/state-and-lifecycle.html
// https://reactjs.org/docs/handling-events.html

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
      inicio: new Date(),
      busca: ''
    };
    // es necesario porque no es automatico el binding this con la instancia de la clase
    this.quitar = this.quitar.bind(this);
    this.busqueda = this.busqueda.bind(this);
  }

  click() {
    console.log('undefined: ', this);
  }

  quitar(id) {
    // con filter obtiene una nueva lista inmutable (que es lo que le agregada a react...), no cambia la actual
    this.setState({ listado: this.state.listado.filter(item => item.objectID !== id) });
  }

  // se puede NO hacer en bind en el constructor y ocupar =>
  quitarArrow = (id) => {
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
    this.setState({ inicio: new Date() });
  }

  // synthetic React event
  busqueda(evento) {
    const busca = evento.target.value;
    this.setState({ busca });
    console.log(busca)
  }

  // opcion de filtro 1
  filtro(item) {
    return this.state.busca != '' ?
      item.title.toLocaleLowerCase().includes(this.state.busca.toLocaleLowerCase()) :
      // item.title.toLowerCase().indexOf(this.state.busca.toLowerCase()) !== -1;
      true;
  }

  // opcion de filtro 2
  filtro2(texto) {
    return item => item.title.toLocaleLowerCase().includes(texto.toLocaleLowerCase());
  }


  render() {
    return (
      <div className='App'>
        <form>
          <input type='text' onChange={this.busqueda} />
        </form>
        {
          //this.state.listado.filter(item => this.filtro(item))
          this.state.listado.filter(this.filtro2(this.state.busca))
            .map(item =>
              <div key={item.objectID}>
                <div>url: {item.url}</div>
                <div>autor: {item.author}</div>
                <div>titulo: {item.title}</div>
                <div>
                  <button onClick={() => this.quitar(item.objectID)}>quitar</button>
                  <button onClick={this.click}>click</button>
                </div>
              </div>
            )
        }
        {this.state.inicio.toISOString()}
      </div>
    );
  }
}

export default App;
