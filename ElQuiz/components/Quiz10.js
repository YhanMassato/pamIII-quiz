import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Quiz10() {
    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [qtnRespostas, setQtnRespostas] = useState(0);
    const [qtnPerguntas, setQtnPerguntas] = useState();
    const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);

    useEffect(() => {
        selecionarPerguntas();
    }, []);

    const selecionarPerguntas = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT COUNT(*) FROM perguntas ', [], (_, result) => {
                const count = result.rows.item(0)["COUNT(*)"];
                if (count >= 10) {
                    setQtnPerguntas(count);
                    selecionarPerguntasAleatorias(count);
                } else {
                    Alert.alert('Erro', 'Não há perguntas suficientes para iniciar o quiz.');
                }
            });
        });
    };

    const selecionarPerguntasAleatorias = (count) => {
        const numerosAleatorios = selecionarNumerosAleatorios(count);
        if (numerosAleatorios.length > 0) {
            setPerguntasSelecionadas(numerosAleatorios);
            carregarPergunta();
        }
    };

    const selecionarNumerosAleatorios = (count) => {
        const numerosAleatorios = [];
        while (numerosAleatorios.length < 10) {
            const numero = Math.floor(Math.random() * count) + 1;
            if (!numerosAleatorios.includes(numero)) {
                numerosAleatorios.push(numero);
            }
        }
        return numerosAleatorios;
    };

    const carregarPergunta = () => {
        if (perguntasSelecionadas.length > 0) {
            const perguntaSelecionada = perguntasSelecionadas.shift();
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM perguntas WHERE id = ?;', [perguntaSelecionada], (_, { rows }) => {
                    if (rows.length > 0) {
                        let pergunta = rows._array[0];
                        setPergunta(pergunta.pergunta);
                        setRespostaCorreta(pergunta.resposta_correta);
                        setAlternativas([pergunta.alternativaA, pergunta.alternativaB, pergunta.alternativaC, pergunta.alternativaD]);
                    }
                });
            });
        } else {
            Alert.alert('ACABOU O QUIZ');
            console.log('acabou');
        }
    };

    const verificarResposta = (resposta) => {
        if (qtnRespostas < 10) {
            if (resposta === respostaCorreta) {
                Alert.alert('Parabéns!', 'Você acertou a resposta!');
                setQtnRespostas(qtnRespostas + 1)
            } else {
                Alert.alert('Ops!', 'Resposta incorreta.');
                setQtnRespostas(qtnRespostas + 1)
            }
            carregarPergunta();
        } else {
            Alert.alert('ACABOU O QUIZ')
            console.log('acabou')
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
        </View>
    );
}
