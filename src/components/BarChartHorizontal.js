import {BarChart, BarSeries, LinearYAxis, LinearXAxis, LinearYAxisTickSeries, Bar, LinearYAxisTickLabel, TooltipArea, ChartTooltip, TooltipTemplate} from 'reaviz';
import '../App.css';
import { useState, useEffect } from 'react';

const BarChartHorizontal = (props) => {
  const data = props.data
  const colorScheme = props.colorScheme;
  const selectedInstitutions = props.selectedInstitutions;
  const setHoveredItem = props.setHoveredItem;

  const [barChartData, setBarChartData] = useState([]);

  //setup bar chart data
  useEffect(()=>{
    let newBarChartData = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < selectedInstitutions.length; j++) {
        if (data[i].key === selectedInstitutions[j].name) {
          newBarChartData.push(data[i]);
          break;
        }
      }
    }
    setBarChartData(newBarChartData);
  },[selectedInstitutions, data])

  return (
    <div className='barchart' data-testid="barchart">
      <BarChart
        animated={false}
        // gridlines={false}
        data={barChartData}
        xAxis={<LinearXAxis type="value" />}
        yAxis={
        <LinearYAxis
            type="category"
            tickSeries={
            <LinearYAxisTickSeries 
              tickSize={20} 
              label={<LinearYAxisTickLabel padding={5}/>}
            />}
        />
        }
        series={
        <BarSeries
          animated={false}
          tooltip={
            <TooltipArea
              placement='right'
              tooltip={
                <ChartTooltip
                  followCursor={true}
                  modifiers={{
                    offset: '5px, 5px'
                  }}
                  content={(data, color) => (
                    <TooltipTemplate
                      value={{
                        x: data.x+": "+data.y,
                        y: null,
                      }}
                    />
                  )}
                />
              }
            />
          }
          colorScheme={colorScheme}
          layout="horizontal"
          bar={
            <Bar
            animated={false}
            onMouseEnter={(e)=>{setHoveredItem(e.value.key)}}
            onMouseLeave={(e)=>{setHoveredItem(null)}}
            rx={3}
            ry={3}
            gradient={false} 
            />}
        />
        }
    />
    </div>
    
  )
}

export default BarChartHorizontal