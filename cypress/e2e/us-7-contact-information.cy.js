describe('View Contact Information', () => {
  beforeEach(() => {
    // Login as user and /navigate
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts');
  });

  it('views contact information for a Post', () => {
    // Search and open
    cy.get('#search').type('Banana');
    cy.get('[data-testid="search-button"]').click();
    cy.contains('a', 'Detail').click();
    cy.contains('View Post').should('be.visible');
    cy.contains('button', /Interested/i).click();
    cy.contains('button', /Contact Information/i).click();

    // Validate Contact Information
    cy.get('[data-testid="contact-email"]').should('exist');
    cy.get('[data-testid="contact-number"]').should('exist');

    // Close dialog
    cy.contains('button', /Ok/i).click();
  });
});
