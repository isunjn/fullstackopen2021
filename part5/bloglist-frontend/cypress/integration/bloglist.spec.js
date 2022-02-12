describe('Blog List App', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'hola',
      username: 'hola',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hola')
      cy.get('#password').type('123456')
      cy.get('button').click({ force: true })

      cy.contains('hola logged in')
    })

    it('fails with wrong credentails', function() {
      cy.get('#username').type('hola')
      cy.get('#password').type('wrong')
      cy.get('button').click({ force: true })

      cy.get('.error').contains('invalid username or password')
      cy.get('html').should('not.contain', 'hola logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hola', pawword: '123456' })
    })

    it('a new blog can be created', function() {
      cy.get('button:first').click({ force: true })

      cy.get('#title').type('a new blog post')
      cy.get('#author').type('hola')
      cy.get('#url').type('httpurl')
      cy.get('submitBtn').click({ force: true })
      cy.contains('a new blog post')
    })
  })
})