import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const FilterComponent = (props) => {

    const [selectedCities1, setSelectedCities1] = useState(null);
    const data = props.data;
    const [options, setOptions] = useState([]);

    //prepare data for options component
    useEffect(()=>{
        let newOptions = []
        for (var i = 0; i < data.length; i++){
            newOptions.push({name: data[i].key, code: data[i].key});
        }
        setOptions(newOptions);
    }, [data])
    

    return (
        <div>
            <div className="card" style={{color: "white", backgroundColor: "transparent", border: "transparent", width: "200px", marginTop: "30px"}}>
                {/* <h5>Select Institutions</h5> */}
                <MultiSelect value={selectedCities1} options={options} onChange={(e) => setSelectedCities1(e.value)} optionLabel="name" placeholder="Select Institutions" maxSelectedLabels={1} />

            </div>
        </div>
    );
}

export default FilterComponent;
