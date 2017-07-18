import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';

class AutoFill extends Component {

  render() {
      const { value, suggestions } = this.props;
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Type a Drug or Ingredient',
        value,
        onChange: this.props.onChange
      };

      return (
        <Autosuggest
          suggestions={suggestions.slice(0, 50)}
          onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
          getSuggestionValue={this.props.getSuggestionValue}
          renderSuggestion={this.props.renderSuggestion}
          inputProps={inputProps}
        />
      );
  }
}

AutoFill.propTypes = {
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  getSuggestionValue: PropTypes.func,
  renderSuggestion: PropTypes.func,
  inputProps: PropTypes.object


};
      
export default AutoFill;