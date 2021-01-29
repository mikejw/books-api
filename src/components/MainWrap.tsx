import React, { FormEvent, ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import Main from './Main';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

/*
 * No support for IE 11!
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface MainWrapProps {
  pageReq: number
}

function MainWrap({ pageReq }: MainWrapProps) {
  let query = useQuery();
  const foundSearch = query.get('q')
  //console.log(foundSearch);
  const [ search, setSearch ] = useState(!!foundSearch? foundSearch: '');
  const [ submittedSearch, setSubmittedSearch] = useState(search);

  function submitSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    pageReq = 1;
    setSubmittedSearch(search);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.currentTarget.value);
  }

  console.log(pageReq);
  // use history.push!
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Great Books</Navbar.Brand>

        <Nav className="mr-auto">
          {/*
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              */}
        </Nav>

        <Form method="GET" inline onSubmit={ submitSearch }>
          <Form.Control
            onChange={ onChange }
            value={ search }
            name="q" type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button type="submit" variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <Main search={ submittedSearch } pageReq={ pageReq } />
    </>
  );
};

export default MainWrap;

