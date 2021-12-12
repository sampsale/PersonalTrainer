import React from 'react';
import { Paper } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {  Scheduler,    Appointments, WeekView, DateNavigator, MonthView, DayView, Toolbar, ViewSwitcher, AppointmentTooltip,
  AppointmentForm,  TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';

  
  const currentDate = moment();
  let dates =[]
  const formatTimeScaleDate = date => moment(date).format('HH:mm');

export default function Calendar() {


    React.useEffect(()=>{
        dates =[]
        fetchTrainings()
    }, [])

    // fetch trainings and push to dates
    const fetchTrainings=()=>{
        
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(content => content.json())
        .then(responseData =>{
            responseData.forEach((date, i) => {
                let startDate = moment(date.date)
                let endDate = moment(date.date).add(date.duration, 'minutes');
                dates.push({'startDate': startDate.format('YYYY-MM-DDTHH:mm'), 'endDate': endDate.format('YYYY-MM-DDTHH:mm'), 'title': date.activity +' with '+date.customer.firstname})
                // console.log(dates)      
            })
        })
        .catch(err=>console.log(err));
    }

    const TimeScaleLabel = (
        { formatDate, ...restProps },
      ) => <WeekView.TimeScaleLabel {...restProps} formatDate={formatTimeScaleDate} />;

    return (
    <Paper>
    <Scheduler
    data={dates}
    
    >
      <ViewState
      defaultCurrentDate={currentDate}
      />
      <DayView
            startDayHour={7}
            endDayHour={22}
            timeScaleLabelComponent={TimeScaleLabel}
          />
      <WeekView
              startDayHour={7}
             endDayHour={22}
              timeScaleLabelComponent={TimeScaleLabel}
            />
      <MonthView
       timeScaleLabelComponent={TimeScaleLabel}
      />
      
      
        <Toolbar />
        <DateNavigator/>
        <ViewSwitcher />
        <TodayButton/>
       <Appointments />
       <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
    </Scheduler>
  </Paper>
    )
}