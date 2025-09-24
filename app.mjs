import express from 'express';

//Crear una instancia de express
const app = express();

//Configurar el puerto en el que el servidor escuchará
const PORT = 3000;

//Ruta GET para el Home
app.get('/', (req, res)=>{
    res.send("Página de incio");
});

//Ruta para recibir datos simples
app.get('/datos', (req, res)=>{
    res.send("Datos recibidos");
});

//Ruta GET con parámetro de ruta
/*Solicitud http://localhost:3000/user/123 */
app.get('/user/:id', (req,res)=>{
    const userId = req.params.id;
    console.log(`ID del usuario recibido: ${userId}`);
    res.send(`Perfil del usuario con ID: ${userId}`)
})

//Ruta GET con múltiples parámetros de ruta
/*Solicitud http://localhost:3000/electronics/456 
app.get('/product/:category/:id', (req,res)=>{
    const {category, id} = req.params;
    res.send(`Categoría: ${category} - ID del producto: ${id}`)
}); */

//Ruta GET con parámetro de ruta
/*Solicitud http://localhost:3000/profile?edad=30 */
app.get('/profile', (req,res)=>{
    const edad = req.query.edad;
    console.log(`Edad recibida: ${edad}`);
    res.send(`Edad del perfil: ${edad}`);
})

//Inicializar el servidor
/*Solicitud http://localhost:3000/datos */
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});