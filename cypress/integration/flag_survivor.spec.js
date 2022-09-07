
describe('Flags a survivor',()=>{
    it('Search for a survivor and flag him',()=>{
      cy.visit("localhost:3000/1db5a98b-c42b-42cf-aa6c-b7d8f425db1e")
      
      cy.get('[data-testid="searchField"]')
        .type("Fabio Akita");

      cy.get('[data-testid="searchButton"]')
        .click();     
    })
    
})