import React, { useState, useEffect } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quiz.db');

export default function Edit() {
    const [id, setId] = useState(null);
    const [pergunta, setPergunta] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [respostaCorreta, setRespostaCorreta] = useState('');
    const [qtnPerguntas, setQtnPerguntas] = useState('')

    useEffect(() => {
        carregarPergunta();
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

    const carregarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas ORDER BY id LIMIT 1;', [], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                }
            });
        });
    };

    const atualizarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('UPDATE perguntas SET pergunta = ?, alternativaA = ?, alternativaB = ?, alternativaC = ?, alternativaD = ?, resposta_correta = ? WHERE id = ?;', 
            [pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta, id], 
            () => {
                Alert.alert('Sucesso!', 'Pergunta atualizada com sucesso!');
            });
        });
    };

    const deletarPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM perguntas WHERE id = ?;', [id], () => {
                Alert.alert('Sucesso!', 'Pergunta deletada com sucesso!');
                carregarPergunta();
            });
        });
    };

    const proximaPergunta = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id > ? ORDER BY id LIMIT 1;', [id], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a última pergunta.');
                }
            });
        });
    };

    const perguntaAnterior = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM perguntas WHERE id < ? ORDER BY id DESC LIMIT 1;', [id], (_, { rows }) => {
                if (rows.length > 0) {
                    let pergunta = rows._array[0];
                    setId(pergunta.id);
                    setPergunta(pergunta.pergunta);
                    setAlternativaA(pergunta.alternativaA);
                    setAlternativaB(pergunta.alternativaB);
                    setAlternativaC(pergunta.alternativaC);
                    setAlternativaD(pergunta.alternativaD);
                    setRespostaCorreta(pergunta.resposta_correta);
                } else {
                    Alert.alert('Informação', 'Esta é a primeira pergunta.');
                }
            });
        });
    };

    return (
        <View style={{ alignItems: 'center' }}>
            <TextInput 
                placeholder="Digite a pergunta" 
                value={pergunta} 
                multiline={true} 
                onChangeText={setPergunta} 
                numberOfLines={4}
                style={styles.pergunta} 
            />
            <TextInput 
                placeholder="Digite a alternativa A" 
                value={alternativaA} 
                onChangeText={setAlternativaA} 
                style={styles.alternativas} 
            />
            <TextInput 
                placeholder="Digite a alternativa B" 
                value={alternativaB} 
                onChangeText={setAlternativaB} 
                style={styles.alternativas} 
            />
            <TextInput 
                placeholder="Digite a alternativa C" 
                value={alternativaC} 
                onChangeText={setAlternativaC} 
                style={styles.alternativas} 
            />
            <TextInput 
                placeholder="Digite a alternativa D" 
                value={alternativaD} 
                onChangeText={setAlternativaD} 
                style={styles.alternativas} 
            />
            <TextInput 
                placeholder="Digite a letra da resposta correta" 
                value={respostaCorreta} 
                onChangeText={setRespostaCorreta} 
                style={styles.alternativas} 
            />
            <View style={{ marginBottom: 15 }}>
                <Button title="Atualizar Pergunta" onPress={atualizarPergunta} />
            </View>
            <Button title="Deletar Pergunta" onPress={deletarPergunta} color="red" style={{ marginBottom: 5 }} />
            <View style={styles.btnNB}>
                <Button title="Voltar" onPress={perguntaAnterior} />
                <Button title="Avançar" onPress={proximaPergunta} />
            </View>

            <View style={{ width: '90%', fontSize: 20 }}>
                <Text style={{ fontSize: 20, marginTop:100 }}>Quantidade de Registros:<Text>{qtnPerguntas}</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btnNB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%' 
    },
    alternativas: {
        borderColor: 'blue',
        borderWidth: 1, 
        marginBottom: 5, 
        width: '90%' 
    },
    pergunta: {
        height: 80,
        borderColor: 'blue', 
        borderWidth: 1, 
        marginBottom: 5, 
        width: '90%'
    }
});

