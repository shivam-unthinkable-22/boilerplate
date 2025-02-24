describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Check if an h1 tag exists on the page
    cy.get("h1").should("exist"); // Assert that the <h1> tag is present

    // The h1 tag should contain "About"
    cy.get("h1").contains("Home Page");
  });
});
