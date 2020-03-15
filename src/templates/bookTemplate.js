import React from 'react';
import BookItem from '../components/BookItem';
import {graphql} from 'gatsby';


const BookTemplate = (props) => {
    const book = props.data.books;

    return (
        <React.Fragment>
            <BookItem
                bookCover={book.localImage.childImageSharp.fixed}
                authorName={book.author.name}
                bookSummary={book.summary}
                bookTitle={book.title}
            />
        </React.Fragment>
    )
}

export const query = graphql`
query BookQuery($bookId: String!) {
    books(id: {eq: $bookId}) {
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
`

export default BookTemplate;