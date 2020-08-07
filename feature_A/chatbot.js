window.onload = () => {
    document.getElementById("btn").onclick = processText;
    //document.getElementById("i_result").innerHTML = result;
};

function processText() {
    const newMsg = document.createElement('div');
    newMsg.setAttribute("class", "user_msg");
    console.log(newMsg)
    const txtBox = document.getElementById("textarea");
    const lines = txtBox.value.split("\n");

    let resultString = "<span>";
    for (let i = 0; i < lines.length; i++) {
        resultString += lines[i] + "<br />";
    }
    resultString += "</span>";

    newMsg.innerHTML = resultString;
    document.getElementsByClassName("chat")[0].appendChild(newMsg);
    new_chatbot_msg(resultString);
}

function new_chatbot_msg(str){
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class","chatbot_msg");
    newDiv.innerHTML = str;
    document.getElementsByClassName("chat")[0].appendChild(newDiv);
}
