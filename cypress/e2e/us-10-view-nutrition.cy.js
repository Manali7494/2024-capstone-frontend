describe('View Nutrition', () => {
  beforeEach(() => {
    // Login as user
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    // Navigate to /posts
    cy.visit('/posts');
  });

  it('views nutrition for a Post', () => {
    // Search
    cy.get('#search').type('Banana');
    cy.get('[data-testid="search-button"]').click();

    // Open Post
    cy.contains('a', 'Detail').click();

    cy.contains('View Post').should('be.visible');

    cy.contains('button', /Nutrition/i).click();

    // Validate Nutrition
    cy.contains('h6', /Calories/i).should('exist');
    cy.contains('h6', /Macronutrients/i).should('exist');
    cy.contains('h6', /Diet Labels/i).should('exist');
    cy.contains('h6', /Health Labels/i).should('exist');

    cy.contains('h6', /Macronutrients/i).click();

    const nutrients = ['fat', 'carbohydrate', 'fiber', 'sugar', 'protein'];

    nutrients.forEach((nutrient) => {
      cy.contains('li', new RegExp(nutrient, 'i')).should('exist');
    });
  });
});
