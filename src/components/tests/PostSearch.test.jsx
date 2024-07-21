import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostSearch from '../PostSearch';

describe('PostSearch', () => {
  const setup = () => {
    const utils = render(<PostSearch
      inputValue=""
      setInputValue={() => {}}
      clearSearch={() => {}}
      setSearch={() => {}}
    />);
    const input = utils.getByLabelText('Search');
    return {
      input,
      ...utils,
    };
  };

  it('renders the input field correctly', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('updates the input field on change', () => {
    const setInputValue = jest.fn();
    render(<PostSearch
      inputValue=""
      setInputValue={setInputValue}
      clearSearch={() => {}}
      setSearch={() => {}}
    />);
    const input = screen.getByLabelText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setInputValue).toHaveBeenCalledWith('test');
  });

  it('clears the input field when the clear button is clicked', () => {
    const clearSearch = jest.fn();
    render(<PostSearch
      inputValue="test"
      setInputValue={() => {}}
      clearSearch={clearSearch}
      setSearch={() => {}}
    />);
    fireEvent.click(screen.getByTestId('clear-button'));
    expect(clearSearch).toHaveBeenCalled();
  });

  it('calls setSearch with input value when the search button is clicked', () => {
    const setSearch = jest.fn();
    render(<PostSearch
      inputValue="test"
      setInputValue={() => {}}
      clearSearch={() => {}}
      setSearch={setSearch}
    />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(setSearch).toHaveBeenCalledWith('test');
  });
});
