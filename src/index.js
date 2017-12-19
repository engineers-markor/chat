import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import '@blueprintjs/core/dist/blueprint.css';
import 'normalize.css/normalize.css';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
