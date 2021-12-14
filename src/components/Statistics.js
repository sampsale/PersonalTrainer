import React, { useContext } from 'react';
import { TrainingContext } from '../contexts/FetchTrainings'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Statistics() {

  const value = useContext(TrainingContext);
  const [activities] = ([value])

  let sums = activities.reduce(function (results, item) {
    if (!results.hasOwnProperty(item.activity)) {
      results[item.activity] = 0;
    }
    results[item.activity] += item.duration;
    return results;
  }, {});
  let sumarray = Object.entries(sums).map(a => ({ name: a[0], minutes: a[1] }));
  console.log(sumarray)

  const colors = [];

  for (let i = 0; i < sumarray.length; i++) {
    colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
  }

  return (
    <div>
      <BarChart
        width={700}
        height={500}
        data={sumarray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="minutes">
          {
            sumarray.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} strokeWidth={index === 2 ? 4 : 1} />
            ))
          }
        </Bar>
      </BarChart>
    </div>
  )
}