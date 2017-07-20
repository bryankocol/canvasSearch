# Component Schema

* App
    * SearchBar
        * AutoFill
    * ResultsMenu
    * OptionsDisplay


# State - Explanation of how each state is set
    * termsArray
        Type: Array of Strings
        Content: Drug and ingredient names
        Source: RxNorm API Endpoint - /displaynames
        Trigger: Filled Once before initial rendering of page using lifecylce function
        Function Cascade: componentWillMount > queryAutoCompleteTerms > api.autoCompleteTerms > queryAutoCompleteTerms(response)

    * drugSearched
        Type: String
        Content: Drug name or ingredient
        Source: SearchBar component input from user
        Trigger: OnSubmit from SearchBar - handleForm SearchBar Component
        Function Cascade: handleForm - searchBar component > onDrugSearch(drugName) > api.drugSearch(drugName) > 
            onDrugSearchSuccess(response)

    * toDisplayMenu
        Type: Boolean
        Content: Initial False
        Source: When menuOptions state is sourced
        Trigger: Switch to true when searchBar component drug search returns content for ResultsMenu component
        Function Cascade false to true: handleForm -searchBar component > onDrugSearch(drugName) > api.drugSearch(drugName)     > onDrugSearchSuccess(response)
        Function Cascade true to false: handleDrugsSelected(selectedDrugs) > api.searchAllOptions(drugNumber) > onhandleDrugsSelectedSuccess(response)  - to support clearing for new search

    * toDisplayOptions
        Type: Boolean
        Content: Initial False
        Source: When drugOptionsDisplay state is set with content 
        Trigger: Switch to true when options are chosen from the ResultsMenu and an api call returns content for    
            OptionsDisplay component to render
        Function Cascade false to true: handleDrugsSelected(selectedDrugs) > api.searchAllOptions(drugNumber) > 
            onhandleDrugsSelectedSuccess(response)
        Function Cascade true to false: onDrugSearch(drugName) > api.drugSearch(drugName) >  onDrugSearchSuccess(response)

    * value
        Type: Array of objects of drugName:DrugRxCuiNumber
        Content: ResultsMenu Component options selected by user 
        Purpose: Feeds Select Component - a library component inside of ResultsMenu
        Source: ResultsMenu component handleSelectChange
        Trigger: User Selecting options in the ResultsMenu component and pressing submit
        Function Cascade: handleFinalSelection - ResultsMenu component 

    * menuOptions
        Type: Array of Objects of string key value pairs
        Content: Array of Objects of strings 
        Source: drugSynonum : RxCuiDrugNumber pairs when drug searchBar component returns api response
        Trigger: Drug Name searchBar Component API call Response
        Function Cascade: handleForm - searchBar Component  > onDrugSearch(drugName) > onDrugSearchSuccess(response) > onDrugSearchSuccess(response)
        Note: This is fills the ResultsMenu component and is used for cross reference with drugOptionsDisplay when creating sub-headers for the OptionsDisplay

    * menuOptionsSelected
        Type: Object of Objects of string key value pairs
        Content: rxcui Number of Menu Selected Option : Drug Name Pair of the options from the OptionsMenu selected
        Source: Drug Options selected from the ResultsMenu for final search
        Trigger: Submitting ResultsMenu options selected
        Function Cascade:  handleFinalSelection() ReulstMenu Component > handleDrugsSelected(selectedDrugs) 
        Function Cascade clear back to {} :  onDrugSearch(drugName) > onDrugSearchSuccess(response) > onDrugSearchSuccess(response) - for new search

    * drugOptionsDisplay
        Type: Object of Objects of string key value pairs
        Content: rxcuiDrugNumberSearched Initially, with object of rxcuiDrug Number selected from ResultsMenu with name of drug as value
        Source: Submit of ResultsMenu
        Trigger: From ResultsMenu selections resulting API response
        Function Cascade: handleFinalSelection() ReulstMenu Component > handleDrugsSelected(selectedDrugs) >  api.searchAllOptions(drugNumber) >  onhandleDrugsSelectedSuccess(response)
        Function Cascade Clear back to {} : onDrugSearch(drugName) > onDrugSearchSuccess(response) > onDrugSearchSuccess(response) - for new search


# App.js Methods 
1) Set-Up
* componentWillMount() 
    Trigger: Initial Render of ReactDOM
    Purpose: Runs any needed functions that must load before ReactDOM
    Note: Built in "LifeCyle" Method for React

* queryAutoCompleteTerms()
    Trigger: componentWillMount
    Purpose: Fill termsArray state for use in autosuggest for SearchBar

* api.autoCompleteTerms()
    Trigger: componentWillMount > queryAutoCompleteTerms()
    Purpose: calls RxNorm /displaynames endpoint to fill termArray state for use in autosuggest for SearchBar

* onQueryAutoCompleteTermsSuccess(response)
    Trigger: API response from api.autoCompleteTerms
    Purpose: Parses and sets termsArray state for use in autosuggest for SearchBar

2) SearchBar Component
* onDrugSearch(drugName)
    Trigger: SearchBar submit
    Purpose: To call API query on drugName or ingredient submitted by user

* api.drugSearch(drugName)
    Trigger: onDrugSearch(drugName)
    Purpose: calls RxNorm /drugs endpoint to gather other drug equivalent options

