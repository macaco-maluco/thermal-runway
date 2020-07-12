import { Component, Types } from 'ecsy'

export type Screen = 'main-menu' | 'game'

interface GameState {
  screen: Screen
}

export default class GameStateComponent extends Component<GameState> implements GameState {
  screen: Screen = 'main-menu'
}

GameStateComponent.schema = {
  screen: { type: Types.String },
}
