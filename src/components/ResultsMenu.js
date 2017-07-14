import React, { Component } from 'react';
import Select from 'react-select';

class ResultsMenu extends Component {
    constructor(){
        super();
        this.displayOptions= this.displayOptions.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {
            value : []
        };
    }

    displayOptions(drugOptions) {
        let options = []
        console.log("drugOptions D.R", drugOptions);
        drugOptions.forEach( obj => {
            let drugOptionDict = {}
            const drugOption = Object.keys(obj)[0];
            const drugRxcui = obj[drugOption];
            // const optVal = {}
            // optVal[drugOption] = drugRxcui;
            // drugOptionDict["value"] = optVal;
            drugOptionDict["value"] = drugRxcui;
            drugOptionDict["label"] = drugOption;
            options.push(drugOptionDict);
        });

        return options;
    }
    
    handleSelectChange (value) {
        this.setState({ value });
    }

    handleFinalSelection() {
        let selectedDrugs = this.state.value;
        this.props.handleDrugsSelected(selectedDrugs);
    }

    
    render(){
        return(
            <div className="resultsMenuDiv">
        
                <Select
                    name="form-field-name"
                    placeholder="Choose Any Number of Options"
                    multi
                    options={ this.displayOptions(this.props.drugOptions) }
                    value={this.state.value}
                    onChange={this.handleSelectChange}
                />
                <button className="resultsMenuSubmit" type="button" onClick={ e =>
                        {this.handleFinalSelection()}
                    }
                > Search </button> 
            
            </div>
        );
    }
}

export default ResultsMenu;