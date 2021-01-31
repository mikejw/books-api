
import React from 'react';
import Main from './Main';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
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

describe('Main', () => {
  test('Renders Main component', () => {
    act(() => {
      renderWithRouter(1, '');
    });
  });

  test('Renders results from API', async () => {
    act(() => {
      renderWithRouter(1, '');
    });

    expect(screen.queryByText(/City Published/)).toBeNull();

    await waitFor(() => screen.findByText('City Published'));
    expect(await screen.findByText(/City Published/)).toBeInTheDocument();
    expect(await screen.findByText(/203 Pages Found/)).toBeInTheDocument();
  });


  test('Renders different results from API', async () => {
    act(() => {
      renderWithRouter(1, 'faith');
    });

    expect(screen.queryByText(/City Published/)).toBeNull();

    await waitFor(() => screen.findByText('City Published'));
    expect(await screen.findByText(/1 Pages Found/)).toBeInTheDocument();
  });
});


