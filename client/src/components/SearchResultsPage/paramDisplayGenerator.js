import axios from 'axios';
import apiKey from "../apiKey";

const paramDisplayGenerator = async (params) => {

    let sentence = "Returning results where: ";

    if ('q' in params) {
        sentence += `query is ${params.q}.`;
        
    }

    if ('wg' in params) {

        let response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        
        let genreName = "";

        response.data.genres.forEach(obj => {

            if (params.wg === obj.id.toString()) {
                genreName = obj.name.toString();

            }

        })

        sentence += `genre is ${genreName}.`;

    }

    if ('wca' in params) {
        
        let response = await axios.get(`https://api.themoviedb.org/3/person/${params.wca}?api_key=${apiKey}&language=en-US`);
            
        sentence += `actor is ${response.data.name}.`;
        
    }  

    return sentence;

}

export default paramDisplayGenerator;