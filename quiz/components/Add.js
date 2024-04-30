import React, { useState } from "react";
import { Image, Button, TextInput, View, Alert } from "react-native";
import *  as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Add(){

    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');


    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT);'
        );
    })

    const adicionarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?);'), [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta], (_, { insertId }) => {
                
                setPergunta('');
                setAlternativaA('');
                setAlternativaB('');
                setAlternativaC('');
                setAlternativaD('');
                setRespostaCorreta('');

                Alert.alert('Sucesso', 'Pergunta adicionada com sucesso!');
            }
        })
    }

    return(
        <View style={{alignItems:'center'}}>

            {/* <Image source={require('../assets/logo.png')} style={{width:'90%', height:150, marginBottom:45}}/> */}

            <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setAlternativaA} style={styles.alternativas} />

            <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setAlternativaB} style={styles.alternativas} />

            <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setAlternativaC} style={styles.alternativas} />

            <TextInput placeholder="Digite a pergunta" value={pergunta} multiline={true} onChangeText={setAlternativaD} style={styles.alternativas} />

            <TextInput placeholder="Digite a letra da resposta correta" value={respostaCorreta} onChangeText={setRespostaCorreta} style={styles.alternativas}/>

            <Button title="Adicionar Pergunta" onPress={adicionarPergunta}/>
        </View>
    )
}

const styles = StyleSheet.create({
    alternativas: {
        borderColor:'blue',
        borderWidth:1,
        marginBottom: 5,
        width: '90%',
        height:50
    },
});

