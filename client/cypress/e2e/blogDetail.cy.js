describe('blogs', () => {
    beforeEach(()=> {
       cy.fetchBlogId()
       cy.login()
    })
   it('blog detail page with comments test', () => 
    {
     cy.visit('http://localhost:5173/blogs')
     cy.wait(1000)
     
    
    cy.get('[data-test="blogDetailButton"]').should('be.visible').first().click({force:true})
     cy.wait(2000)
     cy.url().should('include', `/blog-details/${Cypress.env('BLOG_ID')}`)
     
   })
 })