const mongoose = require('mongoose');

const uesrSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 사용자가 쓴 스페이스를 지워줌
        unique: 1
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, //1이면 관리자
        default: 0,
    },
    image : String,
    token :{
        type: String
    },
    tokenExp: {
        type: Number
    }
});

const User = mongoose.model('User', 'uesrSchema'); //모델의 이름과 스키마의 이름

module.exports = {User} //다른곳에서도 사용 가능하도록 익스포트