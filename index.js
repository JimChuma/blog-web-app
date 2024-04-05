import express from "express";
import bodyParser from "body-parser";
import fs from "fs";


const app = express();
const port = 3000;
const heading = [];
const text = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded( {extended: true} ));

app.post("/submit", (req, res) => {
    const mySentence = req.body.headline.trim();
    const words = mySentence.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    words.join(" ");
    let newWord = "";
    for (let i = 0; i < words.length; i++) {
        newWord += words[i] + " ";
    }
    if (heading.includes(newWord.trim())) {
        heading.splice(heading.indexOf(newWord.trim()), 1);
    }
    heading.unshift(newWord.trim());
    text.unshift(req.body.content.trim());;
    const data = {
        outHeading: heading,
        outText: text,
    }

    fs.writeFile(`./public/assets/${req.body.headline.trim().toLowerCase()}.html`, `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${newWord.trim()}</title>
        <link rel="stylesheet" href="../styles/layout.css">
    </head>
    <body>
        <div><h2>${newWord.trim()}</h2></div>
        <pre>${req.body.content}</pre>
    </body>
    </html>
    `, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }); 
    res.render("index.ejs", data);
})

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`)
});