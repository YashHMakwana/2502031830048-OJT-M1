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
