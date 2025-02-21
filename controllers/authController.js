const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Signup Controller

const signup = async (req, res) => {
    try {
        console.log("Signup request received", req.body);

        const { firstName, lastName, email, password, contact } = req.body;

        // Check if user already exists by email
        const existingUser = await prisma.employee.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new employee
        const user = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                contact: contact || null, 
            },
        });

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token, user,  });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to register user", details: error.message });
    }
};


// Login Controller

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.employee.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: "User database not found" });

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed", details: error.message });
    }
};

module.exports = { signup, login };
