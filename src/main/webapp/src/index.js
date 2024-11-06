import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store'

import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

serviceWorker.register();