import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class ResultsMenu extends Component {
    constructor(){
        super();
        this.displayOptions= this.displayOptions.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    displayOptions(drugOptions) {
        let options = []
        drugOptions.forEach( obj => {
            let drugOptionDict = {}
            const drugOption = Object.keys(obj)[0];
            const drugRxcui = obj[drugOption];
        
            drugOptionDict["value"] = drugRxcui;
            drugOptionDict["label"] = drugOption;
            options.push(drugOptionDict);
        });

        return options;
    }
    
    handleSelectChange (value) {
        this.props.handleSelectChange(value);
    }

    handleFinalSelection() {
        let selectedDrugs = this.props.value;
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
                    value={this.props.value}
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

ResultsMenu.propTypes = {
    drugOptions: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.arrayOf(PropTypes.object),
    handleDrugsSelected: PropTypes.func,
    handleDrugsSelected: PropTypes.func
};


export default ResultsMenu;