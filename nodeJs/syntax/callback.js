var a = function(){
    console.log('1');
}

function testFunc(callback){
    callback();
}

testFunc(a);