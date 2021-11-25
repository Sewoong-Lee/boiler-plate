const express = require('express') //express모듈을 가져옴
const app = express()
const port = 5000

const mongoose = require('mongoose'); //몽구스 모듈을 가져옴
mongoose.connect('mongodb+srv://hr:12341234@boilerplate.kfzrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //6.0 버젼부터 기본이기 때문에 넣을 필요 없다.
}).then(()=> console.log('몽고디비 연결 완료'))
  .catch(err => console.log('에러',err));


app.get('/', (req, res) => {
  res.send('하이염')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})