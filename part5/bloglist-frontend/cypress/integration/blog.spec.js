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
    cy.get("#loginForm").should("be.visible")
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

  describe("When logged", () => {
    beforeEach(() => {
      const credentials = { username: "root", password: "root" }
      cy
        .request("POST", "http://localhost:3000/api/login", credentials)
        .then((res) => {
          localStorage.setItem("blogUserAuth", JSON.stringify(res.body))
          cy.visit("http://localhost:3000")
        })
    })

    it("should create a blog successfully", () => {
      cy.contains("New Blog").click()
      cy.get("#create-blog-form").should("be.visible")

      cy.get("#create-blog-title").type("blog title")
      cy.get("#create-blog-author").type("blog author")
      cy.get("#create-blog-url").type("blog url")

      cy.get("#create-blog-submit").click()

      cy.contains("blog title").should("be.visible")
      cy.contains("blog author").should("be.visible")
    })

    describe("When there is blogs on the database", () => {
      beforeEach(() => {
        cy.createBlog("blog title 1", "blog author 1", "blogurl")
        cy.createBlog("blog title 2", "blog author 2", "blogurl2")
        cy.createBlog("blog title 3", "blog author 3", "blogurl3")
      })

      it("should increase the likes when user clicks the like button", () => {
        cy.contains("blog title 2").parent().find(".blog-toggle").click()
        cy.contains("blog title 2").parents(".blog-block").as("blogBlock")
        cy.get("@blogBlock").find(".blog-like-button").as("blogLikeButton").should("be.visible")
        cy.get("@blogLikeButton").click()

        cy.get("@blogBlock").find(".blog-likes").contains("1")
      })

      it("should delete the blog if the user is the creator", () => {
        cy.contains("blog title 2").parent().find(".blog-toggle").click()
        cy.contains("blog title 2").parents(".blog-block").as("blogBlock")
        cy.get("@blogBlock").find(".blog-delete").as("deletebutton")

        cy.get("@deletebutton").click()

        cy.contains("blog title 2").should("not.exist")
      })
    })
  })
})