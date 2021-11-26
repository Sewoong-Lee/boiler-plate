const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt 길이
var jwt = require('jsonwebtoken');


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
    password: {
        type: String,
        minlength: 5
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

//비밀번호 암호화
uesrSchema.pre('save', function( next ){
    var user = this; //위의 스키마를 가리킴 (index.js 에서 스키마에 값을 넣어줬기 떄문에 여기에서 값을 가져오면 된다.)

    if(user.isModified('password')){//비밀번호가 변경될때만 암호화 하도록 조건문을 걸어줌

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err); //에러가 나면 에러를 반환

            bcrypt.hash(user.password, salt, function(err, hash) { //위의 비밀번호값과 솔트를 넘김
                if(err) return next(err); //에러가 나면 에러를 반환
                user.password = hash; //스키마의 비밀번호를 암호화 비밀번호로 변경
                next() //index.js 로 다시 돌아감
            });
        });
    }else { //다른거를 바꿀때는 그냥 넘김
        next()
    }
})

//비밀번호가 맞는지 확인
uesrSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword(사용자가 친 패스워드) 와 암호화된비밀번호 가 같은지 체크
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

//웹 토큰 생성 
uesrSchema.methods.generateToken =function(cb){
    var user = this;

    //jsonwebtoken을 이용해서 웹토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    //user._id + 'secretToken' -> 'secretToken' -> user._id
    user.token = token; //생성한 토큰을 스키마 안에 넣음
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
}

const User = mongoose.model('User', uesrSchema); //모델의 이름과 스키마의 이름

module.exports = { User } //다른곳에서도 사용 가능하도록 익스포트