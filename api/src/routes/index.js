const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require('../db');
const { Op } = require('sequelize');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getDbInfo(name){
    if(!name)
    {
         return await Dog.findAll()
    }else
    {
        return await Dog.findAll({
            where : {
                name : {
                    [Op.iLike] : `%${name}%`
                },
            },
            include : {
                Model : Temperament
            }
        })
    }
}

var getDBbyUUID = async function(id){
    return await Dog.findOne({
        where: {
            uuid : id
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {attributes: []}
          } 
    })
}


async function getDbTemperaments(){
    return await Temperament.findAll();
}

router.get('/dogs' , async (req,res)=>{


    try {
    const { name } = req.body;
    var array;
    var arrayDB;
    if(name){
        await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&apikey=${YOUR_API_KEY}`)
        .then(r =>{
            array = r.data;
        })
     
    }else{

    await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${YOUR_API_KEY}`)
    .then(r =>{
        array = r.data;
    })

    }
    var arrayDogs = await Promise.all(array.map(i=>{
        return {
            weight : i.weight.metric,
            height : i.height.metric,
            id : i.id,
            name : i.name,
            bred_for : i.bred_for,
            breed_group : i.breed_group,
            life_span : i.life_span,
            temperament : i.temperament,
            origin : i.origin,
            reference_image_id : i.image.url
        }
    }))

}catch(e){
    console.log(e);
}

    arrayDB = await getDbInfo();

    info = arrayDB.concat(arrayDogs);
    info ? res.send(info): res.send(404);
})

router.get('/dogs/:id', async (req,res)=>{
    const {id} = req.params;

    if(id.length<10){
    try{


        await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${YOUR_API_KEY}`)
    .then(r =>{
        array = r.data;
    })

    var DogsFromAPI = await Promise.all(array.map(i=>{
        return {
            weight : i.weight.metric,
            height : i.height.metric,
            id : i.id,
            name : i.name,
            bred_for : i.bred_for,
            breed_group : i.breed_group,
            life_span : i.life_span,
            temperament : i.temperament,
            origin : i.origin,
            reference_image_id : i.reference_image_id
        }
    }))
    console.log('id !!', id);
    // console.log('dog de api: ', DogFromAPI.filter(i => i.id==id));

    var DogFromAPI = DogsFromAPI.filter(i => i.id==id);

    return res.json(DogFromAPI);


    }catch(e){
        console.log(e);
    }

    }else{
       var dogFromDB = await getDBbyUUID(id);

       return res.json(dogFromDB);
    }

})

router.get('/temperament', async (req,res)=>{
    try{

        await axios.get(`https://api.thedogapi.com/v1/breeds?apikey=${YOUR_API_KEY}`)
        .then(r =>{
            array = r.data;
        })

        
    var temperamentStrings = await Promise.all(array.map(i=>{
        return {
            temperament : i.temperament
        }
    }))


    var temperamentList = [];
    temperamentStrings.forEach((i)=>{

        var temperamentSplit = i.temperament ? i.temperament.split(', '): [];

        for(let i =0; ele = temperamentSplit[i]; i++){
        
        if(!temperamentList.includes(ele)) temperamentList.push(ele);
    }
    })


    temperamentList = temperamentList.map((i,idx)=>{
        return {
            id: idx+1,
            name : i
        }
    })



    // await Temperament.bulkCreate(temperamentList, {returning:true})


    for(let i =0; i<temperamentList.length;i++){
        await Temperament.findOrCreate({
            where : {
                name : temperamentList[i].name
            },defaults : temperamentList[i]            
        })
    }

    }catch(e){
        console.log(e);
    }
    var dbTemperaments = getDbTemperaments();
    dbTemperaments ? res.json(temperamentList): res.status(404);
})

router.post('/dog', async (req,res)=>{

    const { name, bred_for, breed_group, life_span, temperament, origin , weight , height} = req.body;

    var newDog = {
        name,
        bred_for,
        breed_group,
        life_span,
        temperament,
        origin,
        weight,
        height
    }
    var createdDog = await Dog.create(newDog);

    let temperamentsDB = await Temperament.findAll({
        where : {
            name : temperament
        }
    })

    createdDog.addTemperaments(temperamentsDB);

    console.log('perro creado: ', createdDog.dataValues);

    res.sendStatus(200);



})

module.exports = router;
