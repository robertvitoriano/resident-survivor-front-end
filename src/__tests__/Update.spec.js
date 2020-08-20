import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  screen
} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
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
      expect(screen.getByText(/'Current Position: (Longitude: a, Latitude: )'/)).toBeInTheDocument();
                                                              
    });
  });
});