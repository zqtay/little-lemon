import { render, screen } from "@testing-library/react";
import Booking from './Booking';
import { MemoryRouter } from 'react-router-dom';

test('Renders the Booking heading', () => {
    render(<Booking />, {wrapper: MemoryRouter});
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
})