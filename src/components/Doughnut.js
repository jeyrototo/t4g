import { useEffect, useState } from 'react';
import { PieChart, PieArcSeries, PieArc, ChartTooltip, TooltipTemplate} from 'reaviz';
import '../App.css';

const Doughnut = (props) => {
  const colorScheme = props.colorScheme;
  const data = props.data
  const selectedInstitutions = props.selectedInstitutions;
  const minimumDatasets = props.minimumDatasets;
  const setHoveredItem = props.setHoveredItem;

  const padAngle = 0.02;
  const padRadius = 170;
  const cornerRadius = 4;

  const [totalDatasets, setTotalDatasets] = useState(0);
  const [doughnutData, setDoughnutData] = useState();

  //Allocate all ministries that provide less than 30 dataset to "others"
  useEffect(()=>{
    let newDoughnutData = [];
    let newTotalDatasets = 0;
    let otherCount = 0;

    for (var i = 0; i < data.length; i++){
      for (var j = 0; j < selectedInstitutions.length; j++) {
        if (data[i].key === selectedInstitutions[j].name) {
          if (data[i].data >= minimumDatasets) {
            newDoughnutData.push(data[i]);
          }
          else {
            otherCount += data[i].data
          }
    
          newTotalDatasets += data[i].data;
          break;
        }
      }   
    }
    newDoughnutData.push({key: "Others", data: otherCount})
    setDoughnutData(newDoughnutData);
    setTotalDatasets(newTotalDatasets);

    //eslint-disable-next-line
  }, [data, selectedInstitutions, minimumDatasets])

  return (
    <div className="d-flex align-items-center justify-content-center">
    <div className='doughnut d-flex align-items-center justify-content-center'>
      <PieChart
      data={doughnutData}
      displayAllLabels={true}
      series={ 
        <PieArcSeries
        cornerRadius={cornerRadius}
        padAngle={padAngle}
        padRadius={padRadius}
        doughnut={true}
        colorScheme = {colorScheme}
        arcWidth={0.35}
        arc={
          <PieArc
            onMouseEnter={(e)=>{setHoveredItem(e.value.key)}}
            onMouseLeave={(e)=>{setHoveredItem(null)}}
            tooltip={<ChartTooltip
              content={(data, color) => (
                <TooltipTemplate
                  value={{
                    x: data.x,
                    y: (data.y * 100 / totalDatasets).toFixed(1) +" % / "+ data.y + " Datasets"
                  }}
                />
              )}>
            </ChartTooltip>}
          />
        }
        label={false}
        />
      }
      />

      <div style={{position: 'absolute', textAlign: "center"}} data-testid="doughnut">
         Total:<br/> {totalDatasets} Datasets
      </div>
    </div>
    </div>
  )
}

export default Doughnut;