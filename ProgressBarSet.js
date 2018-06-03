import React from 'react';
import {ProgressBars} from './ProgressBars';
import {ControlPanel} from './ControlPanel';
import {store} from './StateMgt/StoreMgt';
import {Container} from 'reactstrap';


export class ProgressBarSet extends React.Component{
    constructor(props){
        super(props); 
        this.state={   
            count : 1,        
        }       
    } 
    componentDidMount(){
        let restUrl = `http://pb-api.herokuapp.com/bars`;
        fetch(restUrl)
        .then((response) => {                        
            return response.json();
        })
        .then((details) =>{ 
            let stateData = {};
            stateData.barPercentages = details.bars;
            stateData.controlButtonValues = details.buttons;
            stateData.limit = details.limit;
            store.dispatch({type:'SET_INITIAL_STATE',data: stateData})
        })
        .catch((error) => {
            //console.log(error);
        });
        store.subscribe(
            () => {
                this.setState({});
            }
        );
    }

    render(){
        let bars = store.getState().barPercentages;
        console.log(bars);
        let buttons = store.getState().controlButtonValues;
        console.log(buttons);
        let limit = store.getState().limit;
        console.log(limit);
        return(
            <div>
                <br/><br/>
                <div className='container'>
                    <br/><br/>
                    <ProgressBars Bars={bars} Limit={limit} />
                    <br/><br/><br/>
                    <ControlPanel Bars={bars} Buttons={buttons} />
                    <br/><br/>
                </div>
            </div>
        )}
}