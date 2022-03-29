import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const FilterComponent = (props) => {

    const data = props.data;
    const [selectedInstitutions, setSelectedInstitutions] = [props.selectedInstitutions, props.setSelectedInstitutions]
    const [options, setOptions] = useState([]);

    //prepare data for MultiSelect component
    useEffect(()=>{
        let newOptions = []
        for (var i = 0; i < data.length; i++){
            newOptions.push({name: data[i].key});
        }
        setOptions(newOptions); //display all options
        setSelectedInstitutions(newOptions); //select all as default
          
    }, [data])
    

    return (
        <div className="card" style={{color: "white", backgroundColor: "transparent", border: "transparent", width: "200px", marginTop: "30px", marginLeft: "20px"}}>
                <div style={{fontFamily: "FuturaPTBook"}}>Filter Institutions:</div>
                <MultiSelect value={selectedInstitutions} options={options} onChange={(e) => {setSelectedInstitutions(e.value)}} optionLabel="name" placeholder="Select Institutions" maxSelectedLabels={1} />

        </div>
    );
}

export default FilterComponent;
