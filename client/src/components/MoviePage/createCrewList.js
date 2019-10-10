import React from 'react';

const createCrewList = pageMovie => {
      
    const movieCrew = pageMovie.movieCredits.crew;
  
    //object containing departments on film crew
    let deptObj = {};
   
    //fill object with departments
    for (let i = 0; i < movieCrew.length; i++) {
        if (deptObj.hasOwnProperty(movieCrew[i].department)) {
        }
        else {
            deptObj[movieCrew[i].department] = [];
        }
    }
    
    //fill departments with crew
    for (let i = 0; i < movieCrew.length; i++) {
        deptObj[movieCrew[i].department].push(movieCrew[i]);
    }

    //render full crew in JSX
    return (
        <div>
            {
            Object.keys(deptObj).map(department => (
                <div key={department}>
                    <h3>{department}</h3>
                    <ul>
                        {
                        deptObj[department].map(crewMember => (
                            <li key={crewMember.id}> {crewMember.name} <b>{crewMember.job}</b> </li>
                        ))
                        }
                    </ul>
                </div>
            ))
            }
        </div>
    )
}

export default createCrewList;