import React, { Component } from "react";
import Select from 'react-select';
import AutoCompleteRoute from "./autoCompleteRoute";
import PokemonDetails from "./pokemonDetails";
import { withRouter, BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const CompleteRoute = withRouter(AutoCompleteRoute);

class App extends Component {



  constructor(props) {
    super(props)
    this.state = {
      pokemon: [],
      selected: ""
    };
  }



  routeSelector() {
    let table = <div key="11" className="complete-select"><CompleteRoute key="0" optionsValues={this.state.selected} selectorName="" /></div>
    return table;
  }


  componentRender() {
    var table = [];
    this.state.pokemon.forEach(pokemon => {
      table.push(
        <div key={pokemon.id}>
          <Switch key="0">
            <Route key="1" path={"/" + pokemon.id}
              render={props => <PokemonDetails  {...props}
                pokemonId={pokemon.id}
                pokemonName={pokemon.identifier}
                pokemonDetails={this.state.pokemon}
              />}
            />
          </Switch>
        </div>
      );
    });

    return table;
  }

  componentDidMount() {
    fetch("/pokemon.json")
      .then(r => r.json())
      .then(data => {
        this.setState({ pokemon: data });
      });
  };


  handleChange = selectedOption => {
    this.setState({ selected: selectedOption.value })
  }

  pokemonSelect() {
    let array = []

    this.state.pokemon.forEach(i => {
      let template = {
        value: i.id,
        label: i.identifier
      }
      array.push(template);
    });

    return array;

  }


  render() {

    return (
      <div key="10" className="search-block">
        <div className="selectbox">
          <Select
            options={this.pokemonSelect()}
            isSearchable={true}
            isMulti={false}
            placeholder="Select or search a Pokemon..."
            onChange={this.handleChange}
          />
        </div>


        <Router key="0">
          {this.routeSelector()}
          {this.componentRender()}
        </Router>


      </div>

    );
  }
}



export default App;