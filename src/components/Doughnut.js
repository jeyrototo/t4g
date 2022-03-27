import { useEffect, useState } from 'react';
import { PieChart, PieArcSeries, PieArcLabel, PieArc, ChartTooltip, TooltipTemplate, ToolTipTemplateProps, TooltipArea } from 'reaviz';
import '../App.css';
import chroma from "chroma-js";

const Doughnut = (props) => {
  const colorScheme = props.colorScheme;
  const padAngle = 0.02;
  const padRadius = 170;
  const cornerRadius = 4;
  const [totalDatasets, setTotalDatasets] = useState(0);


  const [doughnutData, setDoughnutData] = useState();

  //Allocate all ministries that provide less than 30 dataset to "others"
  useEffect(()=>{
    const data = props.data
    let newDoughnutData = [];
    let newTotalDatasets = 0;
    let otherCount = 0;
    for (var i = 0; i < data.length; i++){

      if (data[i].data > 30) {
        newDoughnutData.push(data[i]);
      }
      else {
        otherCount += data[i].data
      }

      newTotalDatasets += data[i].data;
    }
    newDoughnutData.push({key: "Sonstige", data: otherCount})
    setDoughnutData(newDoughnutData);
    setTotalDatasets(newTotalDatasets);

  }, [props.data])

  return (
    <div className="d-flex align-items-center justify-content-center">
    <div className='doughnut d-flex align-items-center justify-content-center'>
      <PieChart
      data={doughnutData}
      displayAllLabels={true}
      // margins={20}

      series={
        
        <PieArcSeries
        cornerRadius={cornerRadius}
        padAngle={padAngle}
        padRadius={padRadius}
        doughnut={true}
        // colorScheme={chroma.scale(['#6ade78', '#000a7d']).colors(11)}
        colorScheme = {colorScheme}
        //colorScheme={["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"]}
        //colorScheme={"cybertron"}
        arcWidth={0.35}
        arc={
          <PieArc
            cursor={"pointer"}
            onClick={(e)=>{console.log(e.value)}}
          />
        }
        label={false}
        // label={
        //   <PieArcLabel
        //     fontFamily='FuturaPTBook'
        //     fontSize={16}
            
        //   />
        // }
        />
      }
      />

      <div style={{position: 'absolute', textAlign: "center"}}>
         Total:<br>
         </br>{totalDatasets} Datasets <br/>
      </div>
    </div>
    </div>
  )
}

export default Doughnut;