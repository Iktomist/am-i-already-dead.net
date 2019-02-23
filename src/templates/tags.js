import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Excerpt from '../components/excerpt'
import styled from 'styled-components'
import tw from 'tailwind.macro'

const TagHeader = styled.div`
  ${ tw`font-sans text-center bg-black-monokai rounded shadow-lg text-xl text-grey-lightest p-6 m-4` }
`
const ExcerptContainer = styled.div`
  ${ tw`z-40` }
`

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${ totalCount } post${
    totalCount === 1 ? '' : 's'
  } tagged with '${ tag }'`

  return (
    <>
      <SEO title={ tag } keywords={[`gatsby`, `application`, `react`]} />
      <TagHeader>{tagHeader}</TagHeader>
      <ExcerptContainer>
        {edges.map(({ node }, i) => (
          <Excerpt data={node} i={i} key={i} />
        ))}
      </ExcerptContainer>
    </>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 570)
          frontmatter {
            tags
            date(formatString: "MMM Do YYYY")
            title
            image {
              publicURL
              childImageSharp{
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`