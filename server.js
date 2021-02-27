const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const path = require('path')
const Joke = require('./model/Joke')
var mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html",require("ejs").renderFile);

mongoose.connect('mongodb://localhost:27017/joke', {useNewUrlParser: true, useUnifiedTopology: true});

// app.get('/test', async (req, res) => {
//     const jokelist = await Joke.find();
//     res.render('index.ejs',{jokes:jokelist})
// })

// Get all jokes.
app.get('/', async (req, res) => {
    const jokelist = await Joke.find();
    res.render('index.ejs',{jokes:jokelist})
})

// Add new joke.
app.post('/create', async (req, res) => {
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
app.get('/:id', async (req, res) => {
    const joke = await Joke.findById(req.params.id)
    res.send(joke)
})

// Delete joke.
app.post('/destroy/:id',async (req, res) => {
    try {
		await Joke.deleteOne({ _id: req.params.id})
		res.redirect("/");
	} catch {
        res.redirect("/");
		res.status(404)
	}
});

// Like a joke.
app.post('/:id/like', async (req, res) => {
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