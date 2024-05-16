import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




export default function TransactionLineChart({data, dataType} : {data: any; dataType: any}) {
    console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%" className={'min-h-96'}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataType} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

  )
}
