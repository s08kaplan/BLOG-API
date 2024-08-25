describe('blogs', () => {
     beforeEach(()=> {
        cy.login()
     })
    it('blogs test', () => {
      cy.visit('http://localhost:5173/blogs')
      cy.wait(1000)
      cy.get('[data-test="blogTitle"]',{ timeout: 10000 }).should('exist').and('not.be.empty')
      cy.get('[data-test="blogImage"]').should('exist').should('have.attr','src').and('not.be.empty')
      cy.get('[data-test="blogImage"]').should('exist').first().click({force:true})
      cy.url().should('include', '/blog-details')
     
    })
  })