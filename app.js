const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');
const bodyParser = require('body-parser')
const Port = 8000;
const posts =[];
const homeStartingContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const aboutContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const contactContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));


app.get('/', (req,res)=> {
   
    res.render('home',{texts:posts,text:homeStartingContent,link:'posts/'});
    // console.log(posts);
});

app.get('/about',(req,res)=> {
    res.render('about',{aboutText:aboutContent})
});

app.get('/contact',(req,res)=> {
    res.render('contact',{contactText:aboutContent})
});

app.get('/compose',(req,res)=> {
    res.render('compose')
});
app.post('/compose', (req,res)=> {
    
   const post = {
    title: req.body.blogTitle,
    content: req.body.blogBody
    }
    posts.push(post)
    res.redirect('/')
    
})

app.get('/posts/:testing', (req,res)=> {
    const dummytext = _.lowerCase(req.params.testing);
    posts.forEach((item)=>{
        const itemTitle = _.lowerCase(item.title)
        if (itemTitle === dummytext){
            console.log("matched")
            res.render('post', {postHead:item.title,postContent:item.content})
            
        }
    });
    
});



app.listen(Port, ()=> {
    console.log(`Server Running on port ${Port}...`)
})
