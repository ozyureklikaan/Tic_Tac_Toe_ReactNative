import React from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { MaterialComunityIcons as Icon } from 'react-native-vector-icons';

// export default function App() {
//   return (

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    })
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) { 
        return 1; 
      }
      else if (sum == -3) {
        return -1;
      }
    }

    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) { 
        return 1; 
      }
      else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) { 
      return 1; 
    }
    else if (sum == -3) {
      return -1;
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum == 3) { 
      return 1; 
    }
    else if (sum == -3) {
      return -1;
    }

    return 0;
  }

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    var nextPlayer = ( currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 (X) is the winner!");
      this.initializeGame();
    }
    else if (winner == -1) {
      Alert.alert("Player 2 (O) is the winner!");
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.tileX}></Icon>;
      case -1: return <Icon name="circle-outline" style={styles.tileO}></Icon>;
      default: return <View></View>;
    }
  }

  render() {
    return(
      <View style={styles.container}>

        <View style={{flexDirection: "row"}}>
          <View style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </View>
          <View style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </View>
          <View style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </View>
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </View>
          <View style={[styles.tile, { }]}>
            {this.renderIcon(1, 1)}
          </View>
          <View style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </View>
        </View>
        
        <View style={{flexDirection: "row"}}>
          <View style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </View>
          <View style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </View>
          <View style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </View>
        </View>

        <View style={{paddingTop: 50}}>
          <Button title="New Game" onPress={this.onNewGamePress}></Button>
        </View>

      </View>
    )
  }
}

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 8,
    width: 100,
    height: 100
  },

  tileX: {
    color: "red",
    fontSize: 60
  },

  tileO: {
    color: "green",
    fontSize: 60
  }
});
