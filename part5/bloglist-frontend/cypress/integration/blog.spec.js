describe("Blog App", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/test/reset")

    const user = {
      name: "Superuser",
      username: "root",
      password: "root"
    }
    cy.request("POST", "http://localhost:3000/api/users", user)

    cy.visit("http://localhost:3000")
  })

  it("should show login form", () => {
    cy.contains("Login into the system")
    cy.get("#loginForm")
  })

  describe("Login", () => {
    it("should login successfully with the correct credentials", () => {
      cy.get("#login-username").type("root")
      cy.get("#login-password").type("root")
      cy.get("#login-submit-button").click()

      cy.contains("Blogs")
      cy.contains("Logged as Superuser")
    })

    it("should fail login with wrong credentials", () => {
      cy.get("#login-username").type("root")
      cy.get("#login-password").type("wrongpassword")
      cy.get("#login-submit-button").click()

      cy.contains("Logged as Superuser").should("not.exist")
      cy.get(".alert-danger")
        .contains("Login failed. Are you sure username/password is correct?")
        .and("have.css", "border", "2px solid rgb(255, 0, 0)")
    })
  })
})