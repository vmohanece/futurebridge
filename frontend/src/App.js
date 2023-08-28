import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const sendMovieRequest = async () => {
		const url = `http://localhost:4002/movies/store`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
    			'Content-Type': 'application/json',
			},
			body: JSON.stringify(movies)
		});
		const responseJson = await response.json();
		return true;
	};

	useEffect(() => {
		getMovieRequest(searchValue);
		sendMovieRequest();
	}, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
				/>
			</div>
		</div>
	);
};

export default App;
