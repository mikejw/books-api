
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
  let items: any[] = [];

  items.push(
    <Pagination.Prev key={ 0 } disabled={ page === 1 } href={`/${page - 1}`} />
  );
  items.push(
    <Pagination.Item key={ 1 } active>{ page }</Pagination.Item>
  );
  items.push(
    <Pagination.Next key={ 2 } disabled={ page === pages } href={`/${page + 1}`} />
  );

  return (
    <div>
      <Pagination size="sm">{ items }</Pagination>
    </div>
  );
};

export default Paginator;
