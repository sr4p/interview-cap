const express = require('express')
const app = express()
const port = 3001 || process.env.PORT
const Entrant = require('./model/Entrant')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/marathon', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const en = await Entrant.find();
    res.send(en)
})

app.post('/registerMarathon', async (req, res) => {
    const entrants = new Entrant({
        
        profile: {
            prefix:'นาย',
            name_th:"สิรวิชย์",
            surname_th:'ราญรอน',
            name_eng:'Sirawit',
            surname_eng:'Ranron',
            birth:"1998-08-15T18:30:00.000+00:00",
            email:'srsai.sr4p@hotmail.com',
            identification_number:'12121233453452',
            address:{
                "number":"94",
                "moo":"4",
                "sub_district":"แสนสุข",
                "district":"แสนสุข",
                "province":'ชลบุรี',
                "zip":'20130'
            },
            tel:'0891234756',
            img: "",
            bib:'SR4P24'
        },
    
        history_marathon : [{
            place: 'บางบัวทอง มาราธอน',
            time_run:'55 minute',
        },{
            place: 'แสนสุข มาราธอน',
            time_run:'47 minute',
        }],
    
        sos : [{
            name: 'อุ้งอิ๋ง',
            surname: 'ไวไว',
            relations: 'เพื่อน',
            sos_tel: '0891234567'
        },{
            name: 'อิ่มมะ',
            surname: 'มาม่า',
            relations: 'เพื่อน',
            sos_tel: '0812348866'
        }],
    
        medical_info : {
            blood_type:'B',
            drug_allergy:[{
                medicine_name:'paracentamon'
            }],
            congenital_disease: [{
                disease_name :'Trypanophobia'
            }],
            surgical_history: [{
                surgical_position :'heart',
                surgical_date :"2020-06-02T18:30:00.000+00:00",
            }],
            pregnant: false,
            medicine_regular: [{
                medicine_name:'Opioid'
            }],
            hurt_marathon:true,
            exercise:true,
            disorder_exercise:true,
        },
    
        shirt : {
            size: 'XL'
        }
    })

    const data = await entrants.save()
    res.send(data)

    // try {
    //     await entrants.save()
    //     res.redirect("/");
    // } catch (err) {
    //     res.redirect("/");
    // }
})

app.listen(port, () => console.log(`Server listening on port ${port}`))