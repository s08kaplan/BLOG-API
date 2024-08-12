describe('blogs', () => {
     beforeEach(()=> {
        cy.login()
        // cy.visit('http://localhost:5173/login')
        // cy.get('[data-test="loginUsername"]').should('be.visible').type('Veli')
        // cy.get('[data-test="loginEmail"]').should('be.visible').type('veli@site.com')
        // cy.get('[data-test="loginPassword"]').should('be.visible').type('aA?123456')
        // cy.get('[data-test="loginSubmit"]').should('be.visible').click({ force: true })
        // cy.url().should('include', '/blogs')
     })
    it('blogs test', () => {
      cy.visit('http://localhost:5173/blogs')
      cy.wait(1000)
      cy.get('[data-test="blogTitle"]',{ timeout: 10000 }).should('exist').and('not.be.empty')
      cy.get('[data-test="blogImage"]').should('exist').should('have.attr','src').and('not.be.empty')
      cy.get('[data-test="blogContent"]').should('exist').and('not.be.empty')
  
    // cy.get('[data-test="blogContent"]').then($el => {
    //     console.log($el.html()); // Output the HTML content to debug
    //   });

      cy.get('[data-test="blogLikes"]').should('exist').and('not.be.empty')

    //   cy.get('[data-test="blogLikes"]').then($el => {
    //     console.log("element is : ", $el);
    //   })

      cy.get('[data-test="blogDetailButton"]').should('be.visible').first().click({force:true})
      cy.url().should('include', '/blog-detail')
      cy.visit('http://localhost:5173/blogs')
      cy.get('[data-test="addNewBlog"]').should('be.visible').click({force: true})
      cy.url().should('include', '/new-blog')
    })
  })