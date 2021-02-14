import React from 'react';
import PieChart from 'react-simple-pie-chart';


const TotalPie = () => {
    return (
        <div style={{height: "50px", width: "50px"}}>
            <PieChart 
                    slices={[
                        {
                            color: '#f00',
                            value: 10,
                            someOtherProperty: "per"
                        },
                        {
                            color: '#0f0',
                            value: 20,
                        },
                    ]}
                    viewBoxSize={[10,10]}
                    radius={5}
            />
        </div>
    );
}
 
export default TotalPie;