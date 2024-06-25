import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { FaUtensils } from "react-icons/fa";

function HomePage() {
	return (
		<div className="home-page">
			<div className="home-content">
				<div className="home-icon">
					<FaUtensils />
				</div>
				<h1 className="home-title">
					Welcome to Tara's Recipes Haven
				</h1>
				<h2 className="home-subtitle">
					Discover delicious recipes and culinary tips
				</h2>
				<div className="button-container">
					<Link to="/register">
						<button className="register-button">Register</button>
					</Link>
					<Link to="/login">
						<button className="login-button">Login</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
