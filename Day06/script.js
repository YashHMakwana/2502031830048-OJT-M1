let welcome = function (name) {
  return `Welcome ${name}`;
};
console.log(welcome("John"));

document.writeln(Math.E);

var a = Math.pow(2, 3);
document.writeln(a);

var num = Math.random();
document.writeln(num);

var num2 = parseInt(1 + Math.random() * 100);
document.writeln(num2);

document.writeln(Math.ceil(2, 7)+`<br>`);
document.writeln(Math.floor(2, 7)+`<br>`);
document.writeln(Math.round(2, 7)+`<br>`);

var person = new Object();
person.firstname="Yash";
person.lastname="Makwana";
person.sayHello = function() {
    alert(`Hello ${this.firstname} ${this.lastname}`);
}
person.sayHello();

var person={firstname:"Yash",lastname:"Makwana",
    sayHello:function() {
        alert(`Hello ${this.firstname} ${this.lastname}`)
    }
};
person.sayHello();

  let obj = new Object()
        obj.name = "Hello"
        obj.age=" 20"
        obj.fun = ()=>{
            alert(obj.name+obj.age)
        }

        obj.fun()


        let text2 = document.querySelector("#myText");

console.log(text2.value);


function handle(){
    const f = document.querySelector("#myform")
    const name = f.username.value
    const password = f.password.value


    if(name === "admin" || password === "123"){
       return alert("valid")
    }
    alert("Invalid")
}



const mail = document.querySelector("#email").value


function checkEmail(email) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(email)) {
        console.log("Valid Email");
    } else {
        console.log("Invalid Email");
    }
}


checkEmail(mail );