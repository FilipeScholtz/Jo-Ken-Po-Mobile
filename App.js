import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from "react";

export default function App() {

  const [maquina, setMaquina] = useState(0);
  const [points, setPoints] = useState(0);

  const [escolha, setEscolha] = useState(0);
  const [escolhaMaquina, setEscolhaMaquina] = useState(0);
  const [onPressed, setOnPressed] = useState(false);
  const [youWin, setYouWin] = useState(null);
  const [draw, setDraw] = useState(null);

  const game = () => {
    setOnPressed(true);
    setEscolhaMaquina(Math.floor((Math.random() * (3 - 1 + 1)+ 1)))

    switch (escolha) {
      case 1:
        if(escolhaMaquina == 1){
          setDraw(true)
        }
        if(escolhaMaquina == 2){
          setYouWin(false)
        }
        if(escolhaMaquina == 3){
          setYouWin(true)
        }
        break;

      case 2:
        if(escolhaMaquina == 1){
          setYouWin(true)
        }
        if(escolhaMaquina == 2){
          setDraw(true)
        }
        if(escolhaMaquina == 3){
          setYouWin(false)
        }
        break;

      case 3:
        if(escolhaMaquina == 1){
          setYouWin(false)
        }
        if(escolhaMaquina == 2){
          setYouWin(true)
        }
        if(escolhaMaquina == 3){
          setDraw(true)
        }
        break;
    }

    setTimeout(() => {
      setOnPressed(false)
      setDraw(null)
      setYouWin(null)
    }, 2000);
  }

  useEffect(()=>{
    if(youWin == true){
      setPoints(points+1)
    }
    if(youWin == false){
      setMaquina(maquina+1)
    }
  },[youWin])

  return (
    <View style={styles.container}>
      <View style={styles.placar}>
        <Text>Você</Text>
        <Text>  X  </Text>
        <Text>Máquina</Text>
      </View>
      <View style={styles.pontos}>
        <Text>{points}</Text>
        <Text>- </Text>
        <Text>  {maquina}   </Text>
      </View>

      <View style={styles.box}>
        <View style={styles.jokenpo}>
          {escolha == 1 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 40}} source={require('./assets/1.png')}/> : null}
          {escolha == 3 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 40}} source={require('./assets/3.png')}/> : null}
          {escolha == 2 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 40}} source={require('./assets/2.png')}/> : null}
          {escolhaMaquina == 1 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 140}} source={require('./assets/1.png')}/> : null}
          {escolhaMaquina == 2 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 140}} source={require('./assets/2.png')}/> : null}
          {escolhaMaquina == 3 ? <Image style={{resizeMode: 'contain', width: 80, marginTop: 100, marginLeft: 140}} source={require('./assets/3.png')}/> : null}
        </View>
        {youWin == true ? <Text style={{color: 'green'}}>Ganhou</Text> : null}
        {youWin == false ? <Text style={{color: 'red'}}>Perdeu</Text> : null}
        {draw == true ? <Text style={{color: 'gray'}}>Empate</Text> : null}
        <TouchableOpacity onPress={()=>{setMaquina(0), setPoints(0)}}><Text style={{fontSize: 25, marginTop: 200}}>Resetar Placar</Text></TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity disabled={onPressed ? true : false} onPress={()=>{setEscolha(1), game()}} style={styles.pedra}><Image style={{resizeMode: 'contain', width: 80}} source={require('./assets/1.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={onPressed ? true : false} onPress={()=>{setEscolha(2), game()}} style={styles.papel}><Image style={{resizeMode: 'contain', width: 80}} source={require('./assets/2.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={onPressed ? true : false} onPress={()=>{setEscolha(3), game()}} style={styles.tesoura}><Image style={{resizeMode: 'contain', width: 80}} source={require('./assets/3.png')}/></TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pedra: {
    padding: '6.4%',
    backgroundColor: 'red'
  },
  papel: {
    padding: '6.4%',
    backgroundColor: 'green'
  },
  tesoura: {
    padding: '6.4%',
    backgroundColor: 'blue'
  },
  placar: {
    widht: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 40,
    backgroundColor: 'gray',
    padding: 20
  },
  pontos: {
    widht: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'gray',
    padding: 20
  },
  box: {
    height: '60%',
  },
  jokenpo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
