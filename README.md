"# boiler-plate" 

## 노드 & 리액트 기초 강의를 공부중인 내용이에요!

## 노드js와 익스프레스js 설치

**노드js란

자바스크립트를 브라우저가 아닌 서버사이드에서 사용 가능

**익스프레스js

노드js가 자동차의 엔진이라면 자동차의 바퀴나 브레이크 기능 등을 만드는게 익스프레스js이다

노드js를 더 쉽게 이요하게 해주는 프레임 워크

1. 노드 다운

노드js 홈페이지에서 다운로드

터미널에서 node -v 로 버전 확인

터미널에서 폴더로 이동 → mkdir boiler-plate 로 생성

cd mkdir boiler-plate 로 이동

npm init로 패키지 생성

전부 엔터로 넘기고 author은 이름 적으면 된다.

index.js 생성 (백엔드서버를 실행시 여기에서 시작 (시작점))

익스프레스js 다운로드

터미널에서 npm install express --save 로 다운로드

위에 --save 를 쓰면 package.json에 아래 내용 생성됨

```jsx
"dependencies": {
    "express": "^4.17.1"
  }
```

위 내용을 통하여 익스프레스 사용여부 확인 가능

이후 index.js에서 기본적인 express.js 앱 만들기

https://expressjs.com/en/starter/hello-world.html

의 내용을 넣음

package.json의 스크립트에

"start": "node index.js", 내용 추가

터미널에 npm run start 을 치면  index.js를 시작점으로 서버 실행

터미널에서 Example app listening at http://localhost:5000 이라는 내용이 뜨면 성공

## 몽고DB연결

https://www.mongodb.com/kr 접속 로그인

새 데이터베이스 - FREE - 싱가폴 선택 -  티어는 무료로 선택 - 데이터베이스 이름 입력 후 생성

유저 생성

컨넥트 → 웹어플리케이션 → 코드 복사

몽구스란

몽고db를 편하게 사용하게 해주는 툴

npm install mongoose --save 로 다운

index.js 에

```
const mongoose = require('mongoose'); mongoose.connect('몽고db 키 내용', { //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false [//6.0](notion://6.0.0.0/) 버젼부터 기본이기 때문에 넣을 필요 없다. }).then(()=> console.log('몽고디비 연결 완료')) 
  .catch(err => console.log('에러',err));
```



추가

## 몽고DB 모델&스키마

모델이란?

스키마를 감싸주는것

스키마란?

테이블

폴더 하나를 생성 (models) 안에 User.js 파일 생성

몽구스 스키마를 가져온다.   (const mongoose = require('mongoose');)

## 깃 설치

깃을 다운받고

프로젝트 터미널 열기

git init 로 깃 저장소 설치

git status 로 상태 확인

git add .

git commit -m "공부"

깃은 툴 소스코드를 관리할수 있는 툴

깃헙은 클라우드 서비스

git remote add origin https://github.com/Sewoong-Lee/boiler-plate.git

git branch -M main

git push -u origin main

## BodyParser & PostMan & 회원가입

Body-parser 다운로드

npm install body-parser --save 로 다운

포스트맨 준비

Register Route 만들기

인덱스js에

```jsx
const { User } = require("./models/User"); //유저 모델을 가져옴

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
```

추가

포스트맨에서

http://localhost:5000/register

json 타입으로 User 모델의 값 넘길시 석세스 출력 확인

## Nodemon

노드몬이란? - 노스서버를 키고 무언가를 바꾸면 서버를 다시 켜야 반영이 되지만

서버를 재시작 안해도 소스의 변경된 부분을 감지해서 반영해줌

npm install nodemon --save-dev

(dev란 로컬에서만 사용을 하겠다는 뜻)

이후 package.json 의 스크립트에

"baceknd": "nodemon index.js",

추가해서 위에걸 사용해서 npm run baceknd 로 실행함

## 비밀 설정 정보 관리

mongoose.connect 부분은 외부 유출이 되면 안되는 부분 이므로 비밀설정

config 라는 폴더 생성

dev.js, prod.js, key.js 파일 생성

dev는 로컬 환경 변수 설정

prod는 배포 단계

key는 환경에 따라 키를 넘겨주는 역할

로컬에서는 폴더내에 변수를 사용하지만

배포시 해당 배포사이트에서 변수를 관리해주기 때문에 나누어 관리

index.js 에서

const config = require('./config/key'); //몽고db 키를 가져오고

```jsx
mongoose.connect(config.mongoURI, {
    //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false //6.0 버젼부터 기본이기 때문에 넣을 필요 없다.
}).then(()=> console.log('몽고디비 연결 완료'))
  .catch(err => console.log('에러',err));
```

보안 내용을 변수로 변경

.gitignore 에 dev.js 추가
