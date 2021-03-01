const mongoose = require('mongoose');

const connect = ()=>{
    // 개발환경일때 쿼리확인
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    // 몽구스와 몽고디비연결
    mongoose.connect('mongodb://root:nodejs@localhost:27017/admin', {
        dbName : 'nodejs',
        useNewUrlParser: true,
        useCreateIndex : true,
    }, (error) =>{
        if(error){
            console.error('몽고디비연결에러', error);
        } else { 
            console.log('몽고디비 연결 성공');
        }
    });
};

// 연결끊겼을때 에러기록후 재연결
mongoose.connection.on('error', (error) => {
    console.error("몽고디비연결 에러", error);
});
mongoose.connection.on('disconnection', ()=>{
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;