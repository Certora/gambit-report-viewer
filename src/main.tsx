// eslint-disable-next-line simple-import-sort/imports
import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { pkg } from '@carbon/ibm-products';
import { App } from '@cmp/App';

pkg.component.Datagrid = true;

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
