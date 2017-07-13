import React, { Component } from 'react';

import OptionsDisplay from './OptionsDisplay';
import ResultsMenu from './ResultsMenu';
import SearchBar from './SearchBar';

import * as api from '../api';

class App extends Component {
    constructor(){
        super();
        this.queryAutoCompleteTerms = this.queryAutoCompleteTerms.bind(this);
        this.onQueryAutoCompleteTermsSuccess = this.onQueryAutoCompleteTermsSuccess.bind(this);
        this.onDrugSearch = this.onDrugSearch.bind(this);
        this.onDrugSearchSuccess = this.onDrugSearchSuccess.bind(this);
        // this.ondrugFragSearch = this.ondrugFragSearch.bind(this);
        // this.onDrugFragmentSearchSuccess = this.onDrugFragmentSearchSuccess.bind(this);

        this.state = {
            termsArray : [],
            drugsSearched: [],
            toDisplay: false,
            // {drugSearched:[{"drugSyn":"rxcui"}, etc]}
            drugsDisplay: {}
        };
    }
    /// Query All Terms for AutoComplete ///
    componentWillMount(){
        this.queryAutoCompleteTerms()
    }

    onQueryAutoCompleteTermsSuccess(response){
        console.log("onQueryAutoCompleteTermsSuccess response", response);
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
        console.log("onDrugSearchSuccess response", response);
        const infoArray = response.drugGroup.conceptGroup;

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
        
        const stateDrugsSearched = this.state.drugsSearched;
        const drugSearched = response.drugGroup.name;
        stateDrugsSearched.push(drugSearched);

        const drugInfoDict =  {};
        drugInfoDict[drugSearched] = drugInfo;
        this.setState({
            drugsDisplay: drugInfoDict, 
            drugsSearched: stateDrugsSearched,
            toDisplay: true
        });
    }


    onDrugSearch(drugName){
        console.log("onDrugSearch drugName", drugName);
        api.drugSearch(drugName)
            .then(response => this.onDrugSearchSuccess(response))
    }

    // /// SearchBar Auto Complete Functions /////
    // onDrugFragmentSearchSuccess(response){
    //     console.log("onDrugFragmentSearchSuccess response", response);
    // }

    // ondrugFragSearch(drugNameFragment){
    //     console.log("drugFragSearch drugNameFragment", drugNameFragment);

    //     api.drugFragmentSearch(drugNameFragment)
    //         .then(response => this.onDrugFragmentSearchSuccess(response))
    // }

    render(){
        if (this.state.toDisplay){
            return(

                <div className="appDiv">
                    <SearchBar 
                        inputPlaceholder = "Drug Name"
                        inputVal="drugName"
                        btnName="Search"
                        funcSearch={this.onDrugSearch}
                        funcInput={this.ondrugFragSearch}
                        terms={this.state.termsArray}
                    />
                    
                    <ResultsMenu />
                </div>
            );
        }
        return(
            <div className="appDiv">
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