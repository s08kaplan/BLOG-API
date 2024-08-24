describe('headerFooterScreen', () => {
    const viewPorts = [
        { name: 'mobile', width: 375, height: 667 },   // Example mobile size
        { name: 'tablet', width: 768, height: 1024 },   // Example tablet size
        { name: 'desktop', width: 1280, height: 800 }   // Example desktop size
      ];

      viewPorts.forEach(({ name, width, height }) => {
    it(`should display/hide elements correctly on ${name} view`, () => {
      cy.viewport(width, height); 

      cy.visit("/"); // Replace with your page URL

      // Check visibility of elements based on viewport size
      if (name === 'mobile') {
        cy.get('[data-test="headerLinksContainer"]').should('not.be.visible');
        cy.get('[data-test="footerMessage"]').should('not.be.visible');
        cy.get('[data-test="footerIcons"]').should('not.be.visible');
      } else if (name === 'tablet') {
        cy.get('[data-test="headerLinksContainer"]').should('not.be.visible');
        cy.get('[data-test="footerMessage"]').should('not.be.visible');
      } else if (name === 'desktop') {
        cy.get('[data-test="headerLinksContainer"]').should('be.visible');
        cy.get('[data-test="footerMessage"]').should('be.visible');
        cy.get('[data-test="footerIcons"]').should('be.visible');
      }
    });
  });
 })