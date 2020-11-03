import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const baseURL = 'http://localhost:3000/pokemon/'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    filteredPokemon: [],
    searchTerm: ''
  }

  componentDidMount(){
    fetch(baseURL)
    .then(res => res.json())
    .then(pokemon => {
      this.setState({
        pokemon: pokemon,
        filteredPokemon: pokemon
      })
    })
  }

  addFilter = (e) => {
    let {value} = e.target
    this.setState({
      searchTerm: value,
      filteredPokemon: this.state.pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase()))
    })
  }

  addPokemon = (monObj) => {
    console.log('Here is the new Pokemon', monObj)
    const newMon = {
      name: monObj.name,
      hp: parseInt(monObj.hp, 10),
      sprites: {
        front: monObj.frontUrl,
        back: monObj.backUrl
      }
    }
    const pokeOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newMon)
    }
    fetch(baseURL,pokeOptions)
    .then(res => res.json())
    .then(pokemon => {
      console.log(pokemon)
      this.setState({
        pokemon: pokemon
      })
    })
  }


  // (value === '' ? this.state.pokemon : this.state.pokemon.find(pokemon => pokemon.name.charAt(value.length) ))
  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search addFilter={this.addFilter}/>
        <br />
        <PokemonCollection pokemon={this.state.filteredPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
