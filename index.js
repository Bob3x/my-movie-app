const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
app.use(morgan('combined'));        // Morgan middleware to log all requests to the terminal
app.use(express.static('public'));  // Serve static files from the "public" directory
app.use(bodyParser.json());

// List  of users
let users = [
  {
    id: 1,
    name: "Bobb",
    favoriteMovies: []

  },
  {
    id: 2,
    name: "Sara",
    favoriteMovies: ["The Gotfather"]
  }
]

// List of movies
let topMovies = [
    {
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      imageURL: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
      director: 'Francis Ford Coppola',
      genre: 'Crime',
      year: '1972'
    },
    {
      title: 'The Shawshank Redemption',
      description: 'A Maine banker convicted of the murder of his wife and her lover in 1947 gradually forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.',
      imageURL: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm1690056449/?ref_=tt_ov_i',
      director: 'Frank Darabont',
      genre: 'Drama',
      year: '1994'
    },
    {
      title: 'Schindler`s List',
      description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
      imageURL: 'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',
      director: 'Steven Spielberg',
      genre: 'Drama',
      year: '1993'
    },
    {
      title: 'Raging Bull',
      description: 'The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.',
      imageURL: 'https://www.imdb.com/title/tt0081398/mediaviewer/rm3879544320/?ref_=tt_ov_i',
      director: 'Martin Scorsese',
      genre: 'Drama',
      year: '1980'
    },
    {
      title: 'Citizen Kane',
      description: 'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: "Rosebud".',
      imageURL: 'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
      director: 'Orson Welles',
      genre: 'Drama',
      year: '1941'
    },
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

// GET the documentation file
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// GET endpoint movies
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
});

// GET movies by title
app.get('/movies/:title', (req, res) => {
	const { title } = req.params;  // Get the title from the request parameters
	const movie = topMovies.find(movie => movie.title === title);  // Loop through the array and find the movie title

	if (movie) {
	  res.status(200).json(movie);
	} else {
    return res.status(400).send('Movie not found.');
  }
});

// GET movies by director
app.get('/movies/directors/:directorName', (req, res) => {
	const { directorName } = req.params;   // Get the director from the request parameters

  const director = topMovies.find((m) => m.director === directorName).director;  // Loop through the array and find the director

	if (!director) {
		return res.status(400).send('Director not found.');
	}

	res.json(director);
});

app.get('/movies/genres/:genreName', (req, res) => {
	const { genreName } = req.params;  	// Get the genre from the request parameters

	const genre = topMovies.find((m) => m.genre === genreName).genre;  	// Loop through the array and find the matching genre

	if (!genre) {
		return res.status(404).send('Genre not found.');
	}

	res.json(genre);
});

app.get('/movies/:year', (req, res) => {
	// Get the title from the request parameters
	const { year } = req.params;

	console.log(year);

	const foundYear = topMovies.find((m) => m.year === year);   	// Loop through the array and find the matching year

	if (!foundYear) {
		return res.status(404).send('Year not found.');
	}

	res.json(foundYear.year);
});

// Create new user
app.post('/users', (req, res) => {
	return res.send('User created successfully.');
});

// Update user
app.put('/users/:username', (req, res) => {
	res.send('User updated successfully.');
});

// Delete user
app.delete('/users/:username', (req, res) => {
	const username = req.params.username;

	res.send(`User ${username} delete successfully.`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error('Error:', err.stack);
	res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});