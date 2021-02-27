const mongoose = require('mongoose'); // Erase if already required

var Entrant = new mongoose.Schema({
    profile: {
        prefix:{ type:String, required:true },
        name_th:{ type:String, required:true },
        surname_th:{type:String,required:true},
        name_eng:{type:String,required:true},
        surname_eng:{type:String,required:true},
        birth:{type:Date,required:true},
        email:{type:String,required:true,},
        identification_number:{type:String,required:true},
        address:{
            number:{type:String,required:true,},
            moo:{type:String,required:true,},
            sub_district:{type:String,required:true,},
            district:{type:String,required:true,},
            province:{type:String,required:true,},
            zip:{type:String,required:true,},
        },
        tel:{type:String,required:true},
        img: { data: Buffer, contentType: String},
        bib:{type:String,uppercase: true, required:true}
    },

    history_marathon : [{
        _id: false,
        place: { type:String, required:true },
        time_run:{type:String, required:true },
    }],

    sos : [{
        _id: false,
        name: { type:String, required:true},
        surname: { type:String, required:true},
        relations: { type:String, required:true},
        sos_tel: { type:String, required:true}
    }],

    medical_info : {
        blood_type:{ type:String, required:true},
        drug_allergy:[{
            _id: false,
            medicine_name:{ type:String }
        }],
        congenital_disease: [{
            _id: false,
            disease_name :{ type:String }
        }],
        surgical_history: [{
            _id: false,
            surgical_position :{ type:String },
            surgical_date :{ type:Date }
        }],
        pregnant: { type:Boolean },
        medicine_regular: [{
            _id: false,
            medicine_name:{ type:String }
        }],
        hurt_marathon:{ type:Boolean , required:true},
        exercise:{ type:Boolean, required:true },
        disorder_exercise:{ type:Boolean, required:true },
    },

    shirt : {
        size:{ type:String,uppercase: true, required:true }
    }
});

module.exports = mongoose.model('Entrant', Entrant);

//Database Schema