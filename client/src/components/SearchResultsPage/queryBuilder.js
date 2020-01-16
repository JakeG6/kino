const queryString = require('query-string');

const querybuilder = (queryObj, type = searchMovies) => {

    let queryNames = Object.keys(queryObj);
    
    let urlQuery = "";

    for (let i = 0; i < queryNames.length; i++) {

        switch(queryNames[i]) {
            //a text query to search
            case query:
               urlQuery += `&query=${queryObj.query}`;
                break;

            case year:
                urlQuery += `&query=${queryObj.query}`;
                break;

            case year:
                urlQuery += `&query=${queryObj.query}`;
                break;

            default:
              // code block
        }
    
        
    }

    
    
    switch(type) {
        case searchMovies:
            let baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=3f1b30e6df7ae6dcf64dc94b36c9487d&language=en-US`
            let
          
            break;
        case y:
          // code block
          break;
        default:
          // code block
    }

}