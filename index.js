const express = require('express') //express모듈을 가져옴
const app = express()
const port = 5000
const config = require('./config/key'); //몽고db 키를 가져옴

//const bodyParser = require('body-parser'); //바디파서 가져옴
const { User } = require("./models/User"); //유저 모델을 가져옴

const mongoose = require('mongoose'); //몽구스 모듈을 가져옴
mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //6.0 버젼부터 기본이기 때문에 넣을 필요 없다.
}).then(()=> console.log('몽고디비 연결 완료'))
  .catch(err => console.log('에러',err));


app.get('/', (req, res) => {
  res.send('인프런 노드 리액트 기초 강의 (노드몬 설치)')
})

//application/x-www-form-urlencoded 형태의 데이터를 분석해서 가져올 수 있게끔
app.use(express.urlencoded({extended: true}));
//application/json 타입을 분석해서 가져올 수 있게끔
app.use(express.json());

app.post('/register', (req, res)=>{
  //회원 가입시 필요한 정보들을 클라이언트에서 가져오면
  //그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body) //바디파서를 통하여 req에 데이터를 읽어 가져온다.
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})