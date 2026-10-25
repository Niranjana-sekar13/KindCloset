const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Niru@123",
    database: "kindcloset"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully!");
});

app.use(cors());
app.use(express.json());

// HOME / TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to KindCloset API"
    });
});

// GET ALL ITEMS FROM MYSQL
app.get("/api/items", (req, res) => {
    const sql = "SELECT * FROM items";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching items:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to fetch items"
            });
        }

        res.json(results);
    });
});

// SAVE ITEM INTO MYSQL
app.post("/api/items", (req, res) => {
    const {
        itemName,
        category,
        description,
        location
    } = req.body;

    const sql = `
        INSERT INTO items
        (item_name, category, description, location)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        itemName,
        category,
        description,
        location
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error saving item:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to save item"
            });
        }

        console.log("Item saved to MySQL successfully!");

        res.status(200).json({
            success: true,
            message: "Item shared successfully!",
            item: {
                id: result.insertId,
                itemName: itemName,
                category: category,
                description: description,
                location: location
            }
        });
    });
});

// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`KindCloset server running on port ${PORT}`);
});