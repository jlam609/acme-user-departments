const express = require('express')
const {db, models, seed} = require('./db/index')
const path = require('path')
const cors = require('cors')
const port = process.env.PORT || 3000
const {pluralize} = require('inflection')

const app = express()
app.use(cors())
app.use(express.json())

Object.entries(models).forEach(([name, model]) => {
    app.get(`/api/${pluralize(name)}`, async(req,res) => {
        const elem = await model.findAll()
        res.send(elem)
    })
    app.post(`/api/${pluralize(name)}`, async(req,res) => {
        try{
        const {name }= req.body
        const item = model.create({
            name:name
        })
        res.send({
           message:item
        })
        }
        catch(e){
            console.error(e)
        }
    })
   app.put(`/api/${pluralize(name)}/:id`, async(req,res) => {
       try {
           const id = req.params.id
           const {name} = req.body
           const item = await model.findByPk(id)
        
           item.name = name
           res.send({
               item
           })
       }
       catch(e){
            console.error(e)
       }
   })
   app.delete(`/api/${pluralize(name)}/:id`, async(req,res) => {
    try {
        const id = req.params.id
        await model.destroy({
            where:{
                id:id
            }
        })
        res.send({
            message:`${id} successfully removed`
        })
    }
    catch(e){
         console.error(e)
    }
})
})

seed()
.then(()=> {
    app.listen(port, () => console.log('listening'))
})
.catch(e => console.error(e))