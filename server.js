const express = require('express');
const mongoose = require('mongoose');
const Registeruser= require('./model');
const Subjectdata = require('./subjectmodel')
const cors = require('cors');

const app = express();

//Mongocb Connection
mongoose.connect("mongodb+srv://Saketh888:saketh888@cluster0.ugd7o.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    () => console.log('DB connection established')
)

app.use(express.json());

//to avoid policy errors from frontend to backend
app.use(cors({origin:"*"}))

//To save the Registration details
app.post('/register',async (req,res)=>{
    try{
        const {username,email,password,confirmpassword} = req.body;
        let exist = await Registeruser.findOne({email})
        if(exist){
            return res.status(400).send('User already exists')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching')
            
        }
        let newUser =new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        return res.status(200).send('Register Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internal server error')
    }
})

// To check data in mongodb
app.post('/login', async (req,res) =>{
    try{
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email:email});
        if(!exist){
            return res.status(400).send('User not Found');
        }
        if(exist.password !== password){
            return res.status(400).send('Invalid Credentials');
        }
        return res.status(200).send('Login Successfully');
      
    } 
    catch(err){
        console.log(err);
        return res.status.send('Server Error')
    }
})

// Addsubject details to mongodb
app.post('/addsubject',async (req, res)=>{
    try{
        const {subjectid,subjectName,subjectCode} = req.body;
        let newSubject = new Subjectdata({
            subjectid,
            subjectName,
            subjectCode
        })


    await newSubject.save();
    return res.json(await Subjectdata.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }
})

//To get subjects data from mongodb
app.get('/getsubjects',async (req, res) =>{
    try{
        return res.json(await Subjectdata.find())
    }
    catch(err){
        console.log(err);
        return res.status(400).send('Internal server error')
    }
})

//Deleting the subjects by its unique Id
app.delete('/deletesubjects/:id',async (req, res)=>{
    try{
        await Subjectdata.findByIdAndDelete(req.params.id);
        return res.json(await Subjectdata.find())
    }
    catch(err){
        console.log(err);
        return res.status(400).send('Error while deleting subject')
    }
})

app.listen(8000,()=>{
    console.log('server running...')
})