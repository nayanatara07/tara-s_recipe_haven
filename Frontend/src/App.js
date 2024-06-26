import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import HomePage from "../src/Components/HomePage";
import LoginPage from "../src/Components/LoginPage";
import RegisterPage from "../src/Components/Register";
import AppContent from "../src/Components/AppContent";
import RecipeDetailPage from "../src/Components/RecipeDetailPage";
import CartPage from "../src/Components/CartPage";
import "../src/Components/App.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../src/redux/reducers/cartReducer";


function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [registeredUsers, setRegisteredUsers] = useState([]);
	const [cart, setCart] = useState([]);
	const dispatch = useDispatch();

	const handleRegister = (user) => {
		setRegisteredUsers([...registeredUsers, user]);
	};

	const handleLogin = (user) => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		dispatch(clearCart()); 
	};

	const handleRemoveFromCart = (index) => {
		setCart((prevCart) =>
			prevCart.filter((_, i) => i !== index)
		);
	};

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={<HomePage isLoggedIn={isLoggedIn} />}
					/>
					<Route
						path="/login"
						element={<LoginPage onLogin={handleLogin} />}
					/>
					<Route
						path="/register"
						element={<RegisterPage onRegister={handleRegister} />}
					/>
					{isLoggedIn ? (
						<>
							<Route
								path="/app"
								element={<AppContent onLogout={handleLogout} />}
							/>
							<Route
								path="/recipe/:id"
								element={<RecipeDetailPage />}
							/>
							<Route
								path="/cart"
								element={
									<CartPage
										cart={cart}
										onRemoveFromCart={handleRemoveFromCart}
									/>
								}
							/>
						</>
					) : (
						<Route
							path="*"
							element={<HomePage isLoggedIn={isLoggedIn} />}
						/>
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
