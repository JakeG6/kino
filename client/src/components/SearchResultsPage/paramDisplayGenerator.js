import axios from 'axios';
import apiKey from "../apiKey";

function paramDisplayGenerator(params) {

    let sentence = "Returning results where ";

    if ('q' in params) {
        sentence += `query is ${params.q}.`;
        return sentence; 
    }

    if ('wg' in params) {

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`).then(response => {
        
            let genreName = "";

            const genres = response.data.genres;

            genres.forEach(obj => {

                if (params.wg === obj.id.toString()) {
                    genreName = obj.name.toString();

                }
            })

            sentence += `genre is ${genreName}.`;
            console.log(sentence);

        })

        return sentence;
        
    }

    if ('wca' in params) {

        let actor = "";
        
        axios.get(`https://api.themoviedb.org/3/person/${params.wca}?api_key=${apiKey}&language=en-US`).then(response => {
            
        actor = response.data.name;
 
            sentence += `where actor is ${actor}.`;
            console.log(sentence);
            
        })
        
        return sentence;
    }    

}

export default paramDisplayGenerator;