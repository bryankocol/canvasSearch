import React, { Component } from 'react';


class OptionsDisplay extends Component {
    // displayOptions

    constructor(){
        super();
        this.renderOptionForm = this.renderOptionForm.bind(this);
        this.renderOptionParse = this.renderOptionParse.bind(this);
    }

    renderOptionForm(rxcui, obj) {
        let drugName = this.props.displayOptions[obj][rxcui];
        console.log(drugName);
        return(
            <div key={rxcui}> 
                hello
            </div>
        );
    }
    renderOptionParse(obj) {
        let drugName = this.props.displayOptions[obj];
        console.log(obj, drugName);
        return(
            <div key={obj}> 
                
                {drugName}

            </div>
        );
        // let infoDict = this.props.displayOptions[obj];
        // console.log(infoDict);
        // Object.keys(infoDict).map(rxcui => {
        //     console.log(rxcui);
        //     let drugName = infoDict[rxcui]
        //     console.log(drugName) 
        //     return("hello")

        // });
        // Object.keys(this.props.displayOptions[obj]).map (rxcui => {
        //     let drugName = this.props.displayOptions[obj][rxcui];
        //     console.log(drugName);
        //     return(
        //         <div key={rxcui}> 
        //             hello
        //         </div>
        //     );
        // })
        // return(<div> {obj} </div>);
            
       
        
    }

    render(){
        console.log("displayOptions O.D.", this.props.displayOptions);
        return(
            <div className="optionsDisplayDiv">
                <form> 
                    {Object.keys(this.props.displayOptions).map( obj => {
                        return this.renderOptionParse(obj);
                    })}
                </form>
            </div>
        );
    }
}

export default OptionsDisplay;