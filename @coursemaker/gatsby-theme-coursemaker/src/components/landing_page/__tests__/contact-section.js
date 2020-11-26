import React from "react"
import renderer from "react-test-renderer"
import ContactSection from "../contact-section"
import landingPageDouble from "../__mocks__/landing-page-double";

describe("ContactSection", () => {
    it("renders correctly", () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        const tree = renderer.create(<ContactSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("ContactSection", () => {
    it("renders correctly with null landing page", () => {
        // Created using the query from Header.js
        const landingPageSample = null;
        const tree = renderer.create(<ContactSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("ContactSection", () => {
    it("renders correctly with missing landing page fields", () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        landingPageSample.initialCTA = "";
        const tree = renderer.create(<ContactSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})