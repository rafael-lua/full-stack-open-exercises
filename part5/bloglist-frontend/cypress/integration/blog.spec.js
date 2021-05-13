describe("Blog App", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/test/reset")
    cy.visit("http://localhost:3000")
  })

  it("should show login form", () => {
    cy.contains("Login into the system")
    cy.get("#loginForm")
  })
})