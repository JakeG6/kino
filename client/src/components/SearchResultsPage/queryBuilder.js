import apiKey from "../apiKey.js";

const querybuilder = (queryObj, type = "movies") => {

    console.log(queryObj);

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
            //with genres
            case "wg":
                urlQuery += `&with_genres=${queryObj.wg}`;
                break;
            //page
            case "p":
                urlQuery += `&page=${queryObj.p}`
            break;
            default:
              // code block
        }
    
    }

    //base api route
    let baseUrl;

    switch(queryObj.type) {

        case "movies":
            baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}` + urlQuery;          
            break;

        case "discover":
            baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc` + urlQuery;
            break;

        default:
          //search movies if Type is not included
          baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}` + urlQuery;          
        
    }

    return baseUrl;

}

export default querybuilder;