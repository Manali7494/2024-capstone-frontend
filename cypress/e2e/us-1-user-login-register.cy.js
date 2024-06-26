describe('User Login and Register', () => {
  it('successfully loads the home page', () => {
    cy.visit('/');
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('allows a user to register', () => {
      const username = 'user';
      const name = 'User';
      const email = 'test@gmail.com';
      const password = '!Testpassword100';
      const phoneNumber = '123-456-3435';

      cy.get('#username').type(username);
      cy.get('#name').type(name);
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#phoneNumber').type(phoneNumber);
      cy.get('form').submit();

      cy.contains('Registration successful').should('exist');
    });

    it('shows error on duplicate email registration', () => {
      const username = 'user';
      const name = 'User';
      const email = 'test@gmail.com';
      const password = '!Testpassword100';
      const phoneNumber = '123-456-3435';

      cy.get('#username').type(username);
      cy.get('#name').type(name);
      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('#phoneNumber').type(phoneNumber);
      cy.get('form').submit();

      cy.contains('Email already exists').should('exist');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('allows a user to login and signout', () => {
      const email = 'test@gmail.com';
      const password = '!Testpassword100';

      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('form').submit();

      cy.contains('Login successful').should('exist');

      cy.get('#signout').click();
    });

    it('shows error on incorrect password', () => {
      const email = 'test@gmail.com';
      const password = 'IncorrectPassword';

      cy.get('#email').type(email);
      cy.get('#password').type(password);
      cy.get('form').submit();

      cy.contains('Incorrect password').should('exist');
    });
  });
});
