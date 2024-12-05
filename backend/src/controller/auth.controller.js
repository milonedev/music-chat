import { User } from "../models/user.model.js";

export const authCallbackController = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		// Intentar crear el usuario directamente
		await User.create({
			clerkId: id,
			fullName: `${firstName || ""} ${lastName || ""}`.trim(),
			imageUrl,
		});

		return res.status(201).json({ success: true, message: "User created" });
	} catch (error) {
		// Verificar si el error es de clave duplicada
		if (error.code === 11000) {
			console.warn("Duplicate key error:", error.keyValue);

			// Buscar el usuario existente para retornar la información actualizada
			const existingUser = await User.findOne({ clerkId: error.keyValue.clerkId });
			return res.status(200).json({
				success: true,
				message: "User already exists",
				user: existingUser,
			});
		}

		// Otros errores
		console.error("Error in auth callback", error);
		next(error);
	}
};
