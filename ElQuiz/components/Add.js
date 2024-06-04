import React, { useState, useEffect } from "react";
import { Image, Button, TextInput, View, Alert, Text } from "react-native";
import *  as SQLite from 'expo-sqlite';
import styles from './Styles'

const db = SQLite.openDatabase('quiz1.db');

export default function Add(){

    const [pergunta, setPergunta] =               useState('');
    const [alternativaA, setAlternativaA] =       useState('');
    const [alternativaB, setAlternativaB] =       useState('');
    const [alternativaC, setAlternativaC] =       useState('');
    const [alternativaD, setAlternativaD] =       useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [qtnPerguntas, setQtnPerguntas] =       useState('')

    useEffect(() => {
        contarRegistros();
    }, []);

    const contarRegistros = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) FROM perguntas ', [], (_, result) => {
                const count = result.rows.item(0)["COUNT(*)"];
                    setQtnPerguntas(count);
            });
        });
    };

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY AUTOINCREMENT, pergunta TEXT, alternativaA TEXT, alternativaB TEXT, alternativaC TEXT, alternativaD TEXT, resposta_correta TEXT);'
        );
    })

    

    const adicionarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO perguntas (pergunta, alternativaA, alternativaB, alternativaC, alternativaD, resposta_correta) VALUES (?, ?, ?, ?, ?, ?);',
                [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta],(_, { insertId }) => {
                    setPergunta('');
                    setAlternativaA('');
                    setAlternativaB('');
                    setAlternativaC('');
                    setAlternativaD('');
                    setRespostaCorreta('');
                    Alert.alert('Sucesso!（￣︶￣）↗', 'Pergunta adicionada com sucesso!');
                }
            );
        });
    };

    

    return(
        <View style={{alignItems:'center', backgroundColor:'rgb(22, 13, 13)', minHeight:'100%'}}>

            <Image source={require('../assets/ghost.png')} style={{width: '40%', height: 150, marginBottom: 25}} />

            <TextInput placeholder="Digite a pergunta" placeholderTextColor={'#fdfff1'} value={pergunta} multiline={true} onChangeText={setPergunta} style={styles.alternativas} numberOfLines={4} />

            <TextInput placeholderTextColor={'#fdfff1'} placeholder="Digite a alternativa A" value={alternativaA} multiline={true} onChangeText={setAlternativaA} style={styles.alternativas} />

            <TextInput placeholder="Digite a alternativa B" placeholderTextColor={'#fdfff1'} value={alternativaB} multiline={true} onChangeText={setAlternativaB} style={styles.alternativas} />

            <TextInput placeholderTextColor={'#fdfff1'} placeholder="Digite a alternativa C" value={alternativaC} multiline={true} onChangeText={setAlternativaC} style={styles.alternativas} />

            <TextInput placeholderTextColor={'#fdfff1'} placeholder="Digite a alternativa D" value={alternativaD} multiline={true} onChangeText={setAlternativaD} style={styles.alternativas} />

            <TextInput placeholderTextColor={'#fdfff1'} placeholder="Digite a letra da resposta correta" value={respostaCorreta} onChangeText={setRespostaCorreta} style={styles.alternativas}/>

            <Button title="Adicionar Pergunta" onPress={adicionarPergunta} color={'#7d0909'}/>

            <View style={styles.quizPontuacaoContainer}>
                <Text style={styles.quizPontuacaoText}>Quantidade de Registros:<Text style={styles.qtnRegistros}>{qtnPerguntas}</Text></Text>
            </View>
        </View>
    )
}