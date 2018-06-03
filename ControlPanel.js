import React from 'react';
import {Button,
        Row,
        Col,
        DropdownToggle,
        DropdownItem,
        DropdownMenu,
        ButtonDropdown,
        } from 'reactstrap';
import {store} from './StateMgt/StoreMgt';

export class ControlPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          dropdownOpen: false
        };
    }
    
    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeValue = e =>{
        let selectedBar = e.currentTarget.textContent;
        console.log(selectedBar);
        let selectedBarNo = 0;
        selectedBarNo = parseInt(selectedBar.charAt(selectedBar.length-1)) - 1;
        store.dispatch({type:'SET_SELECTED_BAR',data:selectedBarNo}); 
    }

    UpdateValue = v => {
        let controlButtonValues = store.getState().controlButtonValues;
        let progressValues = store.getState().barPercentages;
        let selectedBar = store.getState().selectedBar;
        progressValues[selectedBar] = progressValues[selectedBar] + controlButtonValues[v];
        store.dispatch({type:'SET_BAR_PERCENTAGES',data:progressValues}); 
    }


    render(){        
        const progressBarItems = this.props.Bars.map((bar,index) =>{
            return(
                <DropdownItem key={index+1}><div onClick={this.changeValue}>{`Progress#${index + 1}`}</div></DropdownItem>
            );
        });
        const btnItems = this.props.Buttons.map((buttonValue,index) =>{
            return(
                    <Button onClick={() => this.UpdateValue(index)}key={index+1} color="warning" >{buttonValue.toString()}</Button>                    
            );
        });
        return(
            <div>
                <Row>
                    <Col lg={3} md={6} sm={6} xs={12}></Col>
                    <Col lg={3} md={6} sm={6} xs={12}>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} color="warning">
                            <DropdownToggle caret color="warning">
                                {`Progress#${store.getState().selectedBar + 1}`}
                            </DropdownToggle>
                            <DropdownMenu>
                                {progressBarItems}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12}>
                            {btnItems}
                    </Col>
                </Row>
            </div>
        );
    }
}