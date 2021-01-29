
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


interface PaginatorProps {
  page: number
  count: number,
  itemsPerPage: number,
  search: string
}

function Paginator({ page, count, itemsPerPage, search }: PaginatorProps) {

  page = Number(page);
  const pages = Math.ceil(count / itemsPerPage);

  return (
    <div>
      <Pagination size="sm">
        <Pagination.Prev disabled={ page === 1 } href={`/${page - 1}?q=${search}`} />
        <Pagination.Item active>{ page }</Pagination.Item>
        <Pagination.Next disabled={ page === pages } href={`/${page + 1}?q=${search}`} />
      </Pagination>
      <p>{`${pages} Pages Found`}</p>
    </div>
  );
};

export default Paginator;
