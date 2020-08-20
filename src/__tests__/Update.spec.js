import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Update from './../pages/Update/Update';

describe('<Update/>', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('clicking the update location button', () => {
    beforeEach(() => {
      ({ getByTestId } = render(<Update />));

      fireEvent.change(
        getByTestId('searchField'),
        {
          target: {
            value: 'bc24a62d-14cb-4a9e-a3aa-0edd5b1ac71a',
          },
        },
      );

      fireEvent.change(
        getByTestId('updateLocationField'),
        {
          target: {
            value: 'a',
          },
        },
      );

      fireEvent.click(getByTestId('updateButton'));
    });

    it('clears the text field', () => {
      expect(getByTestId('newLocationDisplay').value).toEqual('Current Position: (Longitude: a, Latitude: )');
    });
  });
});