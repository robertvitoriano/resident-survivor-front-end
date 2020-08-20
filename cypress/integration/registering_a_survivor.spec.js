describe('Registering a survivor',()=>{
  it('Registers a new survivor into the database',()=>{

    cy.visit('http://localhost:3000');

    cy.get('[data-testid="name"]')
      .type('test-person');

    cy.get('[data-testid="age"]')
      .type('22');

    cy.get('[data-testid="gender"]')
      .type('M');       

   cy.get('[data-testid="location"]')
      .type('30.22,60.22');

   cy.get('[data-testid="nextButton"]')
     .click();    
     cy.get('[data-testid="increaseAK47QuantityButton"]')
     .click();  
     cy.get('[data-testid="finishButton"]')
     .click();    
  });

})