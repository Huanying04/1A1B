var digits = '';
var answer = '';
var pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var finish = false;

for (var i = 0; i < 4; i++) {
    var j = pool[Math.floor(Math.random() * pool.length)];
    answer += j;
    var index = pool.indexOf(j);
    pool.splice(index, 1);
}

console.log(answer);

function dis(name) {
    if (digits.length < 4){
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
        document.getElementById("guess").innerHTML = digits;
    }
}

function correct() {
    if (digits.length == 4 && !finish){
        if (digits == answer) {
            document.getElementById("history").innerHTML += digits + "    <span style=\"color:green\">答對！</span><br>";
            document.getElementById("reset").style.visibility = "visible";
            finish = true;
            return
        }

        var a = 0, b = 0;
        for (var i = 0; i < 4; i++) {
            var num = Math.floor(digits % Math.pow(10, 4 - i) / (Math.pow(10, 4 - i)/10));
            if (answer[i] == num) {
                a++;
            }
            for (var k = 0; k < 4; k++) {
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
    }
}

function reset() {
    digits = '';
    answer = '';
    pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    finish = false;
    
    for (var i = 0; i < 4; i++) {
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