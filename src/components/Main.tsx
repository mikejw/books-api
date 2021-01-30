
import React, { useState, useEffect } from 'react';
import '../sass/main.scss';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { Book, callAPI } from '../misc/api';
import Paginator from './Paginator';

interface MainParams {
  pageReq: number,
  search: string
}

function Main({ pageReq, search }: MainParams) {
  const itemsPerPage = 12;
  const [count, setCount] = useState<number>(0);
  const [ books, setBooks ] = useState<Book[]>([]);
  const [ apiError, setApiError] = useState<Boolean>(false);
  const [ errorMsg, setErrorMsg] = useState<String>('');

  useEffect(() => {
    setApiError(false);
    let isCancelled = false;
    callAPI(pageReq, itemsPerPage, search).then((data => {
      //console.log(data);
      if (data && !isCancelled) {
        if (data.books.length) { setBooks(data.books); }
        if (data.count) { setCount(data.count); }
        setApiError(data.error)
        setErrorMsg(data.msg);
      }
    }));
    return () => {
      isCancelled = true;
    };
  }, [ pageReq, search ]);

  const booksMarkup = books.map((item, index) => {
    return (
      <tr key={index}>
        <td>{ item.id }</td>
        <td>{ item.book_title }</td>
        <td>{ item.book_author[0] }</td>
        <td>{ item.book_publication_year }</td>
        <td>{ item.book_publication_country }</td>
        <td>{ item.book_publication_city }</td>
        <td>{ item.book_pages }</td>
      </tr>
    )
  });

  return (
    <Container>
      { books.length > 0 &&
      <>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year Published</th>
                <th>Country Published</th>
                <th>City Published</th>
                <th>Pages</th>
            </tr>
            </thead>
            <tbody>
              { booksMarkup }
            </tbody>
        </Table>
        <Paginator
            count={ count }
            itemsPerPage={ itemsPerPage }
            page={ pageReq }
            search={ search }
        />
      </>
      }
      { (books.length < 1 && !apiError) &&
        <div className="text-center spinner-wrapper">
          <Spinner animation="grow" variant="primary" />
        </div>
      }
      { (books.length < 1 && apiError) &&
          <Alert variant="danger">
            { JSON.stringify(errorMsg) }
          </Alert>
      }
    </Container>
  );
}

export default Main;