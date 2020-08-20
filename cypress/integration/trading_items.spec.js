describe('Trade items with a survivor',()=>{
    it('Should make a sucessful transaction between survivors',()=>{
      cy.visit("localhost:3000/9d337126-19cd-436c-80fa-cd8465e90c6d")
      
      cy.get('[data-testid="tradeItemsLink"]')
        .click();

      cy.get('[data-testid="searchField"]')
        .type("test10");

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