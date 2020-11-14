import React from "react"
import renderer from "react-test-renderer"
import Checkout from "../checkout"

describe("Checkout", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<checkout />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})