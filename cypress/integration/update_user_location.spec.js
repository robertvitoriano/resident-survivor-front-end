describe('Updates the location of the user',()=>{
    it("Should update user's location",()=>{
      cy.visit("localhost:3000/8580c704-e7db-4014-9ffc-64227f2e41d4/update")
      
      cy.get('[data-testid="searchField"]')
        .type('8580c704-e7db-4014-9ffc-64227f2e41d4');

      cy.get('[data-testid="searchButton"]')
       .click();  

      cy.get('[data-testid="updateLocationField"]')
       .type("10.10,10.10");

      cy.get('[data-testid="updateButton"]')
       .click();      
    })
})