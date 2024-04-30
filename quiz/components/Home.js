import React from "react";
import { Image, Button, View} from 'react-native';

export default function Home({ navigation }){
    return(
        
        <View style={{alignItems:'center'}}>

            <Image source={require('../assets/logo.png')} style={{width: '90%', height: 150, marginBottom: 45}} />

            <View style={{ marginBottom:15 }}>
                <Button title="Adicionar Pergunta" onPress={() => navigation.navigate('Add')} />
            </View>
{/* 
            <View style={{ marginBottom:15 }}>
                <Button title="Iniciar quiz" onPress={() => navigation.navigate('Quiz')} color={'green'} />
            </View> */}

            <Button title="Editar Perguntas" onPress={()=> navigation.navigate('Edit')} color={'gold'}/
            >

        </View>
    )
}