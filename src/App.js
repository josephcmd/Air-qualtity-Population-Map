import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import MapChart from "./components/MapChart"
import "./App.css"
//imports
function App() {
  const [content, setContent] = useState("");
  const [polutants, setPolutants] = useState({data: {data:""},});
  // state to keep population and air uality
  useEffect(() => {
    fetch(`https://api.waqi.info/feed/${content.split("—",1)}/?token=0933645295b75fe0b23dc7f573f4a43e64d2a1e3`)
                      .then(response => response.json())
                      .then(data => setPolutants(data));
                      
                  
  }, [content])
  // requests

  return (
    <React.Fragment>
    // fragment as a container
    
    <div className="container shadow-lg rounded p-0 mt-3 bg-dark">
      <MapChart className="l" setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
    <div class="container mt-3">
       <div className="row">
         <div className="col-6 p-1">
         
         <div class="card text-white bg-primary">
          
           <div class="card-body">
             <h4 class="card-title">Population / Air</h4>
             <p class="card-text">{content}</p>
           </div>
         </div>
        </div>
        <div className="col-6 p-1">
         
         <div class="card text-white bg-primary">
          
           <div class="card-body">
             <h4 class="card-title">Humidity</h4>
            {(polutants.status == "error")&& <p class="card-text">{"no data"}</p>}
            {(polutants.status == "ok")&& <p class="card-text"> {polutants.data.iaqi.h.v}</p>}

           </div>
         </div>
         </div>
         <div className="col-6 p-1">
         
         <div class="card text-white bg-primary">
          
           <div class="card-body">
             <h4 class="card-title">Nitrogen dioxide</h4>
             {(polutants.status == "ok")&&(polutants.data.iaqi.no2 != undefined)&& <p class="card-text"> {polutants.data.iaqi.no2.v}</p>}
             {(polutants.status == "error")&& <p class="card-text">{"no data"}</p>}
           </div>
         </div>
         </div>
         <div className="col-6 p-1">
         
         <div class="card text-white bg-primary">
          
           <div class="card-body">
             <h4 class="card-title">Ozone</h4>
             {(polutants.status == "ok")&&(polutants.data.iaqi.o3 != undefined)&& <p class="card-text">{polutants.data.iaqi.o3.v}</p>}
             {(polutants.status == "error")&& <p class="card-text">{"no data"}</p>}
           </div>
         </div>
         </div>
    </div>
    </div>
    </React.Fragment>
  );
}

export default App;
