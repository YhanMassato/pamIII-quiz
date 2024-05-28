import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //HOME
    homeButton:{
        marginBottom:15,
        marginTop:10,
        minWidth: '60%',
        color:'#fdfff1',
    },
    // QUIZ
    quizContainer:{
        alignItems: 'center', 
        width: '100%', 
        marginStart: 'auto', 
        marginEnd: 'auto',
        backgroundColor:'rgb(22, 13, 13)', 
        minHeight:'100%'
    },
    quizPergunta:{
        fontSize: 16, 
        marginBottom: 5, 
        textAlign: 'justify', 
        width: '90%',
        color:'#fdfff1',
    },
    quizButton:{
        width: '90%',
        marginBottom: 15,
    },
    quizPontuacaoContainer:{
        width: '90%',
    },
    quizPontuacaoText:{
        fontSize: 20, 
        marginLeft: "50%", 
        marginTop:35,
        color:'#fdfff1',
        backgroundColor:'#7d0909'
    },
    quizPontuacao:{
    
    },
    // EDIT;
    btnNB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%' 
    },
    alternativas: {
        borderColor: '#7d0909',
        borderWidth: 1, 
        marginBottom: 10, 
        width: '90%' ,
        backgroundColor: '#c23534',
        color:'#fdfff1',
    },
    pergunta: {
        color:'#fdfff1',
        backgroundColor:'#8c5b60',
        height: 80,
        borderColor: '#7d0909',
        borderWidth: 1, 
        marginBottom: 5, 
        width: '90%'
    },
    qtnRegistros:{
        color:'#ecafb7'
    },
    
})