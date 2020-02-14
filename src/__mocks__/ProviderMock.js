import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../store'
import { IntlProvider } from 'react-intl';
import intlUtils from '../utils/intl'
import messages from '../utils/messages'

const language = 'es'

const ProviderMock = props => (
<Provider store={store}>
    <IntlProvider
      key={language}
      locale={language}
      messages={intlUtils.flattenMessages(messages[language])}>
      <Router>
        {props.children}
      </Router>
    </IntlProvider>
  </Provider>
)

export default ProviderMock;

