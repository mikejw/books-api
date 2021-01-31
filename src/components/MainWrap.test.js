
import React from 'react';
import MainWrap from './MainWrap';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Main from "./Main";
const history = createMemoryHistory();

/*
 * Testing within Routes:
 * https://gitmemory.com/issue/testing-library/react-testing-library/493/542652139
 */
export const renderWithRouter = (pageReq, search) => render(
  <Router history={ history }>
    <Route>
      <Main pageReq={ pageReq } search={ search } />
    </Route>
  </Router>
);

describe('MainWrap', () => {
  test('renders MainWrap component', () => {
    renderWithRouter(1, '');
  });

  test('Include Great Books heading', () => {
    renderWithRouter(1, '');
    const linkElement = screen.getByText(/Great Books/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Include search box', () => {
    renderWithRouter(1, '');
    const searchElement = screen.getByRole('textbox');
    expect(searchElement).toBeInTheDocument();
  });

  test('Include search button', () => {
    renderWithRouter(1, '');
    const searchSubmitElement = screen.getByRole('button');
    expect(searchSubmitElement).toBeInTheDocument();
  });
});
