import './App.css';
import Doughnut from './components/Doughnut';
import { Container, Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import BarChartHorizontal from './components/BarChartHorizontal';
import chroma from "chroma-js";
import FilterComponent from './components/FilterComponent';
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const [data, setData] = useState([]);
  const colorScheme = ['#d53e4f','#f46d43','#fdae61','#abdda4','#66c2a5','#20ba89','#0c96a8','#4266c2','#6452bf','#8d58ad','#b84b9d']
  let colorSchemeDark = [];
  for (var i = 0; i < colorScheme.length; i++){
    colorSchemeDark.push(chroma(colorScheme[i]).darken().desaturate());
  }
  const [selectedInstitutions, setSelectedInstitutions] = useState();
  const [colorsSelected, setColorsSelected] = useState(colorScheme);
  const minimumDatasets = 30;
  const [hoveredItem, setHoveredItem] = useState(null);



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
  }, [])

  const prepareData = (jsonData) => {
    let newData = [];
    for (var i = 0; i < jsonData.length; i++){
      newData.push({key: jsonData[i].department, data: jsonData[i].datasets});
    }
    setData(newData);
    
  }

  //update color scheme when selection changes
  useEffect(()=>{
    setColors()
  }, [selectedInstitutions, hoveredItem])

  //set Colors according to selected and hovered Items
  const setColors = ()=>{
    let newColorsSelected = []
    let isHoveredInOthers = false; 

    //check if hovered ministry has less than 30 datasets --> belongs to "Others"
    if (hoveredItem){
      for (var i = 0; i < data.length; i++) {
        if (data[i].key === hoveredItem){
          if (data[i].data < minimumDatasets){
            isHoveredInOthers = true;
            break;
          }
        }
      }
    }

    for (var i = 0; i < data.length; i++){
      for (var j = 0; j < selectedInstitutions.length; j++) {
        if (data[i].key === selectedInstitutions[j].name){ //check if item is selected
          if (data[i].data >= minimumDatasets) { //check if number of datasets >= 30
            if (data[i].key === hoveredItem || hoveredItem === null) { //highlight only hovered bar
              newColorsSelected.push(colorScheme[i])
            } else {
              newColorsSelected.push(colorSchemeDark[i]) 
            }
          } else { //same color for institutions with datasets < 30 ("Others")
            if (isHoveredInOthers || hoveredItem === null || hoveredItem === "Others") { //highlight all items that belong to "Others"
              newColorsSelected.push(colorScheme[colorScheme.length-1]) 
            } else {
              newColorsSelected.push(colorSchemeDark[colorSchemeDark.length-1]) 
            }
            
          }          
          break;
        }
      }
    }
    setColorsSelected(newColorsSelected)
  }

  return (
    <ErrorBoundary>
      <Container fluid className="App">

      <Row className="d-flex justify-content-center">
        <Col xs={6} md = {2} lg={2}>
          <FilterComponent data={data} selectedInstitutions = {selectedInstitutions} setSelectedInstitutions={setSelectedInstitutions}></FilterComponent>
        </Col>
        <Col xs={12} md = {8} lg={8}>
        <p className="App-header">
          GovData Dashboard
        </p>
        </Col>
        <Col xs={6} md = {2} lg={2}>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col xs={12} md = {8} lg={8}>
          <div style={{color: "#969696", textAlign: "center"}}>
            <a href='https://www.govdata.de/'>GovData.de</a> is the data portal for Germany where the federal, state and local governments can share their data. <br/>
          This dashboard gives you an overview of the number of currently published datasets of each federal ministry.
          </div>
        </Col>
      </Row>
      
      <Row className="d-flex justify-content-center">
      <Col xs={3} md = {2} lg={2}></Col>

      <Col xs={8} md = {6} lg={5}>
        <BarChartHorizontal data = {data} colorScheme = {colorsSelected} selectedInstitutions={selectedInstitutions} setHoveredItem={setHoveredItem}/>
      </Col>

      <Col xs={12} md = {4} lg={5}>
        <Doughnut data={data} colorScheme = {colorsSelected} selectedInstitutions={selectedInstitutions} minimumDatasets={minimumDatasets} setHoveredItem={setHoveredItem}/>
      </Col>

      </Row>

      </Container>
    </ErrorBoundary>
    
  );
}

export default App;
