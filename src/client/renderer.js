import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Cookie from 'js-cookie';
import * as AllActions from '../shared/actions';

import {
  App
} from '../shared/components';

const state    = (window) ? window.__INITIAL_STATE__ : {};
state.supportsHistory = 'pushState' in window.history;
state.canUseStorage = (global.window && !!localStorage);

async function populate(){
  return await ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!state.supportsHistory}>
      <App
        state={state}
        actions={AllActions}
        cookies={Cookie.get()}
      />
    </BrowserRouter>,
    document.getElementById('gallery')
  );
}

populate();
