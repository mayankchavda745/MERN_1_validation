import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

describe("Testing Home Component", () => {

  test('renders app links', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId("title-link"))
    expect(screen.getByTestId("title-link")).toHaveTextContent("Network Provider");
    let titleLink = screen.getByTestId("title-link");
    expect(titleLink).toHaveAttribute("href", "/");
    let homeLink = screen.getByTestId("home-link");
    expect(homeLink).toHaveAttribute("href", "/home")
    let regLink = screen.getByTestId("raise-link");
    expect(regLink).toHaveAttribute("href", "/raise");
  });

});
