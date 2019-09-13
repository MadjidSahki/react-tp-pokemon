import React, { Component } from "react";



class CalculStats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type1: {
                stat_1: [],
                stat_2: [],
                stat_3: [],
                stat_4: [],
                stat_5: [],
                stat_6: [],
            },
            type2: {
                stat_1: [],
                stat_2: [],
                stat_3: [],
                stat_4: [],
                stat_5: [],
                stat_6: [],
            },
            pokeIdType1: [],
            pokeIdType2: [],
            data:[],
            pokemon:[]
        };

    }


    getPokemonIdFromName() {
        let array = [];
        console.log(this.props.type1);
        this.state.pokemon.forEach(i => {
                this.props.type1.forEach(y => {
                      
                    if (i.identifier === y.pokemon.name) {    
                        array.push(
                            i.pokemon_id
                        );  
                    }
                    console.log(array);
                });
            })
        

    }

    

    componentDidMount() {
        fetch("/pokemon.json")
          .then(r => r.json())
          .then(data => {
            this.setState({ pokemon: data });
          });
       
      };

    render() {

        return (
            <div className="App">
                <h1>lol</h1>
            </div>
        )
    }
}



export default CalculStats;