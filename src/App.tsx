import React from 'react';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import store from "./redux/store";
import './App.css';
import Main from "./components/Main";

const App: React.FC = () => {
  return (
      <div className="App">
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Provider store={store}>
            <Main />
          </Provider>
        </HashRouter>
      </div>
  );
};

export default App;
