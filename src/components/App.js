import React, { Component } from 'react';

import OptionsDisplay from './OptionsDisplay';
import ResultsMenu from './ResultsMenu';
import SearchBar from './SearchBar';

import * as api from '../api';

import 'react-select/dist/react-select.css';

class App extends Component {
    constructor(){
        super();
        this.queryAutoCompleteTerms = this.queryAutoCompleteTerms.bind(this);
        this.onQueryAutoCompleteTermsSuccess = this.onQueryAutoCompleteTermsSuccess.bind(this);
        this.onDrugSearch = this.onDrugSearch.bind(this);
        this.onDrugSearchSuccess = this.onDrugSearchSuccess.bind(this);
        this.handleDrugsSelected = this.handleDrugsSelected.bind(this);
        this.onhandleDrugsSelectedSuccess = this.onhandleDrugsSelectedSuccess.bind(this);
        this.onSaveSearchOption = this.onSaveSearchOption.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        
        this.state = {
            termsArray : [],
            drugSearched: "",
            toDisplayMenu: false,
            toDisplayOptions: false,
            value: [],
            // [{"drugSyn":"rxcui"}, etc]
            menuOptions: [],
            //{drugrxcui: drugName, drugrxcui:drugName, etc}
            menuOptionsSelected: {},
            // {rxcuiSearched: {rxcuiOption: nameOption, rxcuiOpiton:nameOption}, etc}
            drugOptionsDisplay: {}

        };
    }
    /// Query All Terms for AutoComplete ///
    componentWillMount(){
        this.queryAutoCompleteTerms()
    }

    onQueryAutoCompleteTermsSuccess(response){
        let termsArray = [];
        response.displayTermsList.term.forEach( term => {
            let termsDict = {};
            termsDict["name"] = term;
            termsArray.push(termsDict);

        });
        this.setState({ termsArray });
    }

    queryAutoCompleteTerms(){
        api.autoCompleteTerms()
            .then(response => this.onQueryAutoCompleteTermsSuccess(response))
    }

    /// Search for Intial Drug Dose Options ///
    onDrugSearchSuccess(response){
        const infoArray = response.drugGroup.conceptGroup || [];

        let drugInfo = [];
        infoArray.forEach( obj => {
            if ("conceptProperties" in obj){
                obj.conceptProperties.forEach( item => { 
                    let drugDict={}
                    drugDict[item.synonym] = item.rxcui;
                    drugInfo.push(drugDict);
                });
            }
        });

        this.setState({
            menuOptions: drugInfo, 
            drugSearched: response.drugGroup.name,
            menuOptionsSelected : {},
            toDisplayMenu: true,
            toDisplayOptions: false,
            drugOptionsDisplay: {}, 
            value: []
        });
    }


    onDrugSearch(drugName){
        api.drugSearch(drugName)
            .then(response => this.onDrugSearchSuccess(response))
    }

    handleSelectChange(value) {
        this.setState({value});
    }

    ///handle Drug Dose Options Chosen From ResultsMenu ///
    onhandleDrugsSelectedSuccess(response){
        
        let rxcuiSearched = response.relatedGroup.rxcui;
        let optionsArray = response.relatedGroup.conceptGroup;
        let stateDrugOptionDisplay = this.state.drugOptionsDisplay;

        optionsArray.forEach( obj =>{
            let objInfo =  obj.conceptProperties[0];
                if ( rxcuiSearched in stateDrugOptionDisplay) { 
                    stateDrugOptionDisplay[rxcuiSearched][objInfo.rxcui] = objInfo.name;
                } else {
                    let drugNamesDict = {};
                    drugNamesDict[objInfo.rxcui] = objInfo.name;
                    stateDrugOptionDisplay[rxcuiSearched] =  drugNamesDict; 
                }
        });
        this.setState({
            drugOptionsDisplay: stateDrugOptionDisplay,
            toDisplayOptions: true,
            toDisplayMenu: false
        })
    }

    handleDrugsSelected(selectedDrugs){
        selectedDrugs.forEach( obj => {
            let drugNumber = obj.value;
            api.searchAllOptions(drugNumber)
                .then(response => this.onhandleDrugsSelectedSuccess(response))
        });

        let selectedDrugsDict = {}
        selectedDrugs.forEach( obj =>{
            let drugNumber = obj.value;
            let drugName = obj.label;
            selectedDrugsDict[drugNumber] = drugName;
        });
        this.setState({menuOptionsSelected: selectedDrugsDict})
    }

    onSaveSearchOption(drugName){
        api.saveSearchOption(drugName)
            .then(response => console.log("Your Search Has Been Saved"))
    }

    render(){
        if (this.state.toDisplayMenu){
            return(

                <div className="appDiv container">
                    <SearchBar 
                        inputPlaceholder = "Drug Name"
                        inputVal="drugName"
                        btnName="Search"
                        funcSearch={this.onDrugSearch}
                        funcInput={this.ondrugFragSearch}
                        terms={this.state.termsArray}
                    />
                    
                    <ResultsMenu
                        drugName={this.state.drugSearched}
                        drugOptions={this.state.menuOptions} 
                        handleDrugsSelected={this.handleDrugsSelected}
                        value={this.state.value}
                        handleSelectChange={this.handleSelectChange}
                    />
                </div>
            );
        }
        else if (this.state.toDisplayOptions){
            return(

                <div className="appDiv container">
                    <SearchBar 
                        inputPlaceholder = "Drug Name"
                        inputVal="drugName"
                        btnName="Search"
                        funcSearch={this.onDrugSearch}
                        funcInput={this.ondrugFragSearch}
                        terms={this.state.termsArray}
                    />
                    
                    <ResultsMenu
                        drugName={this.state.drugSearched}
                        drugOptions={this.state.menuOptions} 
                        handleDrugsSelected={this.handleDrugsSelected}
                        value={this.state.value}
                        handleSelectChange={this.handleSelectChange}
                    />

                    <OptionsDisplay 
                        menuOptionsSelected={this.state.menuOptionsSelected}
                        displayOptions={this.state.drugOptionsDisplay}
                        onSaveSearchOption={this.onSaveSearchOption}
                    />
                </div>
            );
        }
        return(
            <div className="appDiv container">
                <SearchBar 
                    inputPlaceholder = "Drug Name"
                    inputVal="drugName"
                    btnName="Search"
                    funcSearch={this.onDrugSearch}
                    funcInput={this.ondrugFragSearch}
                    terms={this.state.termsArray}
                />
            </div>
        );
    }
}

export default App;