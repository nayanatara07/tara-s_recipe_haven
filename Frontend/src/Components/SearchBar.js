import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchInput);
	};

	return (
		<form onSubmit={handleSubmit} className="search-bar">
			<input
				type="text"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder="Search for a recipe..."
				className="search-input"
			/>
			<button type="submit" className="search-button">
				Search
			</button>
		</form>
	);
};

export default SearchBar;
