let I = 0;

while (I <= 10) {
  document.getElementById("WhileLoop").innerHTML += I;
  I++;
}


let i = 0;

do {
  document.getElementById("Do-WhileLoop").innerHTML += i;
  i++;
} while (i <= 10);


var std = ["Yash", "Zeel", "Satyarth", "Shivam"];

for (let j = 0; j < std.length; j++) {
  document.getElementById("std").innerHTML += std[j] + "<br>";
}


var mark = [90, 80, 70, 60];
var total = 0;

for (let k = 0; k < mark.length; k++) {
  total += mark[k];
}

document.getElementById("TotalMarks").innerHTML += "Total Marks: " + total;

for (let l = 0; l <= 10; l++) {
  document.getElementById("Table").innerHTML +=
    "5 x " + l + " = " + 5 * l + "<br>";
}

for (let m = 1; m <= 10; m++) {
  if (m % 2 == 0) {
    document.getElementById("Even").innerHTML += m + "<br>";
  }
}
for (let m = 1; m <= 10; m++) {
  if (m % 2 != 0) {
    document.getElementById("Odd").innerHTML += m + "<br>";
  }
}

let n = 1;

while (n <= 10) {
  document.getElementById("CountDown").innerHTML += n;
  n++;
}

// let correctPassword = "12345";
// for(let attempt = 0; attempt < 3; attempt++) {
//   let password = prompt("Enter the password:");
//   if (password === correctPassword) {
//     console.log("Access granted!");
//     break;
//   } else {
//     clg("Incorrect password. Try again.");
//   }
// }

// let correctPin = "12345";
// for(let attempt = 0; attempt < 3; attempt++) {
//   let pin = prompt("Enter the PIN:");
//   if (pin === correctPin) {
//     console.log("Access granted!");
//     break;
//   } else {
//     clg("Incorrect password. Try again.");
//   }
// }

let correctPin = 1234;
let enteredPin;

for (let attempts = 1; attempts <= 3; attempts++) {

    enteredPin = Number(prompt("Enter ATM PIN:"));

    if (enteredPin === correctPin) {
        console.log("PIN Verified Successfully!");
        break;
    } else {
        console.log("Wrong PIN");
    }

    if (attempts === 3) {
        console.log("ATM Card Blocked");
    }
}


let correctPassword = "16042006";
let password;

for (let attempts = 1; attempts <= 3; attempts++) {

    password = prompt("Enter Password:");

    if (password === correctPassword) {
        console.log("Login Successful!");
        break;
    } else {
        console.log("Wrong Password");
    }

    if (attempts === 3) {
        console.log("Account Blocked");
    }
}


var car= new Array(3);
car[0] = "BMW";
car[1] = "Audi";
car[2] = "Mercedes";
var car2=new Array("BMW","Audi","Mercedes");
var car3=["Ferrari","Lamborghini","Bugatti"];

document.write(car2);
car2.push("McLaren");
document.write("<br>" + car2);
car2.pop();
document.write("<br>" + car2);

var data= car2.concat(car3);
document.write("<br>" + data);


// console.log("<h1>" + "Function" + "</h1>");
function foo(p1) {
  if (typeof(p1) === "number")
    return 0;
  else if (typeof(p1) === "string")
    return "Not a number";
  else
    return "Invalid input";
}

console.log(foo(1));
console.log(foo("Hello"));
console.log(foo());

