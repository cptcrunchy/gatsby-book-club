import React from "react"
import { Link, graphql } from "gatsby"

import SEO from "../components/seo"
import BookItem from '../components/BookItem'
import styled from 'styled-components';

const LinkButton = styled.div`
  text-align: right;
  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    &:hover{
      background: indigo;
    }
  }
`
const IndexPage = (props) => {
  
  return (
  <React.Fragment>
    <SEO title="Home" />
      {props.data.allBooks.edges.map(edge => (
        <BookItem 
          bookCover={edge.node.localImage.childImageSharp.fixed}
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
          key={edge.node.id}>
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
      ))}
  </React.Fragment>
);
}

export const query = graphql`
query allBooksQuery {
  allBooks {
    edges {
      node {
        id
        summary
        title
        localImage {
          childImageSharp{
            fixed(width:200){
              ...GatsbyImageSharpFixed
            }
          }
        }
        author {
          name
        }
      }
    }
  }
}
`

export default IndexPage
