import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import styles from './Styles'

const db = SQLite.openDatabase('quiz1.db');

export default function Quiz() {
    const [pergunta, setPergunta] =               useState('');
    const [alternativas, setAlternativas] =       useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [pontuacao, setPontuacao] =             useState(0)

    useEffect(() => {
        carregarPergunta();
    }, []);

    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY RANDOM() LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setPergunta(pergunta.pergunta);
                    setRespostaCorreta(pergunta.resposta_correta);
                    setAlternativas([pergunta.alternativaA, pergunta.alternativaB, pergunta.alternativaC, pergunta.alternativaD]);
                }
            });
        });
    };

    const verificarResposta = (resposta) => {
        if (resposta === respostaCorreta) {
            Alert.alert('Parabéns!', 'Você acertou a resposta!');
            setPontuacao(pontuacao + 1)
            carregarPergunta();
        } else {
            Alert.alert('Ops!', 'Resposta incorreta.');
        }
    };

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
            <View style={styles.quizButton}>
                <Button title="Próxima pergunta" onPress={carregarPergunta} color={'#c23534'}/>
            </View>

            <View style={styles.quizPontuacaoContainer}>
                <Text style={styles.quizPontuacaoText}>PONTUAÇÃO: <Text style={styles.quizPontuacao}>{pontuacao}</Text></Text>
            </View>

        </View>
    );
}