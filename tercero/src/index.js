import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( // usa un DOM node del html para reemplazarlo con el componente
<App />,  // puede ser JSX como '<h1>Hello React World</h1>', no necesita ser la instanciacion de un componente
document.getElementById('root'));

// Hot Module Replacement (HMR)
// mantiene el estado de la aplicación aunque el código cambie, la aplicación se recarga no la página
if (module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
