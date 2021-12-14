import React, { useEffect, useState, createContext } from 'react';
import Statistics from '../components/Statistics';
import TrainingList from '../components/TrainingList'
import Calendar from '../components/Calendar';
import '../styles.css';

export const TrainingContext = createContext();
export function TrainingContextProviderStatistics() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(content => content.json())
            .then(responseData => {
                setTrainings(responseData)

            })
            .catch(err => console.log(err));

    }, [])

    return (<TrainingContext.Provider value={trainings}><Statistics /> </TrainingContext.Provider>
    )

}
export function TrainingContextProviderTrainingList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(content => content.json())
            .then(responseData => {
                setTrainings(responseData)
                console.log('test')

            })
            .catch(err => console.log(err));

    }, [])

    return (<TrainingContext.Provider value={trainings}><TrainingList /> </TrainingContext.Provider>
    )

}
export function TrainingContextProviderCalendar() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(content => content.json())
            .then(responseData => {
                setTrainings(responseData)

            })
            .catch(err => console.log(err));

    }, [])

    return (<TrainingContext.Provider value={trainings}><Calendar /> </TrainingContext.Provider>
    )

}




