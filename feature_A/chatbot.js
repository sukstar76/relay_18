window.onload = () => {
    document.getElementById("btn").onclick = processText;
    //document.getElementById("i_result").innerHTML = result;
};

let STATE = 0;

function removeText() {
    const inputElment = document.getElementById("textarea");
    inputElment.value = '';
}


function processText() {
    const newMsg = document.createElement('div');
    newMsg.setAttribute("class", "user_msg");
    const txtBox = document.getElementById("textarea");
    const lines = txtBox.value.split("\n");

    const resultString = lines.reduce((prev, curr) => {
        return prev + curr + "<br />";
    }, '')
    newMsg.innerHTML = resultString;
    document.getElementsByClassName("chat")[0].appendChild(newMsg);
    removeText();
    if (STATE === 0) new_chatbot_msg(resultString);
    else if (STATE === 1 || STATE === 2) login_chat(resultString);
}

function matchString(str) {
    if (str.match(/회원/) || str.match(/가입/)) return 'join';
    else if (str.match(/로그인/)) return 'login';
    else return 'wrong';
}

function new_chatbot_msg(str){
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");

    const type = matchString(str);
    switch(type){
        case 'join':
            newDiv.innerHTML = "버튼을 누르면 회원가입 페이지로 넘어갑니다";
            const joinBtn = document.createElement('button');
            joinBtn.setAttribute("class", "join_btn");
            joinBtn.appendChild(document.createTextNode("회원가입"));
            joinBtn.addEventListener('click', function(e) {
                console.log(e);
            });
            newDiv.appendChild(joinBtn);                
        break;
        case 'login':
            newDiv.innerHTML = "로그인을 진행합니다.<br>아이디를 입력해주세요.";
            STATE = 1;
            break;
        case 'wrong' :
        default:
            newDiv.innerHTML = '부캠봇이 알아들을 수 없어요.<br>다시 입력해주세요.'
    }
    document.getElementsByClassName("chat")[0].appendChild(newDiv);
}

function login_chat(resultString) {
    if (STATE === 1) {
        const tempData = { id: resultString, password: null};
        localStorage.setItem('temp', JSON.stringify(tempData));
        STATE = 2;
        return login_chat_msg(1);
    } else if (STATE === 2) {
        const prevData = JSON.parse(localStorage.getItem('temp'));
        prevData.password = resultString;
        localStorage.setItem('temp', JSON.stringify(prevData));
        return login_chat_msg(2);
    }
}

function login_chat_msg(state) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");

    switch(state){
        case 1:
            newDiv.innerHTML = "비밀번호를 입력하세요";            
            break;
        case 2:
            newDiv.innerHTML = "로그인이 완료되었습니다.";
            break;
    }
    document.getElementsByClassName("chat")[0].appendChild(newDiv);
}