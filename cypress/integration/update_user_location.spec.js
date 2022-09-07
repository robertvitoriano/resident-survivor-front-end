describe('Updates the location of the user',()=>{
    it("Should update user's location",()=>{
      cy.visit("localhost:3000/1db5a98b-c42b-42cf-aa6c-b7d8f425db1e/update")
      
      cy.get('[data-testid="searchField"]')
        .type('1db5a98b-c42b-42cf-aa6c-b7d8f425db1e');

      cy.get('[data-testid="searchButton"]')
       .click();  

      cy.get('[data-testid="updateLocationField"]')
       .type("10.10,10.10");

      cy.get('[data-testid="updateButton"]')
       .click();      
    })
})