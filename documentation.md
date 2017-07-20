# Component Schema

* App
    * SearchBar
        * AutoFill
    * ResultsMenu
    * OptionsDisplay


# State - Explaination of how each state is set
    * termsArray
        Type: Array of Strings
        Content: Drug and ingredient names
        Source: RxNorm API Endpoint - /displaynames
        Trigger: Filled Once before intial rendering of page using lifecylce function
        Function Cascade: componentWillMount > queryAutoCompleteTerms > api.autoCompleteTerms > queryAutoCompleteTerms(response)

    * drugSearched
        Type: String
        Content: Drug name or ingriedent
        Source: SearchBar component input from user
        Trigger: OnSubmit from SearchBar - handleForm SearchBar Component
        Function Cascade: handleForm - searchBar component > onDrugSearch(drugName) > api.drugSearch(drugName) > 
            onDrugSearchSuccess(response)

    * toDisplayMenu
        Type: Boolean
        Content: Intial False
        Source: When menuOptions state is sourced
        Trigger: Switch to true when searchBar component drug search returns content for ResultsMenu component
        Function Cascade false to true: handleForm -searchBar component > onDrugSearch(drugName) > api.drugSearch(drugName)     > onDrugSearchSuccess(response)
        Function Cascade true to false: handleDrugsSelected(selectedDrugs) > api.searchAllOptions(drugNumber) > onhandleDrugsSelectedSuccess(response)  - to support clearing for new search

    * toDisplayOptions
        Type: Boolean
        Content: Intial False
        Source: When drugOptionsDisplay state is set with content 
        Trigger: Switch to true when options are chosen from the ResultsMenu and an api call returns content for    
            OptionsDisplay component to render
        Function Cascade false to true: handleDrugsSelected(selectedDrugs) > api.searchAllOptions(drugNumber) > 
            onhandleDrugsSelectedSuccess(response)
        Function Cascade true to false: onDrugSearch(drugName) > api.drugSearch(drugName) >  onDrugSearchSuccess(response)

    * value
        Type: Array of objects of drugName:DrugRxCuiNumber
        Content: ResultsMenu Component options selected by user 
        Purpose: Feeds Select Component - a libarary component inside of ResultsMenu
        Source: ResultsMenu component handleSelectChange
        Trigger: User Selecting options in the ResultsMenu component and pressing submit
        Function Cascade: handleFinalSelection - ResultsMenu component 

    * menuOptions
        Type: Array of Objects of string key value pairs
        Content:
        Source:
        Trigger:
        Function Cascade:

    * menuOptionsSelected
        Type: Object of string key value pairs
        Content:
        Source:
        Trigger:
        Function Cascade:

    * drugOptionsDisplay
        Type: Object of Objects of string key value pairs
        Content:
        Source:
        Trigger:
        Function Cascade:


