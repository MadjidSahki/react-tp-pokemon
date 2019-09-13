import React, { Component } from "react";
import GetPokemonStats from "./getPokemonStats"


class PokemonDetails extends Component {



  constructor(props) {
    super(props)
    this.state = {

    };
 
  }



  renderImg(){ 
    let path = "https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/Pokemon_XY_Sprites/"+this.props.pokemonId+".png";
    return <img src={path}/>
  }

  render() {
   
    return (
      <div className="App">
       <h1>{this.props.pokemonName}</h1>
        {this.renderImg()}
        <GetPokemonStats pokemonId= {this.props.pokemonId}/>
      </div>
    )
  }
}



export default PokemonDetails;