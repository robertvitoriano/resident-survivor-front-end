import React from 'react';

import {render, waitForElement} from '@testing-library/react'

import Register from '../pages/Register/Register'


describe('Test a new survivor registration',()=>{
    it('Should store a new use into the database', async()=>{
        const {getByTestId} = render(<Register/>);
        const nameField =  getByTestId('name')
        console.log(nameField)
        
    })
})