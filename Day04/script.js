// document.write("<hr>");
// document.write("<h1>JavaScript</h1>");
// document.write("<hr>");
// document.write("<h2>JavaScript is a programming language that allows you to create dynamic and interactive web content.</h2>");
// document.write("<hr>");
// document.write("<p>It is commonly used for client-side web development, but it can also be used on the server-side with Node.js.</p>");
// document.write("<hr>");

document.getElementById("demo1").innerHTML = "Hello, JavaScript!";

var a = 10;
var b = 20;
var sum = a + b;
var sub = a - b;
var mul = a * b;
var div = a / b;

document.getElementById("Variables").innerHTML = "Variables:-"+"<br>"+ "The sum of " + a + " and " + b + " is: " + sum + "<br>" + "The subtraction of " + a + " and " + b + " is: " + sub+ "<br>" + "The multiplication of " + a + " and " + b + " is: " + mul+ "<br>" + "The division of " + a + " and " + b + " is: " + div;

var x = 5;
var y = true;
var z = "Hello";
var w=[1,2,3,4,5];

document.getElementById("DataTypes").innerHTML = "DataTypes:-"+"<br>" + "x is a " + typeof(x) + "<br>" + "y is a " + typeof(y) + "<br>" + "z is a " + typeof(z)+"<br>" + "w is a " + typeof(w);

document.getElementById("Operators").innerHTML = "Operators:-";
for (var i = 0; i < 5; i++) {
    document.getElementById("PostInc").innerHTML += + i ;
}
for (var i = 5; i >= 0; i--) {
    document.getElementById("PostDec").innerHTML += + i ;
}

// for (var i = 0; i < 5; ++i) {
//     document.getElementById("PreInc").innerHTML += + i ;
// }
// for (var i = 0; i < 5; --i) {
//     document.getElementById("PreDec").innerHTML += + i ;
// }

// var p = 10;
// var q = 5;

// console.log(p);
// console.log(q);
// p++
// console.log(p);
// q--
// console.log(q);

document.getElementById("ConditionalStatements").innerHTML = "Conditional Statements:-";
var num1 = 10;
var num2 = 20;

if (num1 % 2 === 0) {
    document.getElementById("OddEven").innerHTML = num1 + " is even.";
} else {
    document.getElementById("OddEven").innerHTML = num1 + " is odd.";
}

let marks = 85;

if (marks >= 30) {
    document.getElementById("marks").innerHTML += "<br>" + "You passed the exam.";
} else {
    document.getElementById("marks").innerHTML += "<br>" + "You failed the exam.";
}


let age = 18;
if (age>=18){
    document.getElementById("age").innerHTML += "<br>" + "You are eligible to vote.";
} else {
    document.getElementById("age").innerHTML += "<br>" + "You are not eligible to vote.";
}


let temperature = 25;
if (temperature > 30) {
    document.getElementById("temp").innerHTML += "<br>" + "Heigh.";
} else if (temperature > 20) {
    document.getElementById("temp").innerHTML += "<br>" + "Low";
}

let mark=500;
if (mark >= 90) {
    document.getElementById("grade").innerHTML += "<br>" + "Grade: A";
} else if (mark >= 80) {
    document.getElementById("grade").innerHTML += "<br>" + "Grade: B";
} else if (mark >= 70) {
    document.getElementById("grade").innerHTML += "<br>" + "Grade: C";
} else if (mark >= 60) {
    document.getElementById("grade").innerHTML += "<br>" + "Grade: D";
} else {
    document.getElementById("grade").innerHTML += "<br>" + "Grade: F";
}


let A=500000;
let B=1000000;
if (a >= b) {
    document.getElementById("BankBalc").innerHTML += " Enough.";
} else{
    document.getElementById("BankBalc").innerHTML += "Not Enough";
}