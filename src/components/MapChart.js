import React, { memo, useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent }) => {
    const [meter,setMeter] = useState("")
    const [name, setName] = useState("")
   
    
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    
                    setName(NAME);
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}: ${"loading"}`);
                    if (NAME === "United States of America"){
                      fetch(`https://api.waqi.info/feed/${"new york"}/?token=0933645295b75fe0b23dc7f573f4a43e64d2a1e3`)
                      .then(response => response.json())
                      .then(data => setTooltipContent(`${NAME} — ${rounded(POP_EST)}: ${data.data.aqi}`));
                    }else if(NAME ==="Saudi Arabia"){
                      fetch(`https://api.waqi.info/feed/${"jeddah"}/?token=0933645295b75fe0b23dc7f573f4a43e64d2a1e3`)
                      .then(response => response.json())
                      .then(data => setTooltipContent(`${NAME} — ${rounded(POP_EST)}: ${data.data.aqi}`));
                    }
                    else{
                   fetch(`https://api.waqi.info/feed/${NAME}/?token=0933645295b75fe0b23dc7f573f4a43e64d2a1e3`)
                      .then(response => response.json())
                      .then(data => setTooltipContent(`${NAME} — ${rounded(POP_EST)}: ${data.data.aqi}`));
                    
                  }}
                }
                 
                  onMouseLeave={() => {
                    setTooltipContent("");
                    
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);