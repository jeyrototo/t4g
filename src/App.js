import './App.css';
import Doughnut from './components/Doughnut';
import { Container, Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import BarChartHorizontal from './components/BarChartHorizontal';
import chroma from "chroma-js";
import FilterComponent from './components/FilterComponent';

function App() {
  const [data, setData] = useState([]);
  const colorScheme = ['#d53e4f','#f46d43','#fdae61','#abdda4','#66c2a5','#20ba89','#0c96a8','#4266c2','#6452bf','#8d58ad','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d','#b84b9d']
  const [selectedInstitutions, setSelectedInstitutions] = useState()

  // useEffect(()=>{
  //   console.log(selectedInstitutions)
  // }, [selectedInstitutions])

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

  return (
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

      {/* <Row className="d-flex justify-content-center">
        <Col xs={6} md = {6} lg={12}>
          <FilterComponent data={data}></FilterComponent>
        </Col>
      </Row> */}

      <Row className="d-flex justify-content-center">
      <Col xs={3} md = {2} lg={2}></Col>
      
      <Col xs={8} md = {6} lg={5}>
        <BarChartHorizontal data = {data} colorScheme = {colorScheme} selectedInstitutions={selectedInstitutions}/>
      </Col>

      <Col xs={12} md = {4} lg={5}>
        <Doughnut data={data} colorScheme = {colorScheme} selectedInstitutions={selectedInstitutions}/>
      </Col>

      </Row>

    </Container>
  );
}

export default App;
