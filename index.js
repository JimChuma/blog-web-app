import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const post = [
    {
        id: 1,
        title: "Setting Clear Goals",
        text: "The first step towards success is to set clear, measurable goals. What do you want to achieve? Whether it's starting a new business, advancing in your career, or improving your health, having specific goals in mind will give you direction and focus. Write down your goals and break them down into smaller, achievable tasks. This will help you stay motivated and track your progress along the way.",
        date: "Posted on: Fri Jan 26 2024"
    },
    {
        id: 2,
        title: "Developing a Positive Mindset",
        text: "Success starts from within. Cultivating a positive mindset is crucial for overcoming challenges and obstacles that may come your way. Practice gratitude, visualization, and affirmations to help you stay focused and optimistic. Surround yourself with positive people who support your goals and believe in your abilities. Remember, success is not just about what you achieve, but how you grow and learn from your experiences.",
        date: "Posted on: Thu Feb 8 2024"
    },
    {
        id: 3,
        title: "Embracing Failure",
        text: "Failure is not the opposite of success; it is part of the journey. Don't be afraid to take risks and try new things, even if it means you may fail. Learn from your mistakes, adjust your course, and keep moving forward. Resilience and perseverance are essential qualities for achieving success in the face of adversity.",
        date: "Posted on: Mon Mar 11 2024"
    },
];

let deletePost = false;
let id = post.length;

app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended: true} ));


app.get("/", (req, res) => {
    res.render("index.ejs", { posts: post.toReversed(), delete: deletePost });
});

app.post("/submit", (req, res) => {
    id++;
    const today = new Date().toDateString();
    const newPost = {
        id: id,
        title: req.body.headline,
        text: req.body.content,
        date: "Posted on: " + today
    }
    post.push(newPost);
    res.redirect("/");
});

app.get("/post/:id", (req, res) => {
    const id = req.params.id;
    const pickPost = post.find(postObject => postObject.id == id);
    res.render("post.ejs", pickPost);
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const pickPost = post.find(postObject => postObject.id == id);
    res.render("edit.ejs", pickPost);
});

app.post("/post-edit", (req, res) => {
    const id = req.body.id;
    const today = new Date().toDateString();
    const postIndex = post.findIndex(postObject => postObject.id == id);
    const editPost = {
        id: id,
        title: req.body.headline,
        text: req.body.content,
        date: post[postIndex].date,
        edit: "Updated on: " + today
    }
    post[postIndex] = editPost;
    res.redirect("/post/" + id);
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const postIndex = post.findIndex(postObject => postObject.id == id);
    post.splice(postIndex, 1);
    deletePost = true;
    res.redirect("/");
});

app.post("/refresh", (req, res) => {
    deletePost = false;
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server is running on ${port}.`)
});