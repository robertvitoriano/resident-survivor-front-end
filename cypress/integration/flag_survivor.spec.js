
describe('Flags a survivor',()=>{
    it('Search for a survivor and flag him',()=>{
      cy.visit("localhost:3000/6b3a018a-c237-488f-a83f-f3bc17222d42")
      
      cy.get('[data-testid="searchField"]')
        .type("Fabio Akita");

      cy.get('[data-testid="searchButton"]')
        .click();     
    })
    
})