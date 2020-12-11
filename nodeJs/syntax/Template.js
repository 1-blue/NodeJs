var name = "test";

var letter = "Dear " + name + '\n\
test text\n\
color red\n\
end'

console.log(letter);

/*
\ : 코드내에서 줄바꿈허용
\n : 출력문장에서 줄바꿈
리터럴 : 정보를 표현하는 기호
템플릿리터럴 : 있는그대로 표현 ``사용, ${}사용, 줄바꿈그대로 적용
*/

var letter = `${1+1}::Dear ${name}
test text
color red
end`

console.log(letter);