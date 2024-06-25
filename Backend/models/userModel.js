const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	cart: [
		{
			dish_id: { type: String, required: true },
			name: { type: String, required: true },
			publisher: { type: String, required: true },
			quantity: { type: Number, default: 1 },
			image: { type: String, required: true },
		},
	],
});

module.exports = mongoose.model("User", userSchema);
