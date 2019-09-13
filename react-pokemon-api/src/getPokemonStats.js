import React, { Component } from "react";
import { request } from 'graphql-request';

class GetPokemonStats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pokemonTypes: [],
            pokemonStats: [],
            avgType1: {},
            avgType2: {}
        };

    }

    getPokemonData() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', "https://pokeapi.co/api/v2/pokemon/" + this.props.pokemonId, true);
        xhr.onload = () => {
            var response = JSON.parse(xhr.responseText);
            this.setState({
                pokemonTypes: response.types,
                pokemonStats: response.stats
            })
            this.getAvg(response);
        };
        xhr.send();
    }



    getPokemonTypeId(data) {
        let pokemonTypeIds = [];
        data.forEach(i => {
            if (i.pokemon_id === this.props.pokemonId) {
                pokemonTypeIds.push(i.type_id);
            }
        })
        this.setState({ pokemonTypeIds: pokemonTypeIds })

    }

    componentWillMount() {
        this.getPokemonData();
    }


    getAvg(response) {
        let query = `{
        averageStats(type1:`+ response.types[0].type.name.toUpperCase() + `) {
          meta { lastUpdated }
          avg {
            attack
            defense
            hp
            specialAttack
            specialDefense
            speed
          }
        }
      }`;
        request('https://pokestats-gmtiqydwwa.now.sh', query).then(data => {

            this.setState({ avgType1: data.averageStats.avg })
            let lol = this.state.avgType1;
            lol.type = response.types[0].type.name;
            this.setState({ avgType1: lol });
        });




        if (response.types[1] != undefined) {
            let query2 = `{
                averageStats(type1:`+ response.types[1].type.name.toUpperCase() + `) {
                  meta { lastUpdated }
                  avg {
                    attack
                    defense
                    hp
                    specialAttack
                    specialDefense
                    speed
                  }
                }
              }`;
            request('https://pokestats-gmtiqydwwa.now.sh', query2).then(data => {
                this.setState({ avgType2: data.averageStats.avg })
                let lol2 = this.state.avgType2;
                lol2.type = response.types[1].type.name;
                this.setState({ avgType2: lol2 });
            });

        }

    }

    showAvg() {
        let table = [];
        table.push(
            <div>
                <h2>Average {this.state.avgType1.type} stats</h2>
                <ul>
                    <li>
                        attack : {this.state.avgType1.attack}
                    </li>
                    <li>
                        defense : {this.state.avgType1.defense}
                    </li>
                    <li>
                        hp :  {this.state.avgType1.hp}
                    </li>
                    <li>
                        speed :  {this.state.avgType1.speed}
                    </li>
                    <li>
                        specialAttack : {this.state.avgType1.specialAttack}
                    </li>
                    <li>
                        specialDefense : {this.state.avgType1.specialDefense}
                    </li>
                </ul>
            </div>   
        )
        if(this.state.avgType2.attack != undefined){
            table.push(
                <div>
                    <h2>Average {this.state.avgType2.type} stats</h2>
                    <ul>
                        <li>
                            attack : {this.state.avgType2.attack}
                        </li>
                        <li>
                            defense : {this.state.avgType2.defense}
                        </li>
                        <li>
                            hp :  {this.state.avgType2.hp}
                        </li>
                        <li>
                            speed :  {this.state.avgType2.speed}
                        </li>
                        <li>
                            specialAttack : {this.state.avgType2.specialAttack}
                        </li>
                        <li>
                            specialDefense : {this.state.avgType2.specialDefense}
                        </li>
                    </ul>
                </div>   
            )
        }

        return table;
    }


    showType() {
        let table = [];
        this.state.pokemonTypes.forEach((i, j) => {
            table.push(
                <li key={j}> {i.type.name}</li>
            );
        });
        return <ul>{table}</ul>
    }

    showStats() {
        let table = [];
        this.state.pokemonStats.forEach((i, j) => {
            table.push(
                <li key={j}>{i.stat.name} : {i.base_stat}</li>
            );
        });
        return <ul>{table}</ul>
    }

    render() {
        return (
            <div>
                <div className="types">
                    <h2>Type</h2>
                    {this.showType()}
                </div>
                <div className="stats">
                    <h2>Base stats</h2>
                    {this.showStats()}
                </div>
                <div>
                    {this.showAvg()}
                </div>

            </div>
        )
    }
}



export default GetPokemonStats;