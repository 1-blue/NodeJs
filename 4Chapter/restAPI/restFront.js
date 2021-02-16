async function getUser() { // 로딩 시 사용자 가져오는 함수
    try {
        const res = await axios.get('/users');          //get방식으로 users정보를 가져옴 (get으로 users니까 정보를 가져오는것)
        const users = res.data;                         //data에 users정보 (입력받은 이름 : 내용)가 json형식으로 들어있음
        const list = document.getElementById('list');   //id가 list인 태그를 가져옴
        list.innerHTML = '';                            //list태그 초기화
        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {                 //users정보들 하나하나를 인수로 받아서 실행
            const userDiv = document.createElement('div');      //div태그생성
            const span = document.createElement('span');        //span태그생성
            span.textContent = users[key];                      //span태그에 users값넣음
            const edit = document.createElement('button');      //button태그생성
            edit.textContent = '수정';                          //버튼이름지정
            edit.addEventListener('click', async () => {        //수정 버튼 클릭
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name) {
                    return alert('이름을 반드시 입력하셔야 합니다');
                }
                try {
                    await axios.put('/user/' + key, { name });      //put방식으로 /user/key에 {name : name}값 추가
                    getUser();                                      //삭제한뒤에 페이지에 반영을 위한 새로고침용도
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => { // 삭제 버튼 클릭
                try {
                    await axios.delete('/user/' + key);             //delete방식으로 /user/key값 삭제
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
        });
    } catch (err) {
        console.error(err);
    }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();         //디폴트기능 삭제
    const name = e.target.username.value;       //form태그의 입력값 가져오기
    if (!name) {
        return alert('이름을 입력하세요');
    }
    try {
        await axios.post('/user', { name });       //post방식으로 /user/name에 name값 추가
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});