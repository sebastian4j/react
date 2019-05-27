import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import 'primereact/resources/themes/luna-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.render(
    <App />
    , document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}
