describe('Sort Post', () => {
  beforeEach(() => {
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts');
  });

  it('sorts by default sort of price', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('[data-testid]').then(($elements) => {
      const filteredElements = $elements.filter((_, element) => /card-item-/i
        .test(element.getAttribute('data-testid')));
      const prices = filteredElements.toArray().map((item) => parseFloat(item.dataset.price));

      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it('sorts by quantity', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('[data-testid="toggle-sort-field-dropdown"]').click();
    cy.contains('Quantity').click({ force: true });
    cy.get('[data-testid]').then(($elements) => {
      const filteredElements = $elements.filter((_, element) => /card-item-/i
        .test(element.getAttribute('data-testid')));
      const quantities = filteredElements.toArray()
        .map((item) => parseInt(item.dataset.quantity, 10));

      expect(quantities).to.deep.equal([...quantities].sort((a, b) => a - b));
    });
  });

  it('sorts by purchase date', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('[data-testid="toggle-sort-field-dropdown"]').click();
    cy.contains('Purchase Date').click({ force: true });
    cy.get('[data-testid]').then(($elements) => {
      const filteredElements = $elements.filter((_, element) => /card-item-/i
        .test(element.getAttribute('data-testid')));
      const purchaseDates = filteredElements.toArray()
        .map((item) => new Date(item.dataset.purchaseDate));
      expect(purchaseDates).to.deep.equal([...purchaseDates].sort((a, b) => b - a));
    });
  });

  it('sorts by expiry date', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('[data-testid="toggle-sort-field-dropdown"]').click();
    cy.contains('Expiry Date').click({ force: true });
    cy.get('[data-testid]').then(($elements) => {
      const filteredElements = $elements.filter((_, element) => /card-item-/i
        .test(element.getAttribute('data-testid')));
      const expiryDates = filteredElements.toArray()
        .map((item) => new Date(item.dataset.expiryDate));

      expect(expiryDates).to.deep.equal([...expiryDates].sort((a, b) => a - b));
    });
  });
});
