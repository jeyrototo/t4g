import { useEffect, useState } from 'react';
import { PieChart, PieArcSeries, PieArcLabel, PieArc } from 'reaviz';
import '../App.css';

const Doughnut = () => {
  
  var height = 700;
  var width = 1000; 
  const padAngle = 0.02;
  const padRadius = 170;
  const cornerRadius = 4;
  const color = "red";

  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch('backend-response.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        prepareData(myJson);
      });
  },[])

  const prepareData = (jsonData) => {
    let newData = [];
    for (var i = 0; i < jsonData.length; i++){
      newData.push({key: jsonData[i].department, data: jsonData[i].datasets});
    }
    setData(newData);
  }

  return (
    <div className='doughnut'>
    <PieChart
    // width={width}
    // height={height}
    data={data}
    displayAllLabels={true}
    
    series={
      <PieArcSeries
      cornerRadius={cornerRadius}
      padAngle={padAngle}
      padRadius={padRadius}
      doughnut={true}
      colorScheme={"cybertron"}
      arcWidth={0.35}
      arc={
        <PieArc
          tooltip={false}
          onClick={(e)=>{console.log(e.value)}}
        />
      }
      label={
        <PieArcLabel
          fontFamily='FuturaPTBook'
        >
        </PieArcLabel>
      }
      />
    }
    />
    </div>
  )
}

export default Doughnut;