import React from 'react';
import './sass/main.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Main from './components/Main';
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
    <Main pageReq={ page } />
  );
}

function App() {
  return (
    <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Great Books</Navbar.Brand>

          <Nav className="mr-auto">
            {/*
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            */}
          </Nav>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <Router>
          <Switch>
            <Route path="/:page?" children={ <WrapMain /> }></Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
