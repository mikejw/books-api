
import React from 'react';
import Main from './Main';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';

const history = createMemoryHistory();



/*
 * Testing within Routes:
 * https://gitmemory.com/issue/testing-library/react-testing-library/493/542652139
 */
export const renderWithRouter = Component => render(
  <Router history={ history }>
    <Route component={ Component } />
  </Router>
)


describe('Main', () => {
  test('renders Main component', () => {
    const render = () => renderWithRouter(Main);
    act(() => {
      render(<Main pageReq={1} search={''}/>);
    });
  });
});
