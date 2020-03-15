import styled from 'styled-components'

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin: 0 0 8px 0;
    border-radius: 4px;
    border: 1px solid #CCC;
    box-shadow: none;
    
    &:focus, &:active {
        border: 1px solid rebeccapurple;
    }
`