import React from "react"
import renderer from "react-test-renderer"
import OverviewSection from "../overview-section"
import landingPageDouble from "../__mocks__/landing-page-double";

describe("OverviewSection", () => {
    it("renders correctly", () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        const tree = renderer.create(<OverviewSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("OverviewSection", () => {
    it("renders correctly with null landing page", () => {
        // Created using the query from Header.js
        const landingPageSample = null;
        const tree = renderer.create(<OverviewSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("OverviewSection", () => {
    it("renders correctly with missing landing page fields", () => {
        // Created using the query from Header.js
        const landingPageSample = landingPageDouble;
        landingPageSample.initialCTA = "";
        const tree = renderer.create(<OverviewSection landingPage={landingPageSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})