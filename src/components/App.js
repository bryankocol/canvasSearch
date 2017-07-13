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
        this.ondrugFragSearch = this.ondrugFragSearch.bind(this);
        this.onDrugFragmentSearchSuccess = this.onDrugFragmentSearchSuccess.bind(this);

        this.state = {
            termsArray : []
        };
    }

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

    onDrugSearch(drugName){
        console.log("onDrugSearch drugName", drugName);
    }

    /// SearchBar Auto Complete Functions /////
    onDrugFragmentSearchSuccess(response){
        console.log("onDrugFragmentSearchSuccess response", response);
    }

    ondrugFragSearch(drugNameFragment){
        console.log("drugFragSearch drugNameFragment", drugNameFragment);

        api.drugFragmentSearch(drugNameFragment)
            .then(response => this.onDrugFragmentSearchSuccess(response))
    }

    render(){
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