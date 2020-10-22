const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extende: false}));
app.use(bodyParser.json());




let jugador = [
    {
    posicio: 1,
    alias: 'jperez',
    nombre: 'Jose',
    apellido: 'Perez',
    score: 1000   
},{
    posicio: 2,
    alias: 'jsanz',
    nombre: 'Juan',
    apellido: 'Sanz',
    score: 950
},{
    posicio: 3,
    alias: 'mgutierrez',
    nombre: 'Maria',
    apellido: 'Gutierrez',
    score: 850
}
]
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
}; 
let respuestaRanking = {
    cantidadJugadores: '',
    jugador1:'',
    jugador2:'',
    jugador3:''
}


app.get('/ranking', function(req,res){
    jugador.sort((a,b) => (a.score < b.score ? 1: -1)); //ordena
    for(i=0;i<jugador.length;i++){
        jugador[i].posicio=i+1;
    }
    res.send(jugador);
})
app.get('/jugador/:alias', function(req,res){
    var alies = req.params.alias;
    var jugadorMostrar;
    var exists = false;
    console.log(jugador.length);
    for(i=0;i<jugador.length;i++){
        if(jugador[i].alias==alies){
            jugadorMostrar=i;
            
            exists=true;
        }/*else{
            respuesta = {
                error: true,
                codigo: 504,
                mensaje: "El jugador no existe"
            };
            res.send(respuesta);
        }*/
    }if(!exists){
        respuesta = {
            error: true,
            codigo: 504,
            mensaje: "El jugador no existe"
        };
        res.send(respuesta);
    }else{
        res.send(jugador[jugadorMostrar]);
    }
    
})
app.post('/jugador/:alias', function(req,res){
    var newAlias = req.params.alias || '';
    var newName = req.body.nombre || '';
    var newLastName= req.body.apellido || '';
    var newScore = req.body.score || '';
    var exists=false;
    if(newName=='' && newLastName=='' && newScore==''){
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: "El campo alias, nombre, apellido y score son requeridos"
        };
    }else{
        for(i=0;i<jugador.length;i++){
            if(jugador[i].alias==newAlias){
                exists=true;
            }else{

            }
        }if(!exists)
        {
            jugador[jugador.length] = 
            {
                posicio: jugador.length+1,
                alias: newAlias,
                nombre : newName,
                apellido: newLastName,
                score: newScore
                
            }
            respuesta = {
                error: false,
                codi: 509,
                missatge: "El jugador ha sido creado"
            };
        jugador.sort((a,b) => (a.score < b.score ? 1: -1)); //ordena
        for(i=0;i<jugador.length;i++){
        jugador[i].posicio=i+1;
    }
        }else
        {
            respuesta = 
            {
                error: true,
                codi: 503,
                missatge: "El jugador ya existe"
            };
        }
    }res.send(respuesta);
})
app.put('/jugador/:alias', function(req, res){
    var newNom = req.body.nombre || '';
    var newCognom = req.body.apellido || '';
    var newScore = req.body.score || '';
    var exists= false;
    var pos;

    for(i=0;i<jugador.length;i++){
        if (req.params.alias==jugador[i].alias)
        {
            exists=true;
            pos=i;
        }
    }
    if(!exists){
        respuesta={
            error: true,
            codi: 504,
            missatge: "El jugador no existe"
        };
        
    }
    if(newNom!='' && newCognom!='' && newScore!=''){
        jugador[pos].nombre=newNom;
        jugador[pos].apellido=newCognom;
        jugador[pos].score=newScore;
        respuesta=
        {
            error: false,
            codi: 510,
            missatge: "El jugador ha sido actualizado"
        };
    }else{
        respuesta= 
        {
            error: true,
            codi: 511,
            missatge: "Faltan valores"
        }
    }
    res.send(respuesta);
    
    
})
/*app.get('/', function(req, res){
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
})*/

app.post ('/gamer', function (req, res){
        var nombre = req.body.nom || '';
        var apellido = req.body.cognom || '';
        var score = req.body.score || '';
        if ((nombre=='' )||( apellido == '' )||(score =='' ))
        {
            respuesta = {    
            codigo : 502,
            error : true,
            mensaje : 'camps obligatoris camp nom, cognom o score'
            
        };}else{
            if(nombre==jugador.nombre && apellido == jugador.apellido){
                respuesta = {
                    codigo: 503,
                    error: true,
                    mensaje: "El jugador ya fue creado previamente"
                };
            }else{
                respuesta= {
                    codigo : 200,
                    error : false,
                    mensaje: "Jugador creado",
                    nombre,
                    apellido,
                    score
                }
                jugador.nombre = req.body.nom || '';
                jugador.apellido = req.body.cognom || '';
                 jugador.score =req.body.score || '';
                 
                
            }

            

        }res.send(respuesta);;
        
    
   
})



app.get('/hola', function(req, res){
    console.log(url);
    res.send("Saludos desde express, hola");

})

app.listen(3000, () =>{
    console.log("El servidor esta inicializado en el puerto 3000");
});
