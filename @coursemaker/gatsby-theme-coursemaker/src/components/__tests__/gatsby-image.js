import React from "react"
import renderer from "react-test-renderer"
import Img from "gatsby-image"
import imageDouble from "../__mocks__/img-double";

// describe("Img", () => {
//     it("renders local correctly", () => {
//         // Created using the query from Header.js
//         const imgTestSample = imageDouble;
//         const tree = renderer.create(
//             <Img
//                 className="object-cover w-full h-40 md:h-64 md:w-1/2"
//                 fluid={imgTestSample}
//                 alt="cover image"
//                 imgStyle={{ objectPosition: "center", objectFit: "contain" }}
//             />
//         ).toJSON()
//         expect(tree).toMatchSnapshot()
//     })
// })

describe("Img", () => {
    it("renders cms correctly", () => {
        // Created using the query from Header.js
        const imgTestSample = {src: "https://coursemaker-root-bucket-dev.s3.amazonaws.c…g-image.ebook_cover.png2020-10-07T20:25:12.483754"}
        const tree = renderer.create(
            <Img
                className="object-cover w-full h-40 md:h-64 md:w-1/2"
                fluid={imgTestSample}
                alt="cover image"
                imgStyle={{ objectPosition: "center", objectFit: "contain" }}
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

