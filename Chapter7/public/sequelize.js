// 사용자 이름클릭시 댓글로딩
//user-list의 tr태그중에서 각 td태그에 getComment()호출
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', ()=>{
        const id = el.querySelector('td').textContent;
        getComment(id);
    })
});

// 사용자 로딩 (사용자 등록시 바로 화면에 표시해주기위함)
async function getUser() {
    try {
        const res = await axios.get('/users');    // /user의 결과값을 res에 저장
        const users = res.data;             //각 데이터 즉 유저들 users에 저장
        const tbodyTag = document.querySelector('#user-list tbody'); //user-list의 tbody태그 가져오기
        tbodyTag.innerHTML = "";            //tbody내부내용 초기화
        users.map(function (user) {           //반환값들로 새로운배열리턴.. 반환값없음.. 딴거로 테스트해보기
            const row = document.createElement('tr');   //tr태그 생성
            row.addEventListener('click', () => {         //클릭이벤트등록
                getComment(user.id);
            });

            //row 셀추가.. td태그생성 -> user.id넣음 -> row에 넣음
            let tdTag = document.createElement('td');
            tdTag.textContent = user.id;
            row.appendChild(tdTag);

            tdTag = document.createElement('td');
            tdTag.textContent = user.name;
            row.appendChild(tdTag);

            tdTag = document.createElement('td');
            tdTag.textContent = user.age;
            row.appendChild(tdTag);

            tdTag = document.createElement('td');
            tdTag.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(tdTag);

            //tbody에 row넣음
            tbodyTag.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// 댓글로딩로직
async function getComment(id) {
    try {
        const res = await axios.get(`/users/${id}/comments`);   //인수로 받은 id값을 이용해서 서버에 데이터 호출후 값을 res에 넣음
        const comments = res.data;
        const tbodyTag = document.querySelector("#comment-list tbody");
        tbodyTag.innerHTML = "";
        comments.map(function (comment) {
            //로우, 셀 추가
            const row = document.createElement('tr');
            let tdTag = document.createElement('td');
            tdTag.textContent = comment.id;
            row.appendChild(tdTag);

            tdTag = document.createElement('td');
            tdTag.textContent = comment.name;
            row.appendChild(tdTag);

            tdTag = document.createElement('td');
            tdTag.textContent = comment.comment;
            row.appendChild(tdTag);

            //수정버튼생성
            const edit = document.createElement('button');
            edit.textContent = "수정";
            edit.addEventListener("click", async () => {
                const newComment = prompt("바꿀내용을 입력해주세요");
                if (!newComment)    return alert("값을 반드시 입력해주세요!");

                try {
                    await axios.patch(`/comments/${comment.id}`, { comment: newComment });
                    getComment(id);
                } catch (err) {
                    console.error(err);
                }
            });

            //삭제버튼생성
            const remove = document.createElement('button');
            remove.textContent = "삭제";
            remove.addEventListener("click", async () => {
                try {
                    await axios.delete(`/comments/${comment.id}`);
                    getComment(id);
                } catch (err) {
                    console.error(err);
                }
            });

            //버튼 추가
            tdTag = document.createElement('td');
            tdTag.appendChild(edit);
            row.appendChild(tdTag);
            tdTag = document.createElement('td');
            tdTag.appendChild(remove);
            row.appendChild(tdTag);
            tbodyTag.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// 사용자 등록설정
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;   //username인 input태그에 입력된값받기
    const age = e.target.age.value;        //age인 input태그에 입력된값받기
    const married = e.target.married.checked;    //married인 input태그에 입력된값받기

    if (!name) return alert('이름을 입력하세요');
    if (!age) return alert('나이를 입력하세요');

    try {
        await axios.post('/users', { name, age, married });     //post형식으로  /users에 name, age, married값 전송
        getUser();      //users리스트 화면에 출력.. 방금 추가한 유저를 화면에 업데이트해주기위함
    } catch (err) {
        console.error(err);
    }

    // input박스로 입력받은값 초기화
    e.target.username.value = "";
    e.target.age.value = "";
    e.target.married.value = "";
});

// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    if (!id) return alert("아이디를 반드시 입력해주세요");
    if (!comment) return alert("댓글을 반드시 입력해주세요");

    try {
        await axios.post('/comments', { id, comment });
        getComment(id);
    } catch (err) {
        console.error(err);
    }

    e.target.userid.value = "";
    e.target.comment.value = "";
});