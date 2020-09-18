import apiKey from "../apiKey.js";

const querybuilder = (queryObj, type = "movies", pageCount) => {

    //name of each query category
    let queryNames = Object.keys(queryObj);
    
    let urlQuery = "";

    for (let i = 0; i < queryNames.length; i++) {

        switch(queryNames[i]) {
            //text query
            case "q":
               urlQuery += `&query=${queryObj.q}`;
                break;
            //primary release year
            case "pry":
                urlQuery += `&primary_release_year=${queryObj.pry}`;
                break;
            //with companies
            case "wc":
                urlQuery += `&with_companies=${queryObj.wc}`;
                break;
            case "wca":
                urlQuery += `&with_cast=${queryObj.wca}`;
                break;
            //with genres
            case "wg":
                urlQuery += `&with_genres=${queryObj.wg}`;
                break;
            default:
              // code block
        }
        //add mandatory page count
        urlQuery += `&page=${pageCount}`;

    }

    //complete api route
    let finalURL;

    switch(queryObj.type) {

        case "movies":
            finalURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}` + urlQuery;          
            break;

        case "discover":
            finalURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc` + urlQuery;
            break;

        default:
            //search movies if Type is not included
            finalURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}` + urlQuery;          
        
    }

    return finalURL;

}

export default querybuilder;