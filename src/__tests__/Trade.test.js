import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Trade from '../pages/Trade/Trade';

///399187d9-6ad3-4455-b387-2c9f00829a0c/trade



describe('Trade', () => {
    test('renders App component', async () => {

        render(<Trade />);

        screen.debug();


        await userEvent.type(screen.getByTestId('searchForTrade'), 'Fabio Akita'); //digitar valor


        expect(screen.getByText(/Fabio Akita/)).toBeInTheDocument();

        screen.debug();


    });
});