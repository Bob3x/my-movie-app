const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

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

app.use(morgan('combined'));        // Morgan middleware to log all requests to the terminal
app.use(express.static('public'));  // Serve static files from the "public" directory

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
  res.json(topMovies);
});

// GET movies by title
app.get('/movies/:title', (req, res) => {
	const { title } = req.params;  // Get the title from the request parameters

  console.log(title);

	const foundMovie = topMovies.find((m) => m.title === title);  // Loop through the array and find the movie title

	if (!foundMovie) {
		return res.status(404).send('Movie not found.');
	}

	res.json(foundMovie);
});

// GET movies by director
app.get('/movies/:director', (req, res) => {
	const { director } = req.params;   // Get the director from the request parameters

  console.log(director);

  const foundDirector = topMovies.find((m) => m.director === director);  // Loop through the array and find the director

	if (!foundDirector) {
		return res.status(404).send('Director not found.');
	}

	res.json(foundDirector);
});

app.get('/movies/:genre', (req, res) => {
	const { genre } = req.params;  	// Get the genre from the request parameters

	console.log( genre );

	const foundGenre = topMovies.find((m) => m.genre === genre);  	// Loop through the array and find the matching genre

	if (!foundGenre) {
		return res.status(404).send('Genre not found.');
	}

	res.json(foundGenre.genre);
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