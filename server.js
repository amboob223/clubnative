const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const multer = require("multer");
const path = require("path");

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
    destination: (req, file, cb) => {
        cb(null, "images/");
    }
});
const upload = multer({ storage: storage });

// Routes
app.post("/pass", async (req, res) => {
    // Implement the logic for "/pass" route here
    res.send("Pass route");
});

app.post("/promo/text", async (req, res) => {
    try {
        const { name, phone, date, club, numsections } = req.body;
        console.log("Request Body for /promo/text:", req.body);

        const data = await pool.query(
            "INSERT INTO promo (name, phone, date, club, numsections) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, phone, date, club, numsections]
        );

        console.log("Data inserted into promo table:", data.rows[0]);
        res.json(data.rows[0]);
    } catch (error) {
        console.error("Error in /promo/text route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/promo/img", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.body;
        console.log("Request Body for /promo/img:", req.body);

        // Check if the file is being received
        console.log("Received File:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No image file received." });
        }

        // Update the record in the database with the image filename
        const { filename } = req.file;
        console.log("Image Filename:", filename);

        const data = await pool.query(
            "UPDATE promo SET pic = $1 WHERE id = $2 RETURNING *",
            [filename, id]
        );

        console.log("Image uploaded for promo ID:", id);
        res.json({ success: true, message: "It's all good" });
    } catch (error) {
        console.error("Error in /promo/img route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/clubbers/text", async (req, res) => {
    try {
        const { name, date, phone, email } = req.body;
        console.log("Request Body for /clubbers/text:", req.body);

        const data = await pool.query(
            "INSERT INTO clubbers (name, date, phone, email) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, date, phone, email]
        );

        console.log("Data inserted into clubbers table:", data.rows[0]);
        res.json(data.rows[0]);
    } catch (error) {
        console.error("Error in /clubbers/text route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
