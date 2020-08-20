describe('Flags a survivor',()=>{
    it('Search for a survivor and flag him',()=>{
      cy.visit("localhost:3000/9d337126-19cd-436c-80fa-cd8465e90c6d")
      
      cy.get('[data-testid="searchField"]')
        .type("Mayara");

      cy.get('[data-testid="searchButton"]')
        .click();     
    })
    
})