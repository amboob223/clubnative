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
});

app.post("/promo/text", async (req, res) => {
    try {
        const { namee, phone, date, club, numsections } = req.body;
        const data = await pool.query(
            "INSERT INTO promo (name, phone, date, club, numsections) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [namee, phone, date, club, numsections]
        );
        res.json(data.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/promo/img", upload.single("pic"), async (req, res) => {
    try {
        const { id } = req.body;

        // Update the record in the database with the image filename
        const { filename } = req.file; // Use req.file.filename to get the filename
        const data = await pool.query(
            "UPDATE promo SET pic = $1 WHERE id = $2 RETURNING *",
            [filename, id]
        );

        res.json({ success: true, message: "It's all good" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/clubbers/text", async (req, res) => {
    try {
        const { namee, date, phone, email } = req.body;
        const data = await pool.query(
            "INSERT INTO clubbers (name, date, phone, email) VALUES ($1, $2, $3, $4) RETURNING *",
            [namee, date, phone, email]
        );
        res.json(data.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
