
import React from 'react';
import MainWrap from './MainWrap';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
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

describe('MainWrap', () => {
  test('renders MainWrap component', () => {
    const render = () => renderWithRouter(MainWrap);
    render(<MainWrap />);
  });

  test('Include Great Books heading', () => {
    const render = () => renderWithRouter(MainWrap);
    render(<MainWrap />);
    const linkElement = screen.getByText(/Great Books/i);
    expect(linkElement).toBeInTheDocument();



  });

  test('Include search box', () => {
    const render = () => renderWithRouter(MainWrap);
    render(<MainWrap />);
    const searchElement = screen.getByRole('textbox');
    expect(searchElement).toBeInTheDocument();
  });

  test('Include search button', () => {
    const render = () => renderWithRouter(MainWrap);
    render(<MainWrap />);
    const searchSubmitElement = screen.getByRole('button');
    expect(searchSubmitElement).toBeInTheDocument();
  });
});
