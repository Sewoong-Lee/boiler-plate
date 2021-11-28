const { User } = require("../models/User"); //유저 모델을 가져옴

let auth = (req, res, next)=> {
    //이 안에서 인증처리를 진행
    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;

    //가져온 토큰을 복호화 한후, 유저를 찾는다.
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
         //유저가 없으면 인증 no
        if(!user) return res.json({ isAuth: false, error: true})

        //유저가 있으면 인증 ok
        //index.js에서 사용할 수 있도록 req에 토큰과 유저 정보를 넣어줌
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};