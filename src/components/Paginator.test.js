
import React from 'react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Paginator from "./Paginator";
const history = createMemoryHistory();

/*
 * Testing within Routes:
 * https://gitmemory.com/issue/testing-library/react-testing-library/493/542652139
 */
export const renderWithRouter = () => render(
  <Router history={ history }>
    <Route>
      <Paginator page={ 1 } count={ 1000 } itemsPerPage={ 10 } search="" />
    </Route>
  </Router>
);

describe('Paginator', () => {
  test('Renders Paginator component', () => {
    renderWithRouter();
  });

  test('Correct pagination', () => {
    renderWithRouter();
    expect(screen.queryByText(/100 Pages Found/)).toBeInTheDocument();
  });
});

