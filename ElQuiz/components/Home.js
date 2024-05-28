import React from "react";
import { Image, Button, View} from 'react-native';
import styles from "./Styles"

export default function Home({ navigation }){
    return(
        
        <View style={{alignItems:'center', backgroundColor:'rgb(22, 13, 13)', height:'100%'}}>

            <Image source={require('../assets/ghost.png')} style={{width: '40%', height: 150, marginBottom: 45}} />

            <View style={styles.homeButton}>
                <Button title="Adicionar Pergunta" onPress={() => navigation.navigate('Add')} color={'#c23534'}/>
            </View>
            
            <View style={styles.homeButton}>
                <Button title="Iniciar quiz" onPress={() => navigation.navigate('Quiz')} color={'#c23534'} />
            </View> 

            <View style={styles.homeButton}>
                <Button title="Editar Perguntas" onPress={()=> navigation.navigate('Edit')} color={'#c23534'}/>
            </View>

            <View style={styles.homeButton}>
                <Button title="Quiz 10" onPress={() => navigation.navigate('Quiz10')} color={'#c23534'} />
            </View> 

        </View>
    )
}