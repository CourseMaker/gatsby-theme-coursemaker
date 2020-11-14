const jsYaml = require(`js-yaml`)
const _ = require(`lodash`)
const crypto = require('crypto');

// https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/#find-and-modify-markdown-nodes
exports.onPreInit = () => {
    console.log("Converting strapi markdown to MDX...")
}

async function onCreateNode({
                                node,
                                actions,
                                loadNodeContent,
                                createNodeId,
                                createContentDigest,
                            }) {
    function transformObject(obj, id, type) {
        const yamlNode = {
            ...obj,
            id,
            children: [],
            parent: node.id,
            internal: {
                contentDigest: createContentDigest(obj),
                type,
            },
        }
        //createNode(yamlNode)
        //createParentChildLink({ parent: node, child: yamlNode })
    }
    const { createNode, createParentChildLink } = actions

    // if (node.internal.type == 'StrapiSiteBuild') {
    //   console.log(node)
    //   // convert lectures to MDX
    //   // TODO apply to all courses + sections, this is a PoC
    //   node[0].school.courses[0].sections[0].lectures.forEach(lecture => {
    //     console.log(lecture)
    //     const newNode = {
    //       id: createNodeId(`TEST-${lecture.id}`),
    //       parent: node.id,
    //       children: [],
    //       internal: {
    //         content: lecture.body_markdown || " ",
    //         type: "CHRIS_TEST",
    //         mediaType: "text/markdown",
    //         contentDigest: crypto
    //             .createHash("md5")
    //             .update(lecture.body_markdown || " ")
    //             .digest("hex"),
    //       },
    //     };
    //     actions.createNode(newNode);
    //     actions.createParentChildLink({
    //       parent: node,
    //       child: newNode,
    //     });
    //   })
    // }

    if (node.internal.type == 'StrapiLecture') {
        const newNode = {
            id: createNodeId(`mdxLecture-${node.id}`),
            parent: node.id,
            children: [],
            internal: {
                content: node.body_markdown || " ",
                type: "StrapiMDXLecture",
                mediaType: "text/markdown",
                contentDigest: crypto
                    .createHash("md5")
                    .update(node.body_markdown || " ")
                    .digest("hex"),
            },
        };
        actions.createNode(newNode);
        actions.createParentChildLink({
            parent: node,
            child: newNode,
        });
    }
}
exports.onCreateNode = onCreateNode