import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

import App from 'src/containers/App';
import store from 'src/redux/store';

const rootComponent = (
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>
);


render(rootComponent, document.getElementById('root'));
