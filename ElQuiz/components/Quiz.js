import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

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
        <View style={{ alignItems: 'center', width: '90%', marginStart: 'auto', marginEnd: 'auto' }}>
            <Text style={{ fontSize: 16, marginBottom: 5, textAlign: 'justify', width: '90%' }} multiline={true}>
                {pergunta}
            </Text>
            {alternativas.map((alternativa, index) => (
                <View key={index} style={{ width: '90%', marginBottom: 15 }}>
                    <Button
                        title={`${String.fromCharCode(65 + index)}. ${alternativa}`}
                        onPress={() => verificarResposta(alternativa)}
                    />
                </View>
            ))}
            <View style={{ width: '90%', marginBottom: 15 }}>
                <Button title="Próxima pergunta" onPress={carregarPergunta} />
            </View>

            <View style={{ width: '90%', fontSize: 20 }}>
                <Text style={{ fontSize: 20, marginLeft: "50%", marginTop:100 }}>PONTUAÇÃO: <Text style={{ color: "blue " }}>{pontuacao}</Text></Text>
            </View>

        </View>
    );
}