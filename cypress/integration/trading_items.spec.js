describe('Trade items with a survivor',()=>{
    it('Should search for a survivor and try to makem a trade',()=>{
      
      cy.visit("localhost:3000/1db5a98b-c42b-42cf-aa6c-b7d8f425db1e")
      
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