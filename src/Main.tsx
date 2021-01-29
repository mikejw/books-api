import React, { useState, useEffect } from 'react';
import './sass/main.scss';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const API = 'http://nyx.vima.ekt.gr:3000';
const API_ROUTE = '/api/books';

interface Book {
  id: number;
  book_author: string[];
  book_title: string;
  book_publication_year: string;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
}

async function callAPI(page: number, itemsPerPage: number) {
  return await axios.post(
    `${API}${API_ROUTE}`,
    { page, itemsPerPage }
  )
  .then(function (response) {
    return response.data.books;
  })
  .catch(function (error) {
    return [];
  });
}

function Main() {
  const itemsPerPage = 4;
  const [ page, setPage ] = useState(1);
  const [ books, setBooks ] = useState<Book[]>([]);

  useEffect(() => {
    callAPI(page, itemsPerPage).then(setBooks);
  }, []);


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
    <div>
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
    </div>
  );
}

export default Main;