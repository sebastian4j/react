import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'amarillo'; // cangrejo
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '5';
const PARAM_HPP = 'hitsPerPage=';

// https://reactjs.org/docs/state-and-lifecycle.html
// https://reactjs.org/docs/handling-events.html

// ES6 Class Components
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { // cada vez que se cambia el estado (setState) render es lanzado
      result: null,
      listado: null,
      inicio: new Date(),
      busca: DEFAULT_QUERY
    };
    // es necesario porque no es automatico el binding this con la instancia de la clase
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.quitar = this.quitar.bind(this);
    this.busqueda = this.busqueda.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { busca } = this.state;
    this.fetchSearchTopStories(busca);
  }
  setSearchTopStories(result) {
    console.log(result);
    const { hits, page, nbPages } = result;
    const oldHits = page !== 0
      ? this.state.listado.hits
      : [];
    // acumulará los datos para mostrarlos en la misma página
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      listado: { hits: updatedHits, page, nbPages }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchSubmit(event) {
    const { busca } = this.state;
    this.fetchSearchTopStories(busca);
    event.preventDefault();
  }

  quitar(id) {
    // con filter obtiene una nueva lista inmutable (que es lo que le agregada a react...), no cambia la actual

    // no se deberia mutar el estado del objeto:
    // this.state.result.hits = this.state.listado.hits.filter(item => item.objectID !== id);

    // preferir generar nuevos estados y mantenerlos inmutables -no cambiar el estado directamente, generar uno nuevo basado en el actual-:
    // con Object.assign({}, {}, {}, ...) se hace un merge en el primer elemento de todos los demas 
    const actualizado = Object.assign({}, this.state.listado, { 'hits': this.state.listado.hits.filter(item => item.objectID !== id) });
    this.setState({ listado: actualizado });
  }


  componentWillUnmount() { // se elimina
    console.log('eliminado');
  }

  // synthetic React event
  busqueda(evento) {
    const busca = evento.target.value;
    this.setState({ busca });
  }

  // cada vez que el estado cambia se invoca
  render() {
    console.log('render')

    const { listado, busca } = this.state; // destructured, similar a: var listado = this.state.listado;
    // si 'listado' se inicializa en el constructor con null NO se dibuja el componente (return null), si se coloca [] se dibuja sin datos
    // los eventos del ciclo de vida no se interrumpen por ser null
    let paginaSiguiente;
    let total;
    let actual;
    if (listado && listado.page !== 'undefined' && listado.nbPages !== 'undefined') {
      console.log(listado.page, listado.nbPages);
      paginaSiguiente = listado.page + 1;
      actual = listado.page;
      total = listado.nbPages - 1;
    }
    console.log(actual, total, paginaSiguiente);
    let botones;
    if (paginaSiguiente > total && actual > 0) { // no hay siguiente, solo anterior
      botones = null;
    } else if (total === 0) {
      botones = null;
    } else {
      botones =
        <span>
          <Button click={() => this.fetchSearchTopStories(busca, paginaSiguiente)}>Más Resultados</Button>
        </span>
    }
    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            valor={busca}
            cambio={this.busqueda}
            submit={this.onSearchSubmit}
          >
            Buscar
          </Search>
        </div >
        {listado &&
          <Table
            list={listado.hits}
            quitar={this.quitar}
          />
        }
        <div className='interactions'>
          {botones}
        </div>
        {this.state.inicio.toISOString()}
      </div >
    );
  }
}


// ******************************
// Functional Stateless Components
// ******************************
// recibe las propiedades 
// no guarda estado (no hay this)
// no tiene eventos del ciclo de vida

// clase tiene '' por defecto y no undefined
const Button = ({ click, clase = '', children }) =>
  <button className={clase} onClick={click}>
    {children}
  </button>

/** 
// opcion 1: sin usar destructuring
function Search (props) {
  const { valor, cambio, children } = props; // tiene todas las propiedades que se le pasan al componente
  return (
    <form>
      {children}
      <input type='text' value={valor} onChange={cambio} />
    </form>
  );
}
**/

/**
// opcion 2: usando destructuring
function Search({ valor, cambio, children }) {
  return (
    <form>
      {children}
      <input type='text' value={valor} onChange={cambio} />
    </form>
  );
**/
// opciona 3: arrow
const Search = ({ valor, cambio, submit, children }) =>
  // si es necesario se puede agregar {...} para tener mas operaciones y no solo input-output
  // {return ( 
  <form onSubmit={submit}>
    {children}
    <input type='text' value={valor} onChange={cambio} />
    <button type="submit">
      {children}
    </button>
  </form>
// )}
// ******************************
// ******************************
const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

const Table = ({ list = [], quitar }) =>
  <div className='table'>
    {list.map(item =>
      <div key={item.objectID} className='table-row'>
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
          {item.author}
        </span>
        <span style={smallColumn}>
          {item.num_comments}
        </span>
        <span style={smallColumn}>
          {item.points}
        </span>
        <span style={smallColumn}>
          <Button click={() => quitar(item.objectID)} clase='button-inline'>Quitar</Button>
        </span>
      </div>
    )}
  </div>

export default App;
