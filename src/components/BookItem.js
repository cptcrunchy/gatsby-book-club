import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

const BookItemWrapper = styled.section`
    border: 1px solid #CCCCCC;
    padding: 8px;
    background: white;
    margin-bottom: 8px;
    display: flex;

    h2 {
        small{
            font-size: 14px;
        }
    }
`;

const BookItemImageWrapper = styled.div`
    max-width: 200px;

    img{
        max-width: 200px;
    }
`;

const BookItemContentWrapper = styled.div`
    flex-grow: 1;
    padding: 0 0 0 8px;
`;

const BookItemBtnWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: end;

`

const BookItem = ({authorName, bookTitle, bookSummary, bookCover, children}) => {
    return (
        <BookItemWrapper>
            <BookItemImageWrapper>
                <Image fixed={bookCover} alt="Book Cover" />
            </BookItemImageWrapper>
            <BookItemContentWrapper>

            <h2>{bookTitle} <small>{authorName}</small></h2>
            <p>{bookSummary}</p>
            <BookItemBtnWrapper>
                {children}
            </BookItemBtnWrapper>
            </BookItemContentWrapper>
        </BookItemWrapper>
    )
}

export default BookItem;