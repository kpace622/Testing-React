import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StarWarsCharacters from './StarWarsCharacters';
import axios from 'axios'
import App from '../App';

test('Next button works', async () => {
    const wrapper = rtl.render(<App />);
    await wrapper.findByText(/luke/i);

    const nextButton = wrapper.getByText(/next/i);
    
    rtl.act(() => {
        rtl.fireEvent.click(nextButton)
    });
    const luke = wrapper.queryByText(/luke/i)
    await expect(luke).toBeNull();
})

test('Title is rendered', () => {
    const wrapper = rtl.render(<App />);

    const element = wrapper.getByAltText(/logo/i);
    expect(element).toBeVisible;
})

test('API data is being rendered', async () => {
    const wrapper = rtl.render(<App />);
    await wrapper.findByText(/luke/i);
    const luke = wrapper.queryByText(/luke/i)
    expect(luke).toBeVisible();
})

test('Change data to planet button works', async () => {
    const wrapper = rtl.render(<App />);
    const changeToPlanets = wrapper.getByText(/planets/i);

    rtl.act(() => {
        rtl.fireEvent.click(changeToPlanets);
    });
    const luke = wrapper.queryByText(/luke/i)
    await expect(luke).toBeNull();
})