import React from 'react';
import { Tab, AppBar, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import CustomerList from './CustomerList';
import HomePage from './HomePage';
import { TrainingContextProviderStatistics, TrainingContextProviderTrainingList, TrainingContextProviderCalendar } from '../contexts/FetchTrainings'

export default function TabApp() {

  const [tab, setTab] = React.useState('one');
  const tabChange = (event, value) => {
    setTab(value)
  }

  const StyledTabs = styled((props) => (
    <Tabs

      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '110%',
      backgroundColor: '#635ee7',
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontSize: theme.typography.pxToRem(20),
      marginRight: theme.spacing(4),
      color: '#e6dbda',
      '&.Mui-selected': {
        color: 'black',
      },

    }),
  );
  return (
    <Box Typography style={{ color: "black" }}>
      <AppBar position='static' sx={{ backgroundColor: '#009933' }} >
        <StyledTabs value={tab} onChange={tabChange}>

          <StyledTab value='one' label='Home' />
          <StyledTab value='two' label='Customers' />
          <StyledTab value='three' label='Trainings' />
          <StyledTab value='four' label='Calendar' />
          <StyledTab value='five' label='Statistics' />

        </StyledTabs>
      </AppBar>
      {tab === 'one' && <div><HomePage /></div>}
      {tab === 'two' && <div><CustomerList /></div>}
      {tab === 'three' && <div><TrainingContextProviderTrainingList /></div>}
      {tab === 'four' && <TrainingContextProviderCalendar />}
      {tab === 'five' && <div><TrainingContextProviderStatistics /></div>}
    </Box>

  )
}