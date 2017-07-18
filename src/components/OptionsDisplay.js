import React, { Component } from 'react';


class OptionsDisplay extends Component {
    // displayOptions

    constructor(){
        super();
        this.renderOptionForm = this.renderOptionForm.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        e.preventDefault();
        let form = e.target.closest("form");
        let drugNameVal = form.getElementsByTagName('input')[1].value;
        console.log("drugNameVal", drugNameVal);
       
        this.props.onSaveSearchOption(drugNameVal);
    }

    // ref={input => {
    //                         this.drugName = input}}
    
    renderOptionForm(innerRxcui, obj) {
        let drugName = obj[innerRxcui];
        console.log("innerRxcui, drugName",innerRxcui, drugName);
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
        console.log("displayOptions O.D.", this.props.displayOptions);
        const displayOptions = this.props.displayOptions;
        const menuOptionsSelected = this.props.menuOptionsSelected;
        console.log("menuOptionsSelected",menuOptionsSelected);
        return(
            <div className="optionsDisplayDiv">
                <div className="optionsDisplaySpacer"> </div>
                {Object.keys(displayOptions).map( rxcuiNum => {
                    console.log("rxcuiNum", rxcuiNum);

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

export default OptionsDisplay;