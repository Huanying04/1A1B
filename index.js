var digits = '';
var answer = '';
var pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var finish = false;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var len = urlParams.get('len') >= 3 && urlParams.get('len') <= 10 ? urlParams.get('len') : 4;

document.getElementById("len").selectedIndex = len - 3;

document.getElementById("desc").innerText = document.getElementById("desc").innerText.replace('$', len);

document.getElementById("one").onclick = function(){dis('one');};
document.getElementById("two").onclick = function(){dis('two');};
document.getElementById("three").onclick = function(){dis('three');};
document.getElementById("four").onclick = function(){dis('four');};
document.getElementById("five").onclick = function(){dis('five');};
document.getElementById("six").onclick = function(){dis('six');};
document.getElementById("seven").onclick = function(){dis('seven');};
document.getElementById("eight").onclick = function(){dis('eight');};
document.getElementById("nine").onclick = function(){dis('nine');};
document.getElementById("zero").onclick = function(){dis('zero');};
document.getElementById("clear").onclick = function(){clear_input();};
document.getElementById("correct").onclick = function(){correct();};

document.getElementById("len").onchange = function(){
    urlParams.set('len', document.getElementById("len").value);
    window.location.href=location.protocol + '//' + location.host + location.pathname + '?' + urlParams.toString();
};

for (var i = 0; i < len; i++) {
    var j = pool[Math.floor(Math.random() * pool.length)];
    answer += j;
    var index = pool.indexOf(j);
    pool.splice(index, 1);
}

function dis(name) {
    if (digits.length < len){
        document.getElementById(name).style.visibility = "hidden";
        digits += toNum(name);
        document.getElementById("guess").innerHTML = digits;
    }
}

function clear_input() {
    if (!finish){
        document.getElementById("one").style.visibility = "visible";
        document.getElementById("two").style.visibility = "visible";
        document.getElementById("three").style.visibility = "visible";
        document.getElementById("four").style.visibility = "visible";
        document.getElementById("five").style.visibility = "visible";
        document.getElementById("six").style.visibility = "visible";
        document.getElementById("seven").style.visibility = "visible";
        document.getElementById("eight").style.visibility = "visible";
        document.getElementById("nine").style.visibility = "visible";
        document.getElementById("zero").style.visibility = "visible";
        digits = '';
        document.getElementById("guess").innerHTML = '&#8204';
    }
}

function correct() {
    if (digits.length == len && !finish) {
        if (digits == answer) {
            document.getElementById("history").innerHTML += digits + "    <span style=\"color:green\">" + len + "A" + 0 + "B</span><br>";
            document.getElementById("reset").style.visibility = "visible";
            finish = true;
            return
        }

        var a = 0, b = 0;
        for (var i = 0; i < len; i++) {
            var num = Math.floor(digits % Math.pow(10, len - i) / (Math.pow(10, len - i)/10));
            if (answer[i] == num) {
                a++;
            }
            for (var k = 0; k < len; k++) {
                if (k == i) {
                    continue;
                }
                if (answer[k] == num) {
                    b++;
                }
            }
        }
        document.getElementById("history").innerHTML += digits + "    <span style=\"color:red\">" + a + "A" + b + "B</span><br>";
        clear_input();
    }else if (!finish) {
        showToast("必須輸入"+len+"位數字", '#f24d41');
    }
}

function reset() {
    digits = '';
    answer = '';
    pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    finish = false;
    
    for (var i = 0; i < len; i++) {
        var j = pool[Math.floor(Math.random() * pool.length)];
        answer += j;
        var index = pool.indexOf(j);
        pool.splice(index, 1);
    }

    history = '';
    document.getElementById("history").innerHTML = "";
    clear_input();
    document.getElementById("reset").style.visibility = "hidden";
}

function toNum(str) {
    if (str == 'one') {
        return 1;
    }
    if (str == 'two') {
        return 2;
    }
    if (str == 'three') {
        return 3;
    }
    if (str == 'four') {
        return 4;
    }
    if (str == 'five') {
        return 5;
    }
    if (str == 'six') {
        return 6;
    }
    if (str == 'seven') {
        return 7;
    }
    if (str == 'eight') {
        return 8;
    }
    if (str == 'nine') {
        return 9;
    }
    if (str == 'zero') {
        return 0;
    }
}

function showToast(content, color) {
    var toast = document.createElement("toast");
    toast.id = "toast";
    toast.innerHTML = content;
    toast.className = "show";
    var element = document.getElementById("toasts");
    element.append(toast);
    toast.style.backgroundColor = color==undefined?"#333":color;
    setTimeout(
        function(){
            toast.className = toast.className.replace("show", "");
            toast.remove();
        },
        3000);
}