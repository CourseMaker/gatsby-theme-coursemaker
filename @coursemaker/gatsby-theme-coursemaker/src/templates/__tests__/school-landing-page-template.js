import React from "react"
import renderer from "react-test-renderer"
import SchoolLandingPage from "../school-landing-page-template"
import pageContextDouble from "../__mocks__/course-payment-page-double";
import pageContextMissingFieldsDouble from "../__mocks__/page-context-missing-fields-double"

describe("SchoolLandingPage", () => {
    it("renders correctly", () => {
        // Created using the query from Header.js
        const pageContextTestSample = pageContextDouble;
        const tree = renderer.create(<SchoolLandingPage pageContext={pageContextTestSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

describe("SchoolLandingPage", () => {
    it("renders correctly with missing fields", () => {
        // Created using the query from Header.js
        const pageContextTestSample = pageContextMissingFieldsDouble;
        const tree = renderer.create(<SchoolLandingPage pageContext={pageContextTestSample} />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})