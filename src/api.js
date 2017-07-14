import $ from 'jquery';

export function autoCompleteTerms() {
    return $.ajax({
        url: "https://rxnav.nlm.nih.gov/REST/displaynames.json",
        type: "GET"
    })
}
// //Change encodeURI check if runs
// export function drugFragmentSearch(drugNameFragment) {
//     const urlSearch = "https://rxnav.nlm.nih.gov/REST/displaynames.json" + encodeURIComponent(drugNameFragment)
//     return $.ajax({
//         url: urlSearch,
//         type: "GET"
        
//     })
// }
export function drugSearch(drugName) {
    const urlSearch = "https://rxnav.nlm.nih.gov/REST/drugs.json?name=" + encodeURIComponent(drugName);
    return $.ajax({
        url: urlSearch,
        type: "GET",
    })
}

export function searchAllOptions(drugNumber) {
    const urlSearch = "https://rxnav.nlm.nih.gov/REST/rxcui/"+ encodeURIComponent(drugNumber) +"/related.json?tty=SCD+SBD";
    return $.ajax({
        url: urlSearch,
        type: "GET"
    })
}

export function saveSearchOption(drugName) {
    return $.ajax({
        url: "/save/drugSearch",
        type: "POST",
        data: {
            drugName: drugName
        }
    })
}