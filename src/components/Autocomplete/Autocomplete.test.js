import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import mockAxios from '../../mocks/axios';
import AutocompleteComponent from './AutocompleteComponent';

describe('fetchSuggestions prop', () => {
  it('updates input field as user types', () => {
    const { queryByPlaceholderText } = render(<AutocompleteComponent />);
    const searchInput = queryByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: test } });
    expect(searchInput.value).toBe('test');
  });

  it('call axios and fetches suggestions', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        res: {
          data: {
            _embedded: { 'city:search-results': [] },
          },
        },
      })
    );
    const inputValue = await AutocompleteComponent('berlin');
    expect(inputValue).toEqual([]);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `https://api.teleport.org/api/cities/?search=${inputValue}&limit=10`
    );
    const { queryByPlaceholderText } = render(<AutocompleteComponent />);
    const searchInput = queryByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: test } });
    expect(searchInput.value).toBe('test');
  });
});

describe('onItemSelected prop', () => {
  describe('with no value', () => {
    it('does not trigger onItemSelected function', () => {
      const onItemSelected = jest.fn();
      const { queryByTestId } = render(<AutocompleteComponent onItemSelected={onItemSelected} />);
      fireEvent.click(queryByTestId('select-value'));
      expect(onItemSelected.value).not.toHaveBeenCalled();
    });
  });
  describe('with value', () => {
    it('triggers onItemSelected function', () => {
      const onItemSelected = jest.fn();
      const { queryByTestId, queryByPlaceholderText } = render(
        <AutocompleteComponent onItemSelected={onItemSelected} />
      );
      const searchInput = queryByPlaceholderText('search');
      fireEvent.change(searchInput, { target: { value: test } });

      fireEvent.click(queryByTestId('select-value'));
      expect(onItemSelected.value).toHaveBeenCalled();
    });
  });
});
