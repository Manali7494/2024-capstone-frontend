describe('User Profile', () => {
  beforeEach(() => {
    // Login
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/profile');
  });

  it('Updates profile contact information', () => {
    // Check initial fields
    cy.get('[data-testid="contact-email"]').should('exist');
    cy.get('[data-testid="contact-email"] input').should('have.value', 'test@gmail.com');
    cy.get('[data-testid="contact-number"]').should('exist');
    cy.get('[data-testid="contact-number"] input').should('have.value', '123-456-3435');

    cy.get('[data-testid="contact-email"] input').should('be.disabled');
    cy.get('[data-testid="contact-number"] input').should('be.disabled');

    // Click edit button
    cy.get('[data-testid="edit-button"]').should('exist').and('be.visible').click();
    cy.get('[data-testid="contact-email"] input').should('not.be.disabled');
    cy.get('[data-testid="contact-number"] input').should('not.be.disabled');

    // Edit email and number
    cy.get('[data-testid="contact-email"] input').clear();
    cy.get('[data-testid="contact-number"] input').clear();

    const newEmail = 'newemail@gmail.com';
    const newNumber = '987-654-3210';
    cy.get('[data-testid="contact-email"] input').type(newEmail);
    cy.get('[data-testid="contact-number"] input').type(newNumber);

    // Save
    cy.get('[data-testid="save-button"]').click();

    cy.get('[data-testid="contact-email"] input').should('have.value', newEmail);
    cy.get('[data-testid="contact-number"] input').should('have.value', newNumber);
  });
});
