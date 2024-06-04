import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from './Styles'

const db = SQLite.openDatabase('quiz1.db');

export default function Quiz10() {
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [qtnRespostas, setQtnRespostas] = useState(0);
    const [idPerguntas, setIdPerguntas] = useState([]);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        carregarPergunta();
    }, []);

    function VerificarPergunta(pergunta){
        
        if(!idPerguntas.includes(pergunta.id)){ 
            const newId = pergunta.id
            console.log(newId)
            setIdPerguntas([...idPerguntas, newId])
            setPergunta(pergunta.pergunta);
            setRespostaCorreta(pergunta.resposta_correta);
            setAlternativas([pergunta.alternativaA, pergunta.alternativaB, pergunta.alternativaC, pergunta.alternativaD]);
            console.log(idPerguntas)
            console.log(`Nova pergunta carregada, ${pergunta.id}\n`)
        }
        else{
            console.log("lemao", pergunta.id)
            return carregarPergunta();

        }
    }    

    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    VerificarPergunta(pergunta);    
                }
            });
        });
    };


    const verificarResposta = (resposta) => {
        if (qtnRespostas < 9) {
            if (resposta === respostaCorreta) {
                Alert.alert('Parabéns!', 'Você acertou a resposta!');
                setPoints(points + 10);
                setQtnRespostas(qtnRespostas + 1)
            } else {
                Alert.alert('Ops!', 'Resposta incorreta.');
                setQtnRespostas(qtnRespostas + 1)
            }
            carregarPergunta();
        } else {

            console.log('acabou')
            return AlertasInsanos()
        }
    };

    function AlertasInsanos(){
        if(points < 20 && points > 0 ){
            return Alert.alert("VOCÊ É UM NOOB NESTE ASSUNTO")
        }
        if(points > 20 && points < 40){
            return Alert.alert("SEU CONHECIMENTO EH BASICO")
        }
        if(points > 40 && points < 60){
            return Alert.alert("VOCE TEM UM CERTO CONHECIMENTO DO ASSUNTO")
        }
        if(points > 60 && points < 80){
            return Alert.alert("VOCE TEM UM BOM CONHECIMENTO DO ASSUNTO")
        }
        if(points >= 90){
            return Alert.alert("VOCÊ É UM EXPERT DO ASSUNTO")
        }

    }
    return (
        <View style={styles.quizContainer}>
            <Text style={styles.quizPergunta} multiline={true}>
                {pergunta}
            </Text>
            {alternativas.map((alternativa, index) => (
                <View key={index} style={styles.quizButton}>
                    <Button color={'#7d0909'}
                        title={`${String.fromCharCode(65 + index)}. ${alternativa}`}
                        onPress={() => verificarResposta(alternativa)}
                    />
                </View>
            ))}
            <View style={styles.quizPontuacaoContainer}>
                <Text style={styles.quizPontuacaoText}>PONTUAÇÃO: <Text style={styles.quizPontuacao}>{points}</Text></Text>
            </View>
        </View>
    );
}
