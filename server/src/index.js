const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extende: false}));
app.use(bodyParser.json());

let jugador = {
    nombre:'',
    apellido:'',
    score:''
    };
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
}; 

app.get('/', function(req, res){
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
})
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
    res.send("Saludos desde express, hola");
})

app.listen(3000, () =>{
    console.log("El servidor esta inicializado en el puerto 3000");
});
