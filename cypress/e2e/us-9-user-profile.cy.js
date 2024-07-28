describe('User PRofile', () => {
  beforeEach(() => {
    // Login as user and /navigate
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/profile');
  });

  it('checks that contact email and number fields are disabled initially', () => {
    cy.get('[data-testid="contact-email"]').should('be.disabled');
    cy.get('[data-testid="contact-number"]').should('be.disabled');
  });

  it('checks that the edit button is present and clickable', () => {
    cy.get('[data-testid="edit-button"]').should('exist').and('be.visible').click();
    cy.get('[data-testid="contact-email"]').should('not.be.disabled');
    cy.get('[data-testid="contact-number"]').should('not.be.disabled');
  });

  it('enables contact email and number fields after clicking edit', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-email"]').should('not.be.disabled');
    cy.get('[data-testid="contact-number"]').should('not.be.disabled');
  });

  it('changes value of contact number input field', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-number"]').clear().type('1234567890');
    cy.get('[data-testid="contact-number"]').should('have.value', '1234567890');
  });

  it('disables contact email and number fields after clicking cancel', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="cancel-button"]').click();
    cy.get('[data-testid="contact-email"]').should('be.disabled');
    cy.get('[data-testid="contact-number"]').should('be.disabled');
  });

  it('shows error message when trying to submit with empty fields', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-email"]').clear();
    cy.get('[data-testid="contact-number"]').clear();
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="contact-email"]').parent().contains('Email is required.');
    cy.get('[data-testid="contact-number"]').parent().contains('Phone number is required.');
  });

  it('submits the form when both fields are filled', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-email"]').clear().type('test@example.com');
    cy.get('[data-testid="contact-number"]').clear().type('1234567890');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="contact-email"]').parent().should('not.contain', 'Email is required.');
    cy.get('[data-testid="contact-number"]').parent().should('not.contain', 'Phone number is required.');
    cy.get('[data-testid="contact-email"]').should('be.disabled');
    cy.get('[data-testid="contact-number"]').should('be.disabled');
  });
});
