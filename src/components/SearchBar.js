import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

class SearchBar extends Component {
    constructor(){
        super();
        this.handleForm = this.handleForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleForm(e) {
        e.preventDefault();

        // may not need to clear search
        //const inputVal = this.props.inputVal;
        const nameSearched = this.inputVal.value;

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

                    <input
                        className="searchBarInput"
                        type="text"
                        placeholder={this.props.inputPlaceholder}

                        ref={(input) =>{
                            this.inputVal = input;
                        }}

                        onChange={e =>{
                            this.handleChange(e);
                        }}
                    />

                    <input 
                        className="searchBarSubmit"
                        type="submit"
                        value={this.props.btnName}
                    />

                </form>
            </div>
        );
    }
}

export default SearchBar;