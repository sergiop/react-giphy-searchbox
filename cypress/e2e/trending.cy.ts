describe('Trending', () => {
  it('successfully show trending images', () => {
    cy.intercept('GET', 'https://api.giphy.com/v1/gifs/trending*').as(
      'getTrending',
    );

    cy.visit('/');

    // Check if the spinner is visible
    cy.get('[data-cy="spinner"]').should('exist');

    // Check if the first page request has been made
    cy.wait('@getTrending').its('request.url').should('include', 'offset=0');

    // Check if the first set of images has been loaded
    cy.get('[data-cy="gif-image"]').should('have.lengthOf', 20);

    // Scroll to the bottome of the image list to scroll to the next page
    cy.get('[data-cy="gif-image"]').eq(19).scrollIntoView({ duration: 1000 });

    // Check if the second page request has been made
    cy.wait('@getTrending').its('request.url').should('include', 'offset=20');

    // Check if the second set of images has been appended to the list
    cy.get('[data-cy="gif-image"]').should('have.length.least', 40);
  });
});
