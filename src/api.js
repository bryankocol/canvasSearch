import $ from 'jquery';

export function autoCompleteTerms() {
    return $.ajax({
        url: "https://rxnav.nlm.nih.gov/REST/displaynames.json",
        type: "GET"
    })
}
//Change encodeURI check if runs
export function drugFragmentSearch(drugNameFragment) {
    const urlSearch = "https://rxnav.nlm.nih.gov/REST/displaynames.json" + encodeURIComponent(drugNameFragment)
    return $.ajax({
        url: urlSearch,
        type: "GET"
        
    })
}