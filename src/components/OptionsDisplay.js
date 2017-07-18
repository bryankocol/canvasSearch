import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionsDisplay extends Component {
    
    constructor(){
        super();
        this.renderOptionForm = this.renderOptionForm.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        e.preventDefault();
        let form = e.target.closest("form");
        let drugNameVal = form.getElementsByTagName('input')[1].value;
    
        this.props.onSaveSearchOption(drugNameVal);
    }
 
    renderOptionForm(innerRxcui, obj) {
        let drugName = obj[innerRxcui];

        return(
            <form className="optionsDisplayForm" key={innerRxcui}> 
                <div className="displayOptionsFormInnerDiv"> 

                    <input className="optionsDisplaySubmit column column-10" value="save" type="submit" onClick={e => {
                        this.handleOnClick(e);
                        }}
                    />
                    <div className="optionsDisplayFormInfo column column-80"> {drugName} </div>

                    <input type="hidden" name="drugName" value={drugName} />
                         
                </div>

            </form>
        );
    }

    render(){
        const displayOptions = this.props.displayOptions;
        const menuOptionsSelected = this.props.menuOptionsSelected;
        return(
            <div className="optionsDisplayDiv">
                <div className="optionsDisplaySpacer"> </div>
                {Object.keys(displayOptions).map( rxcuiNum => {
            
                    return (
                        <div key={rxcuiNum} > <div className="optionsDisplaySubHeader subHeader"> Results for {menuOptionsSelected[rxcuiNum]} </div> 
                            {
                                Object.keys(displayOptions[rxcuiNum]).map( innerRxcui => {
                                return( this.renderOptionForm(innerRxcui, displayOptions[rxcuiNum])
                                )})
                            }
                        </div>
                    )
                        
                    
                })}
                
            </div>
        );
    }
}

OptionsDisplay.propTypes = {
    displayOptions: PropTypes.objectOf(PropTypes.object),
    menuOptionsSelected: PropTypes.object,
    onSaveSearchOption: PropTypes.func
};
export default OptionsDisplay;