describe('Delete Post', () => {
  beforeEach(() => {
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts/1/edit');
  });

  it('deletes the post', () => {
    cy.get('button').contains('Delete').click();

    cy.get('button').contains('Yes, Delete').click();

    cy.contains('Post successfully deleted').should('exist');
  });
});
