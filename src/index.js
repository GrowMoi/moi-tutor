import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'intl'
import 'intl/locale-data/jsonp/es'
import 'intl/locale-data/jsonp/en'
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/es';
import { IntlProvider } from 'react-intl';
import intlUtils from './utils/intl'
import messages from './utils/messages'
import 'moment/locale/es'
import { createIntance } from './utils/http'

//redux
import { Provider } from 'react-redux'
import store from './store'

const language = 'es'
moment.locale(language)
createIntance()

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider
      key={language}
      locale={language}
      messages={intlUtils.flattenMessages(messages[language])}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
