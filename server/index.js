const express = require('express') //express모듈을 가져옴
const app = express()
const port = 5000
const config = require('./config/key'); //몽고db 키를 가져옴
const cookieParser =  require('cookie-parser');
//const bodyParser = require('body-parser'); //바디파서 가져옴
const { User } = require("./models/User"); //유저 모델을 가져옴
const { auth } = require("./middleware/auth"); //어스 가져옴


const mongoose = require('mongoose'); //몽구스 모듈을 가져옴
mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //6.0 버젼부터 기본이기 때문에 넣을 필요 없다.
}).then(()=> console.log('몽고디비 연결 완료'))
  .catch(err => console.log('에러',err));


app.get('/', (req, res) => {
  res.send('인프런 노드 리액트 기초 강의 (노드몬 설치)')
})

app.get('/api/hello', (req,res)=> {
  res.send("axios 접촉")
})

//application/x-www-form-urlencoded 형태의 데이터를 분석해서 가져올 수 있게끔
app.use(express.urlencoded({extended: true}));
//application/json 타입을 분석해서 가져올 수 있게끔
app.use(express.json());
//쿠키파서 사용 선언
app.use(cookieParser());
app.post('/api/users/register', (req, res)=>{
  //회원 가입시 필요한 정보들을 클라이언트에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body) //바디파서를 통하여 req에 데이터를 읽어 User 모델에 넣어줌
  console.log('회원가입 몽고 간다~');
  console.log(user);
  //비밀번호 암호화 후 넘겨받은 값을 이용하여 데이터베이스에 저장
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

//로그인기능 라우터
app.post('/api/users/login', (req, res)=>{
  // 1)요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email }, (err, user) => {
    if(!user){//이메일이 없다면
      return res.json({
        loginSuccess: false,
        msg: "등록된 이메일이 없습니다."
      });
    }
    // 2)요청한 이메일이 있다면 비밀번호가 맞는지 확인.
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch){ //비밀번호가 틀렸으면
        return res.json({
          loginSuccess: false,
          msg: "비밀번호가 틀렸습니다."
        });
      }
      //비밀번호까지 맞다면 유저를 위한 토큰을 생성
      user.generateToken((err, user) => {
        if(err) res.status(400).send(err);
        //토큰을 쿠키에 저장한다. 
        res.cookie("x_auth", user.token) //쿠키에  x_auth이름으로 저장
        .status(200)
        .json({ loginSuccess: true, userId: user._id});
      })

    })
  })
})

//Auth 기능 생성
app.get('/api/users/auth', auth, (req, res) => {
  //auth 라는 미드웨어를 생성 (엔드포인트에서 리퀘스트를 받고 콜백 펑션을 하기전에 중간에서의 작업) 

  //미들웨어를 거치고 왔다면 Authentication 이 True 라는말 이므로 클라이언트에 전달 해줘야함
  res.status(200).json({
    _id : req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //0이면 일반 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    Image: req.user.Image
  })
})

//로그아웃 라우트 만들기
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id}, 
      { token: ""}
      , (err, user) => {
        if(err) return res.json({ success: true, err});
        return res.status(200).send({
          success: true
        })
      })
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})