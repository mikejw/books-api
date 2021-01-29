
import React from 'react';
import './sass/main.scss';
import MainWrap from './components/MainWrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function WrapMain() {
  let { page }: { page?: any } = useParams();
  if (!page) {
    page = 1;
  }
  return (
    <MainWrap pageReq={ page } />
  );
}

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/:page?" children={ <WrapMain /> } />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
