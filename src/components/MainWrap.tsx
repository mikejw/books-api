import React, { FormEvent, ChangeEvent, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Main from './Main';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
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
  const query = useQuery();
  const history = useHistory();
  const foundSearch = query.get('q')
  const [ search, setSearch ] = useState(!!foundSearch? foundSearch: '');
  const [ submittedSearch, setSubmittedSearch] = useState(search);


  /* Will not work as expected with use of
   * `event.preventDefault()` and without
   * `history.push()`.
   */
  function submitSearch(event: FormEvent<HTMLFormElement>): void {
    pageReq = 1;
    setSubmittedSearch(search);
    history.push(`/1?q=${ encodeURI(search) }`);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearch(event.currentTarget.value);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Great Books</Navbar.Brand>
        <Nav className="mr-auto">
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

