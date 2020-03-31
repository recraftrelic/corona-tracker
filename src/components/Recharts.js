import React from 'react';
import { Line, XAxis, CartesianGrid, Tooltip, ComposedChart, YAxis, Bar, Legend} from 'recharts';

const recordFields = [
    {
        name: "Total Cases",
        key: "total_cases",
        cases: 4000,
        infected: 2400,
        death: 400
    },
    {
        name: "Recovered Cases",
        key: "total_recovered",
        cases: 3000,
        infected: 1398,
        death: 200
    },
    {
        name: "New Case",
        key: "total_new_cases_today",
        cases: 2000,
        infected: 1800,
        death: 600
    },
    {
        name: "New Deaths",
        key: "total_new_deaths_today",
        cases: 1000,
        infected: 1400,
        death: 400
    },
    {
        name: "Active Cases",
        key: "total_active_cases",
        cases: 3000,
        infected: 1398,
        death: 200
    },
    {
        name: "Total Deaths",
        key: "total_deaths",
        cases: 2000,
        infected: 1800,
        death: 600
    }
]

const Recharts = ({ record }) => {
    return (
      <>
        {
            recordFields.map((data,index) => {
                console.log(record[data.key]) // it contains the values of different cases
            })
        }
        <ComposedChart width={730} height={250} data={recordFields}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="cases" barSize={20} fill="#7cb5ec" />
            <Line type="monotone" dataKey="infected" stroke="#39801d" />
            <Line type="monotone" dataKey="death" stroke="#ed3833" />
        </ComposedChart>
      </>
    )
}

export default Recharts;
