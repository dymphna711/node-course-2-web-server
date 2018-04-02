const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')


app.use((req, res, next) =>{
    let now = new Date().toString();
    console.log(`${now} : ${req.method} : ${req.url}`);
    let log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log +'\n', (err) =>{
        if(err){
            console.log('unable to append to server log')
        }
    });
    next();
});

//no next() "we're down" - brining site down
/*app.use((req, res, next) =>{
    res.render('maintenance.hbs')
 });*/


app.use(express.static(__dirname + '/public')); //example call in url: http://localhost:3000/help.html





hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})


app.get('/', (req, res) =>{
 
   /* res.send({
        name: 'Ellen',s
        puppies:['Millie', 'Duncan', 'Fritz', 'Misha'] 
    })*/
    res.render('home.hbs', {
       pageTitle: 'Home Page' ,
       welcomeMessage: 'Hello',
       name: 'Ellen'    
    })
});

app.get('/about', (req, res) =>{
    //res.send('<h2>About Page</h2>')
    res.render('about.hbs', {
       pageTitle: 'About Page' 
       
    })
})
app.get('/contact', (req, res) =>{
    res.send('<h2>Contact Us</h2>')
})
app.get('/bad', (req, res) =>{
    res.send({
    errorMessage: "ooops",
    details: "This is the",
    placeType: "Bad"    
    })
})
app.listen(3000, () =>{
    console.log('server up on 3000');
});
