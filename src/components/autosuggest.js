import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';



class Auto extends Component {

    // Imagine you have a list of languages that you'd like to autosuggest

    // constructor() {
    //     super();
    //     this.onChange = this.onChange.bind(this);
    //     this.getSuggestions = this.getSuggestions.bind(this);
    //     this.getSuggestionValue = this.getSuggestionValue.bind(this);
    //     this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    //     this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);


    //     // Autosuggest is a controlled component.
    //     // This means that you need to provide an input value
    //     // and an onChange handler that updates this value (see below).
    //     // Suggestions also need to be provided to the Autosuggest,
    //     // and they are initially empty because the Autosuggest is closed.
    //     this.state = {
    //       value: '',
    //       suggestions: []
    //     };
    // }

// Teach Autosuggest how to calculate suggestions for any given input value.
    // getSuggestions (value) {
    //     const termOptions = this.props.terms;
    //     const inputValue = value.trim().toLowerCase();
    //     const inputLength = inputValue.length;

    //     return inputLength === 0 ? [] : termOptions.filter(term =>
    //         term.name.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    // };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
    // getSuggestionValue (suggestion) {
    //     return(suggestion.name);
    // }

// Use your imagination to render suggestions.
    // renderSuggestion(suggestion) {
    //     return (
    //         <div>
    //         {suggestion.name}
    //         </div>
    //     );
    // }

    // onChange (event, { newValue }){
    //     this.setState({
    //       value: newValue
    //     });
    // }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
    // onSuggestionsFetchRequested ({ value }) {
    //     this.setState({
    //       suggestions: this.getSuggestions(value)
    //     });
    // }

  // Autosuggest will call this function every time you need to clear suggestions.
    // onSuggestionsClearRequested () {
    //     this.setState({
    //       suggestions: []
    //     });
    // }

    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
          placeholder: 'Type a programming language',
          value,
          onChange: this.onChange
        };

        // Finally, render it!
        return (
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
        );
    }
}
      
    

export default Auto;