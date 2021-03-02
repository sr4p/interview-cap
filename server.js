const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = 3000 || process.env.PORT
const path = require('path')
const Joke = require('./model/Joke')
const User = require('./model/User')
var mongoose = require('mongoose');

var Users_session = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:"secret",resave: false, saveUninitialized: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html",require("ejs").renderFile);

mongoose.connect('mongodb://localhost:27017/joke', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const checkLogin = (req, res, next) => {
    if(!req.session.user) {
        res.redirect("/login")
    } else {
        next()
    }
}


const checkHome = (req, res, next) => {
    if(req.session.user) {
        res.redirect("/")
    } else {
        next()
    }
}

app.get('/register', (req, res) => {
    // res.render('register.ejs')
})

app.post('/register', (req, res) => {
    const createUser = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        createUser.save()

        var newUser = { username, password};
        Users_session.push(newUser);
        req.session.user = newUser;

        res.json({ message: `Register ${req.body.username} successfully! ${req.session}`})

    } catch (err) {
        res.status(500)
        res.json({ message: err.message })
    }
})

app.get('/login',checkHome, (req, res) => {
    console.log(req.session)
    res.render('login.ejs',{message: ""})
})

app.post('/login',checkHome, async (req, res) => {
   
    const username = req.body.username
    const password = req.body.password
    console.log(username,password)
    if(!username|| !password){
        res.render('login.ejs', {message: "Please enter both id and password"});
    } else {
        const user = await User.findOne({username: username})
        if(!user) res.render('login.ejs', {message: "Invalid credentials!"});
        else {
            if(user.username === username && user.password === password){
                req.session.user = user;
                console.log(user,req.session.user.username)
                res.redirect('/');
            }
        }
        
     }
})



app.get('/logout',checkLogin,(req, res) =>{
    req.session.destroy(() => {
       console.log("user logged out.")
    });
    console.log("Logout => session "+req.session);
    res.redirect('/login');
 });


// Get all jokes.
app.get('/',checkLogin, async (req, res) => {
    const jokelist = await Joke.find();
    res.render('index.ejs',{jokes:jokelist, id: req.session.username})
})

// Add new joke.
app.post('/create',checkLogin, async (req, res) => {
    const createJoke = new Joke({
        title: req.body.title
    })

    try {
        await createJoke.save()
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
})

// Get joke by id.
app.get('/:id',checkLogin, async (req, res) => {
    const joke = await Joke.findById(req.params.id)
    res.send(joke)
})

// Delete joke.
app.post('/destroy/:id',checkLogin,async (req, res) => {
    try {
		await Joke.deleteOne({ _id: req.params.id})
		res.redirect("/");
	} catch {
        res.redirect("/");
		res.status(404)
	}
});

// Like a joke.
app.post('/:id/like',checkLogin, async (req, res) => {
    const id = req.params.id;
    const likeJoke = await Joke.findById(id)
    likeJoke.ratings.like += 1;
    
    try {
        await likeJoke.save()
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
})

// Dislike a joke.
app.post('/:id/dislike',async (req, res) => {
    const id = req.params.id;
    const dislikeJoke = await Joke.findById(id)
    dislikeJoke.ratings.dislike += 1;

    try {
        await dislikeJoke.save()
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
  })

app.listen(port, () => console.log(`Server listening on port ${port}`))