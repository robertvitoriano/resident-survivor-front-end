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

  afterEach(cleanup);

  describe('clicking the update location button', () => {
    beforeEach(() => {
      ({ getByTestId,getByText } = render(<Update />));

      fireEvent.change(
        getByTestId('searchField'),
        {
          target: {
            value: '399187d9-6ad3-4455-b387-2c9f00829a0c',
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
      expect(screen.getByText(/'Current Position: (Longitude: a, Latitude: )'/)).toBeInTheDocument();

    });
  });
});