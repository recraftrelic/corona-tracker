import React from 'react';
import { Line, XAxis, CartesianGrid, Tooltip, ComposedChart, YAxis, Legend} from 'recharts';

const active = [
    {
        name: "Active Cases",
        key: "new_daily_cases",
        active: 4000,
        date: '20March'
    },
    {
        name: "Active Cases",
        key: "new_daily_deaths",
        active: 2000,
        date: '21March'
    },
    {
        name: "Active Cases",
        key: "total_cases",
        active: 3000,
        date: '22March'
    },
    {
        name: "Active Cases",
        key: "total_recoveries",
        active: 2000,
        date: '23March'
    },
    {
        name: "Active Cases",
        key: "total_deaths",
        active: 3000,
        date: '24March'
    }
]

const Recharts = ({ record }) => {
    const chartDate = Object.keys(record).map(key => key) //all the dates
    const chartData = Object.keys(record).map(key => record[key]) //all cases record
    //console.log(chartDate)
    //console.log(chartData)
    return <>
        <ComposedChart width={730} height={250} data={active}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="active" stroke="#7cb5ec" />
        </ComposedChart>
    </>
}

export default Recharts;
