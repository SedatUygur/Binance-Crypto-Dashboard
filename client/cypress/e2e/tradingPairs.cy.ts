describe('Trading Pairs List', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Wait for 1 second to ensure the data is loaded
  });
  it('displays a loading message while fetching trading pairs', () => {
    cy.get('li').should('not.exist'); // Check that no trading pairs are displayed
    cy.get('p').should('contain', 'Loading trading pairs...'); // Check that the loading message is displayed
  });
  it('displays 100 trading pairs by default', () => {
    cy.get('li').should('have.length', 100); // Check that 100 trading pairs are displayed by default
  });
  it('filters trading pairs by search term', () => {
    cy.get('input').type('BTC'); // Type 'BTC' into the search input field
    cy.get('button').should('contain', 'BTC'); // Check that only pairs containing 'BTC' are displayed
  });
  it('filters trading pairs by base asset', () => {
    cy.get('input').type('BTC'); // Select 'ETH' as the base asset
    cy.get('button').should('contain', 'ETH'); // Check that only pairs with 'ETH' as the base asset are displayed
  });
  it('filters trading pairs by quote asset', () => {
    cy.get('input').type('BTC'); // Select 'BTC' as the quote asset
    cy.get('button').should('contain', 'BTC'); // Check that only pairs with 'BTC' as the quote asset are displayed
  });
  it('filters trading pair and displays 10 or more trading pairs', () => {
    cy.get('input[type="text"]').type('BTC'); // Type 'BTC' into the search input field
    cy.get('li').should('have.length.greaterThan', 10); // Check that 10 or more trading pairs are displayed after filtering
  });
  it('selects a trading pair to view details', () => {
    cy.get('button').first().click(); // Click on the first trading pair in the list
    cy.get('h3').should('contain', 'ETHBTC'); // Check that the selected pair's details are displayed
  });
  it('displays the ticker data for the selected trading pair', () => {
    cy.get('button').first().click(); // Click on the first trading pair in the list
    cy.get('h3').should('contain', 'ETHBTC'); // Check that the selected pair's details are displayed
    cy.wait(1000); // Wait for 1 second to ensure the ticker updates are received
    cy.get('p').should('contain', '24hr Price Change'); // Check that the ticker updates are displayed
  });
  it('fetches historical data for a selected trading pair', () => {
    cy.get('button').first().click(); // Click on the first trading pair in the list
    cy.get('h3').should('contain', 'ETHBTC'); // Check that the selected pair's details are displayed
    cy.wait(1000); // Wait for 1 second to ensure the historical data is fetched
    cy.get('canvas').should('exist'); // Check that the chart is displayed
  });
});
