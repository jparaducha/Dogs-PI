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
         return await Dog.findAll({
             include : Temperament
         })
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


async function getDbTemperaments(temperaments){
    return await Temperament.findAll({
        where : {
            name : {
                [Op.iLike] : temperaments
            }
        }
    });
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
            reference_image_id : i.image.url || undefined
        }
    }))

}catch(e){
    console.log(e);
}

    arrayDB = await getDbInfo();

    // arrayDB[0] ? console.log('arrayDB rutas: ', arrayDB.map(i=>i)): null;
    info = arrayDB.concat(arrayDogs);


    // console.log('info slice map : ', info.slice(0,5).map(i=> {
    //     if(i.dog){
    //         return i.dog.dataValues.map(j =>{
    //             if(j===temperaments){
    //                 return j.map(k=> k.name);
    //             }else{
    //                 return j;
    //             }
    //         })
    //     }

    //     return i;
    // }));
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
    // console.log('id !!', id);
    // console.log('dog de api: ', DogFromAPI.filter(i => i.id==id));

    var DogFromAPI = DogsFromAPI.filter(i => i.id==id);

    return res.json(DogFromAPI);


    }catch(e){
        console.log(e);
    }

    }else{
       var dogFromDB =[await getDBbyUUID(id)];

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


    var temperamentList = ['All'];
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

    try{
    const {id , name, bred_for, breed_group, life_span, temperament, origin , weight , height} = req.body;

    console.log('el post recibe :', req.body);

    // if(id){

    //     try{

    //     console.log('dentro del if id del post');
    //     var existingDog  = await Dog.findByPk(id);
    //     var emptyDog = {};
    //     if(name) emptyDog.name = name;
    //     if(bred_for) emptyDog.bred_for = bred_for;
    //     if(breed_group) emptyDog.breed_group = breed_group;
    //     if(life_span) emptyDog.life_span = life_span;
    //     if(temperament) emptyDog.temperament = temperament;
    //     if(origin) emptyDog.origin = origin;
    //     if(weight) emptyDog.weight = weight;
    //     if(height) emptyDog.height = height;

    //     console.log('va a hacer update con :', emptyDog);

    //     if(existingDog) await Dog.update({
    //         emptyDog,
    //         where : {
    //             uuid : id
    //         }
    //     })

    //     res.status(200).send('updated');}
    //     catch(e){
    //         console.log(e);
    //     }
    // }


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
    // var data;
    // temperamentsDB =  await getDbTemperaments(temperament)
    // .then(r=>{
    //     data = r.data;
    // })


    createdDog.addTemperaments(temperamentsDB)


    // console.log('temperaments db : ', temperamentsDB.map(i => i.name));

    // console.log('perro creado: ', createdDog.dataValues.name);
    // console.log('temperamentos add:', temperamentsDB.map(i => i.dataValues.name), 'temperaments de body: ', temperament);

    res.status(200).send(`Raza ${name} creada`);;
}
catch(e){
    res.status(401).send(e);
}

})

router.delete('/dogs/:id', async (req,res)=>{
    const {id} = req.params;

    await Dog.destroy({
        where : {
            uuid : id
        }
    })


    res.status(200).send('Raza destruida');
})

router.put('/dog', async (req,res)=>{

    // const {id} = req.params;
try{

    console.log('dentro del try put id : ', id);

    const { id, name, bred_for, breed_group, life_span, temperament, origin , weight , height} = req.body;

    var perroDB = await Dog.findOne({
        where : {
            uuid : id
        }
    });

    console.log('perrodB : ', perroDB.name);

    let newObj= {}

    if(name) newObj.name = name;
    if(bred_for) newObj.bred_for = bred_for;
    if(breed_group) newObj.breed_group = breed_group;
    if(life_span) newObj.life_span = life_span;
    if(temperament) newObj.temperament = temperament;
    if(origin) newObj.origin = origin;
    if(weight) newObj.weight = weight;
    if(height) newObj.height = height;

    await perroDB.update(newObj)

    console.log('perroDB name depsués del update:', perroDB.name)

    await perroDB.save();

    res.status(200).send('Perro actualizado');
}catch(e){
    res.status(400).send(e);
}

})

module.exports = router;
