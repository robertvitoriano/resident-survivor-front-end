describe('Trade items with a survivor',()=>{
    it('Should search for a survivor and try to makem a trade',()=>{
      cy.visit("localhost:3000/b81084e8-9799-48c8-afb0-afa9cfab7436")
      
      cy.get('[data-testid="tradeItemsLink"]')
        .click();

      cy.get('[data-testid="searchField"]')
        .type("Fabio Akita");

     cy.get('[data-testid="searchButton"]')
       .click();      

     cy.wait(500);

     cy.get('[data-testid="increaseUserAK47Quantity"]')
       .click();
 
     cy.get('[data-testid="increaseUserSoupQuantity"]')
       .click();    

     cy.get('[data-testid="increaseSurvivorAidQuantity"]')
       .click();

    cy.get('[data-testid="increaseSurvivorAidQuantity"]')
       .click();     
       
    cy.get('[data-testid="tradeButton"]')
       .click();  
    })
    
})