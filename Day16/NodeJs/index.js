// // // const express = require("express");
// // import express from "express";
// // const app = express();

// // const server = app.listen(3001, () => {
// //   console.log("Successfully Connected to the Server");
// // });

// // server.on("error", (err) => {
// //   if (err.code === "EADDRINUSE") {
// //     console.error(
// //       "\x1b[31m%s\x1b[0m",
// //       "Error: Port 3001 is already in use by a zombie Node process.",
// //     );
// //     console.error(
// //       "\x1b[33m%s\x1b[0m",
// //       "To fix this, stop the terminal and run: npx kill-port 3001",
// //     );
// //   } else {
// //     console.error("Server error:", err.message);
// //   }
// // });

// // app.get("/", (req, res) => {
// //   res.send("Hello");
// // });

// // app.get("/about/:userid/book/:bookid", (req, res) => {
// //   res.send("This is the about page");
// //   console.log(req.params.userid);
// // });

// // app.get("/contact", (req, res) => {
// //   res.send("This is the contact page");
// // });

// // app.get("/search", (req, res) => {
// //   const name = req.query.name;
// //   const age = req.query.age;

// //   res.send(`Search results for name: ${name}, age: ${age}`);
// // })

// // app.listen(3000, () => {
// //   console.log("Server is running on port 3000");
// // });
// // app.get("/", (req, res) => {
// //   const data=[
// //     { name: "John", age: 30 },
// //     { name: "Jane", age: 25 },
// //     { name: "Doe", age: 35 }
// //   ];
// //   res.json(data);
// // });
// // app.get("/user", (req, res) => {
// //   res.send("This is the users page");
// // });

// import express from 'express'
// // const express = require('express')
// const app = express()

// app.get('/', (req, res) => {

//     // const users = [

//     //     {id:1,name:"Ankit"},
//     //     {id:3,name:"Ankit"}

//     // ]
//     // alert("Hello World");
// res.send("Hello World");
//     // res.json(users);

// });

// // app.set('view engine','ejs')

// // app.get('/about', (req, res) => {

// //     res.redirect('..'); 

// // });

// // app.get('/user', (req, res) => {

// //     res.render('user')
// // });

// // app.get('/download', (req, res) => {

// //     res.download('./Files/HTML5_Logo.svg', 'HTML.svg')
// // });

// app.listen(3000, () => {

//     console.log("Successfully Connected on port 3000.")

// })

const express = require('express')
const app = express()

app.get('/', (req, res) => {

    const users = [

        {id:1,name:"Y@$H"},
        {id:3,name:"Y@$H"}

    ]

    res.json(users);

});

app.set('view engine','ejs')

app.get('/about', (req, res) => {

    res.redirect('..'); 

});

app.get('/user', (req, res) => {

    res.render('user')
});

app.get('/download', (req, res) => {

    res.download('./Files/HTML5_Logo.svg', 'HTML.svg')
});

app.listen(3000, () => {

    console.log("Successfully Connected on port 3000.")

})