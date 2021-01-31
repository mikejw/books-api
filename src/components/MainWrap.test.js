
import React from 'react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import MainWrap from "./MainWrap";
import { act } from "react-dom/test-utils";
const history = createMemoryHistory();

/*
 * Testing within Routes:
 * https://gitmemory.com/issue/testing-library/react-testing-library/493/542652139
 */
export const renderWithRouter = (pageReq) => render(
  <Router history={ history }>
    <Route>
      <MainWrap pageReq={ pageReq } />
    </Route>
  </Router>
);

describe('MainWrap', () => {
  test('renders MainWrap component', () => {
    renderWithRouter(1);
  });

  test('Include Great Books heading', () => {
    renderWithRouter(1);
    const linkElement = screen.getByText(/Great Books/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Include search box', () => {
    renderWithRouter(1);
    const searchElement = screen.getByRole('textbox');
    expect(searchElement).toBeInTheDocument();
  });

  test('Include search button', () => {
    renderWithRouter(1);
    const searchSubmitElement = screen.getByRole('button');
    expect(searchSubmitElement).toBeInTheDocument();
  });

  test('Perform search', async () => {
    act(() => {
      renderWithRouter(1);
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'faith' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => screen.findByText('City Published'));
    expect(await screen.findByText(/1 Pages Found/)).toBeInTheDocument();
  });
});

