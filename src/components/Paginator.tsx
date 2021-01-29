
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


interface PaginatorProps {
  page: number
  count: number,
  itemsPerPage: number
}

function Paginator({ page, count, itemsPerPage }: PaginatorProps) {

  page = Number(page);
  const pages = Math.ceil(count / itemsPerPage);
  
  return (
    <div>
      <Pagination size="sm">
        <Pagination.Prev disabled={ page === 1 } href={`/${page - 1}`} />
        <Pagination.Item active>{ page }</Pagination.Item>
        <Pagination.Next disabled={ page === pages } href={`/${page + 1}`} />
      </Pagination>
    </div>
  );
};

export default Paginator;
