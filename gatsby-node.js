const path = require('path');


exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    return graphql(`
    query allBooksQuery {
      allBooks {
        edges {
          node {
            id
          }
        }
      }
    }    
    `).then( (result) => {
        if(result.errors) throw result.errors;

        result.data.allBooks.edges.forEach( book => {
            createPage({
                path: `/book/${book.node.id}`,
                component: path.resolve('src/templates/bookTemplate.js'),
                context: {bookId: book.node.id}
            })
        })
    })
} 