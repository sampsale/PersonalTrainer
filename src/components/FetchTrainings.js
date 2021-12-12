import React from 'react';
import '../styles.css';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

const TrainingsContext = React.createContext({});
    
    const TrainingProvider =([children]) =>{
        const [trainings, setTrainings] = React.useState([]);
        React.useEffect(() => fetchTrainings(), [])
        const fetchTrainings=()=>{
            fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(content => content.json())
            .then(responseData =>{
                setTrainings(responseData)
               
            })
            .catch(err=>console.log(err));
    
            return (
                <TrainingsContext.Provider value={[trainings, setTrainings]}>
                        {children}
                </TrainingsContext.Provider>
            )
        }
    }
   

    export { TrainingsContext, TrainingProvider };