* onDrugSearchSuccess(response)
    Trigger: api.drugSearch(drugName) API query response
    Purpose: Parse response from API with alternate drug options    
    setState: 
        menuOptions: drugInfo, - fill ResultsMenu 
        drugSearched: response.drugGroup.name,
        menuOptionsSelected : {}, - clear for new search
        toDisplayMenu: true, - to advance users steps through application
        toDisplayOptions: false, - reset for new search
        drugOptionsDisplay: {},  - clear for new search
        value: [] - clear for new search

3) ReusltsMenu Component
* handleSelectChange(value) 
    Trigger: User selecting options in ResultsMenu
    Purpose: Set value state with drug options from ReusltsMenu 
    setState: value with drug options selected by user

* handleDrugsSelected(selectedDrugs)
    Trigger: ResultsMenu submit
    Purpose: API call to gather all options for drug administration type and state of menuOptionsSelected 
    setState: menuOptionsSelected - for cross reference later on OptionsDisplay

* api.searchAllOptions(drugNumber)
    Trigger: handleDrugsSelected(selectedDrugs)
    Purpose: API call to /related end point to gather all options for a drug administration type

* onhandleDrugsSelectedSuccess(response)
    Trigger: api.searchAllOptions(drugNumber) API query response
    Purpose: Parse response from API with final drug options for OptionsDisplay
    setState: 
            drugOptionsDisplay: stateDrugOptionDisplay, - to fill OptionsDisplay component
            toDisplayOptions: true, - to advance users steps through application
            toDisplayMenu: false- clear for new potential search
4) OptionsDisplay Component
* onSaveSearchOption(drugName)
    Trigger: User press save button in OptiosnDisplay
    Purpose: To save drug option selected to database

* api.saveSearchOption(drugName)
    Trigger: onSaveSearchOption(drugName)
    Purpose: To send drugOpiton chosen by user to Backend Server to be saved in DB

# OptionsDisplay.js 

## OptionsDisplay Props: 
* displayOptions: 
    PropTypes.objectOf(PropTypes.object)
    Purpose: Information to be displayed
* menuOptionsSelected: 
    PropTypes.object
    Purpose: Cross references for displayOptions so there are subHeaders of what drug originally searched to get to display material
* onSaveSearchOption: 
    PropTypes.func
    Purpose: Trigger App component level handling of save request
## OptionsDisplay Methods:
* handleOnClick(e)
    Trigger: Press Save Button
    Purpose: Stop form default, gather hidden input value for drug to be saved and trigger onSaveSearchOption(drugNameVal) at App component level
* renderOptionForm(innerRxcui, obj)
    Trigger: Rendering of component
    Purpose: Parses for display displayOptions state uses menuOptionsSelected as cross reference for subHeader


# ResultsMenu.js

## ResultsMenu Props:
* drugOptions: 
    PropTypes.arrayOf(PropTypes.object)
    Fill Results Menu with options
* value: 
    PropTypes.arrayOf(PropTypes.object)
    state at present of menu options selected
* handleDrugsSelected: 
    PropTypes.func
    Trigger App component level handling of drugsSelectd for API querying

## ResultsMenu Methods:
* displayOptions(drugOptions)
    Trigger: Render of Component
    Purpose: Parse drugOptions state to fill menu
* handleSelectChange (value)
    Trigger: User selection of an option from the menu
    Purpose: To set value of what is in the menu at the time
* handleFinalSelection()
    Trigger: submit of menu's selections by user
    Purpose: submit to App component handleDrugsSelected(selectedDrugs) menu options selected for API query

# SearchBar.js
## SearchBar State:
* value: ""
    Trigger: User Input to SearchBar
    Purpose: For AutoFill autosuggest feature of searchBar
* suggestions: []
    Trigger: User typing in Search Bar
    Source: termsArray
    Purpose: For AutoFill autosuggestion feature of searchBar

## SearchBar Props:
* terms: 
    PropTypes.arrayOf(PropTypes.object)
    Purpose: used in getSuggestions for autosuggestions
* btnName: 
    PropTypes.string
    Purpose: Button Name to make searchBar more reusable
* funcInput: 
    PropTypes.func
    Purpose: function to handle on change events in input to make searchBar more reusable
* funcSearch: 
    PropTypes.func 
    Purpose: function to handle submitting of search bar to make searchBar more reusable

## SearchBar Methods:
* renderSuggestions(suggestions) 
    Trigger: 
    Purpose: To render to the dom the options for autosuggest
* handleForm
    Trigger: click or return by user of searchbar form
    Purpose: to send input to App level for handling of search
* handleChange - NOT Used
    Trigger: to handle letter by letter change by user in search bar
    Purpose: NOT used could be used for spell check tracks user letter changes
* onChange
    Trigger: key strokes in search bar
    Note: autosuggest function need change name
    Purpose: to support autosuggest 
* getSuggestions
    Trigger: onSuggestionsFetchRequested ({ value })
    Purpose: returns autosuggestions from terms prop to feed suggstions state
* getSuggestionValue
    Trigger: !!!!!!! Look into this - AutoSuggest component function
    Purpose:
* onSuggestionsFetchRequested
    Trigger: !!! Look into this - AutoSuggest component function
    Purpose: to set state of suggestions setImmediate helps make asynchronous for browsers that support it it is not supported ever where not for production use!
* onSuggestionsClearRequested
    Trigger: !!!! Look into this - AutoSuggest component function
    Purpose: reset suggestions state to []