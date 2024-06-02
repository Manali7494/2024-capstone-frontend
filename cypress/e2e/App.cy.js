describe('App', () => {
  it('successfully loads the home page', () => {
    cy.visit('/');
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('allows a user to register', () => {
      const username = 'user';
      const email = 'test@gmail.com';
      const password = '!Testpassword100';
      const phoneNumber = '123-456-3435';

      cy.get('#username').type(username);
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#phoneNumber').type(phoneNumber);
      cy.get('form').submit();

      cy.contains('Registration Successful').should('exist');
    });
  });
});
