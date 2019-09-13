import React, { Component } from "react";


class Selector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '0'
        };
    }

    

    onChange = (e) => {
        this.props.history.push(`/${this.props.optionsValues}`);
        this.setState({ value: this.props.optionsValues })
    }

 
    render() {
        return (
            
            <div className="router-selector-button">
                <button onClick={this.onChange} >OK</button>
            </div>


        );
    }
}

export default Selector;