const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* Middleware */

app.use(express.json());
app.use(cors());

/* MongoDB Connection */

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

/* =========================
   Project Schema
========================= */

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    technology: {
        type: String,
        required: true
    }

});

const Project = mongoose.model("Project", projectSchema);

/* =========================
   Contact Schema
========================= */

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    }

});

const Contact = mongoose.model("Contact", contactSchema);

/* =========================
   Routes
========================= */

/* Home Route */

app.get("/", (req, res) => {
    res.send("Portfolio Backend Running");
});

/* =========================
   Add Project
========================= */

app.post("/add-project", async (req, res) => {

    try {

        const newProject = new Project({

            title: req.body.title,
            description: req.body.description,
            technology: req.body.technology

        });

        await newProject.save();

        res.status(201).json({
            message: "Project Added Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Adding Project"
        });

    }

});

/* =========================
   Get All Projects
========================= */

app.get("/projects", async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: "Error Fetching Projects"
        });

    }

});

/* =========================
   Contact Form
========================= */

app.post("/contact", async (req, res) => {

    try {

        const newContact = new Contact({

            name: req.body.name,
            email: req.body.email,
            message: req.body.message

        });

        await newContact.save();

        res.status(201).json({
            message: "Message Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error Sending Message"
        });

    }

});

/* =========================
   Server Start
========================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
