/**
 * 1. fs.readFile()
 * 2. fs.writeFile()
 * 3. fs.access(path, option, callback)... (constants.F_OK 파일존재여부 errorCode === ENOENT)
 * 4. fs.mkdir(path, callback) : 폴더생성
 * 5. fs.open(path, option, callback(id)) : 파일열고 파일아이디 전송 (파일없을경우 w옵션이면 생성함)
 * 6. fs.rename(oldPath, currentPath, callback) : old -> current로 파일잘라내기
 * 7. fs.readdir(path, callback) : 폴더내용읽기(배열에 파일이름들이 저장됨)
 * 8. fs.unlink(path, callback) : path에 존재하는 파일삭제 (파일없으면 에러발생)
 * 9. fs.rmdir(path, callback) : path에 존재하는 폴더삭제 (폴더내부에 파일존재하면 에러발생)
 * 10. fs.copyFile(prevPath, afterPath, callback) : prevPath파일내용을 afterPath파일에 복사함.
 * 
 */

const fs = require('fs').promises;
const constants = require('fs').constants

//폴더검사 -> 폴더생성 -> 파일생성 -> 이름바꾸기 -> 파일지우기
fs.access('./file_system//folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .catch((err) => {
        console.log("폴더없음");
        if (err.code === "ENOENT") {
            console.log("폴더생성하기");
            return fs.mkdir('./file_system//folder')
        }
    })
    .then(()=>{
        console.log("폴더생성완료");
        return fs.open('./file_system//folder//file.js', 'w')
    })
    .then((id)=>{
        console.log("파일생성완료");
        return fs.rename('./file_system//folder//file.js', './file_system//folder//newFile.js');
    })
    .then(()=>{
        console.log("이름바꾸기완료");
        return fs.readdir('./file_system//folder', 'utf-8')
    })
    .then((dir)=>{
        console.log(`파일내용보기 : ${dir}`);
        return fs.unlink('./file_system//folder//' + dir[0])
    })
    .catch((err)=>{
        console.log(`파일존재하지않음 : ${err}`);
    })
    .then(()=>{
        console.log('파일지우기완료');
        //return fs.rmdir('./file_system//folder'); 
        //여기다가 붙여서 쓰면 파일이 지워지지않은걸로 인식됨.. 이유는?
    })

//폴더지우기
fs.rmdir('./file_system//folder')
    .catch((err)=>{
        console.log(`폴더안에 파일이 존재하지않아야 폴더를 지울 수 있습니다.\n${err}`)
    })
    .then(()=>{
        console.log('폴더지우기완료');
    })

//파일복사
fs.copyFile('./file_system//1.txt', './file_system//2.txt')
    .then(()=>{
        console.log("success");
    })