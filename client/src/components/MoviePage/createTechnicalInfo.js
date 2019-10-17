import React from  'react';

const createTechnicalInfo = pageMovie => {
        let movieInfo = pageMovie.movieInfo;

        const createProductionCompanyString = () => {
            let companyNames = [];
            for (let i = 0; i < pageMovie.movieInfo.production_companies.length; i++) {
                companyNames.push(pageMovie.movieInfo.production_companies[i].name);
            }
            return companyNames;
        }

        const createCountriesofOriginString = () => {
            let countryNames = [];
            for (let i = 0; i < pageMovie.movieInfo.production_countries.length; i++) {
                countryNames.push(pageMovie.movieInfo.production_countries[i].name);
            }
            return countryNames;
        }

    return (
        <div>
            <p><b>Original Title</b> {movieInfo.original_title}</p>
            <p><b>Budget</b> {movieInfo.budget}</p>
            <p><b>Runtime</b> {movieInfo.runtime} minutes</p>
            <p><b>Production Companies</b> {createProductionCompanyString().join(", ")} </p>
            <p><b>Countries of Origin</b>  {createCountriesofOriginString().join(", ")}</p>
        </div>
    )
}

export default createTechnicalInfo