/**
 * 1. events객체.on('이벤트명', callback) : events객체.emit('이벤트명') 실행시 callback함수 실행
 * 2. events객체.addeventListener('이벤트명', callback) : 위와 같음
 * 3. events객체.once('이벤트명', callback) : 위와 같은데 한번만 실행됨
 * 4. events객체.removeAllListeners('이벤트명') : 이벤트명과 관련된 이벤트리스너 모두 제거
 * 5. events객체.removeListner('이벤트명', 리스너(callback)) : 이벤트에 연결된 리스너 하나 제거
 * 6. events객체.off('이벤트명', 리스너(callback)) : removeListener와 같음
 * 7. events객체.listenerCount('이벤트명') : 연결된 리스너의 개수를 반환함
 * 
 */


const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.on('e1', ()=>{
    console.log("event1");
})

myEvent.addListener('e2', ()=>{
    console.log("event2");
})

myEvent.emit('e1');
myEvent.emit('e2');