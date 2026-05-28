import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Home');
})
app.get('/about', (req, res) => {
    let items=['ABC','abc','CDE','cde']
    var user=[
        {name:'Yash',age:22,city:'Indore'},
        {name:'Rohit',age:21,city:'Mumbai'},
        {name:'Satyarth',age:22,city:'Delhi'},
        {name:'Shivam',age:21,city:'Bangalore'}
    ]
    res.render('about', { Title: 'About', Message: 'Welcome to the about page', items: items, user: user });
})
app.get('/contact', (req, res) => {
    res.send('Contact');
})

app.listen(3011, () => {
    console.log('Server is running on port 3000');
})


