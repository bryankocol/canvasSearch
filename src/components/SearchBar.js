import React, { Component } from 'react';
import AutoFill from './AutoFill';
import PropTypes from 'prop-types';

class SearchBar extends Component {
    constructor(){
        super();
        this.handleForm = this.handleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);


        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
          value: '',
          suggestions: []
        };
    }

    getSuggestions (value) {
        const termOptions = this.props.terms;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : termOptions.filter(term =>
            term.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    getSuggestionValue (suggestion) {
        return(suggestion.name);
    }

    renderSuggestion(suggestion) {
        return (
            <div>
            {suggestion.name}
            </div>
        );
    }

    onChange (event, { newValue }){
        this.setState({
          value: newValue
        });
    }

    onSuggestionsFetchRequested ({ value }) {
        setImmediate(this.setState({
          suggestions: this.getSuggestions(value)
        }));
    }

    onSuggestionsClearRequested () {
        this.setState({
          suggestions: []
        });
    }

    handleForm(e) {
        e.preventDefault();

        // may not need to clear search
        //const inputVal = this.props.inputVal;
        // const nameSearched = this.inputVal.value;
        let form = document.getElementById(this.props.inputVal);
        let input = form.getElementsByTagName("input")[0];
        let nameSearched = input.value;
        this.props.funcSearch(nameSearched);
    }

    handleChange(e) {
        const nameFragment = e.target.value;

        this.props.funcInput(nameFragment);
    }

    render(){
        const inputVal = this.props.inputVal;

        return(
            <div className="searchBarDiv">
                <form
                    id={inputVal}
                    className="searchBarForm"
                    onSubmit={e => {
                        this.handleForm(e);
                    }}
                >

                    <AutoFill
                        terms={this.props.terms}
                        suggestions={this.state.suggestions}
                        value={this.state.value}
                        onChange={this.onChange}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                    />

                    <input 
                        id="searchBarSubmit"
                        className="searchBarSubmit"
                        type="submit"
                        value={this.props.btnName}
                    />

                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    terms: PropTypes.arrayOf(PropTypes.object),
    btnName: PropTypes.string,
    funcInput: PropTypes.func,
    funcSearch: PropTypes.func
};
export default SearchBar;