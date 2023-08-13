import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "bookshopdb"
});

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello this is the backend")
})


// If you face any authentication error, run the following query in your mysql database
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';


app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=> {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q, [values], (err, data)=> {
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    })
})

app.listen(8800, () => {
    console.log('Backend server is running!');
});