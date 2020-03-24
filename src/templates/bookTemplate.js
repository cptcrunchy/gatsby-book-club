import React, {useContext} from 'react';
import BookItem from '../components/BookItem';
import {BookComments} from '../components/common';
import {FirebaseContext} from '../components/Firebase'
import {graphql} from 'gatsby';
import {DeleteButton} from '../components/common'

const BookTemplate = (props) => {

    const book = props.data.books;
    const {firebase, user} = useContext(FirebaseContext);

    return (
        <React.Fragment>
            <BookItem
                bookCover={book.localImage.childImageSharp.fixed}
                authorName={book.author.name}
                bookSummary={book.summary}
                bookTitle={book.title}
            />
            {!!user && user.isAdmin &&
                <DeleteButton firebase={firebase} bookId={book.id} />
            }
            {!!firebase &&
              <BookComments firebase={firebase} bookId={book.id} />
            }
            
        </React.Fragment>
    )
}

export const query = graphql`
query BookQuery($bookId: String!) {
    books(id: {eq: $bookId}) {
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
`

export default BookTemplate;