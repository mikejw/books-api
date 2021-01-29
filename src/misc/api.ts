
import axios from "axios";

const API = 'http://nyx.vima.ekt.gr:3000';
const API_ROUTE = '/api/books';

export interface Book {
  id: number;
  book_author: string[];
  book_title: string;
  book_publication_year: string;
  book_publication_country: string;
  book_publication_city: string;
  book_pages: number;
}

interface Response {
  books: Book[],
  count: number,
  error: boolean,
  msg?: any
}

interface Req {
  page: number,
  itemsPerPage: number,
  filter?: string[]
}

export async function callAPI(page: number, itemsPerPage: number) {
  let res: Response = {
    books: [],
    count: 0,
    error: false
  }
  const req: Req = { page, itemsPerPage };

  try {
    return await axios.post(
      `${API}${API_ROUTE}`,
      req
    )
      .then(function (response) {
        res = {
          books: response.data.books,
          count: response.data.count,
          error: false
        };
        return res;
      })
      .catch(function (error) {
        res.error = true;
        res.msg = error;
        return res;
      });
  } catch (error) {
    res.error = true;
    res.msg = JSON.stringify(error);
  }
}
