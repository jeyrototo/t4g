import React from 'react';
import {BarChart, BarSeries, LinearYAxis, LinearXAxis, LinearYAxisTickSeries, Bar, GuideBar, BarLabel} from 'reaviz';
import '../App.css';

const BarChartHorizontal = (props) => {
  const colorScheme = props.colorScheme;

  return (
    <div className='barchart'>
      <BarChart
        // width={800}
        // height={500}
        gridlines={false}
        data={props.data}
        xAxis={<LinearXAxis type="value" />}
        yAxis={
        <LinearYAxis
            type="category"
            tickSeries={<LinearYAxisTickSeries tickSize={20} />}
        />
        }
        series={
        <BarSeries
            colorScheme={colorScheme}
            layout="horizontal"
            bar={
              <Bar 
              gradient={false} 
              guide={<GuideBar/>}
              label={<BarLabel fill={"white"} position={"top"} fontSize={10} padding={6}/>}
              />}
        />
        }
    />
    </div>
    
  )
}

export default BarChartHorizontal