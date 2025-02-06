import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset or global styles */
  body, html, #__next {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  /* Additional global styling */
`;

export default GlobalStyles;