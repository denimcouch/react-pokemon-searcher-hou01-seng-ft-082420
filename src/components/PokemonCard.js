import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    clicked: false
  }

  toggleSprite = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    let { pokemon } = this.props
    let {sprites} = pokemon

    return (
      <Card>
        <div onClick={this.toggleSprite}>
          <div className="image">
            <img src={!this.state.clicked ? sprites.front : sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {pokemon.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
