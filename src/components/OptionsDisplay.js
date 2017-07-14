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
        const drugName = this.drugName.value;
        console.log("ref drugName", drugName);
        // this.props.onSaveSearchOption(drugName);
    }
    
    renderOptionForm(obj) {
        let drugName = this.props.displayOptions[obj];
        console.log(obj, drugName);
        return(
            <form key={obj}> 
                
                {drugName}
                <input type="hidden" value={drugName} ref={input => {
                        this.drugName = input
                    }} 
                />

                <input type="submit" onClick={e => {
                    this.handleOnClick(e);
                    }}
                />

            </form>
        );
    }

    render(){
        console.log("displayOptions O.D.", this.props.displayOptions);
        return(
            <div className="optionsDisplayDiv">
                
                {Object.keys(this.props.displayOptions).map( obj => {
                    return this.renderOptionForm(obj);
                })}
                
            </div>
        );
    }
}

export default OptionsDisplay;