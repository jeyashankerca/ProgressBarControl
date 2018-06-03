import React from 'react';
import {Progress} from 'reactstrap';
import {store} from './StateMgt/StoreMgt';


export class ProgressBars extends React.Component{
    render(){
        const bars = this.props.Bars.map((barValue,index) =>{
            let barPercent = 0;
            let barColor = 'blue';
            let barText = '0';
            if(barValue > this.props.Limit){
                barPercent=100;
                barText = barValue;
                barColor = 'danger';
            }else if(barValue < 0){
                barPercent=0;
                barText = barValue;
                barColor = 'blue';
            }else{
                barPercent= barValue;
                barText = barValue;
                barColor = 'blue';
            }
            return(
                <div key={index + 1}>
                    <div className="text-center">{barText}</div>
                    <Progress value={barPercent} color={barColor} />
                    <br/><br/>
                </div>
            )}
        );
        return(
            <div>
                {bars}
            </div>
        );
    }
}