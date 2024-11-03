### File upload and retrieval is a key part of many web applications and is something every developer is going to need to implement at some point. Uploading files might seem complex at first, but with the right tools and frequent testing, it’s easier than you think.

### Project Setup

### We’re going to accomplish this using node.js for our backend and Postgres for our database. We will take advantage of a couple of packages to help us.

### Run the following command in your terminal to install the packages we need for this exercise.

```bash
npm init -y
npm i express sequelize sequelize-cli multer

```

### Here’s a little bit about each package as well as a link to its documentation

### Express — Fast, unopinionated, minimalist web framework for Node.js. Express makes developing Node.js web applications and APIs fast and easy.

### Sequelize.js — a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. Sequelize allows us to create relationships between our Models as Rails does in a Ruby app.

### Sequelize-CLI — a command-line interface for performing some common sequelize operations. Makes life easy when trying to roll back migrations, undo seed files, etc.

### Multer — a node.js middleware for handling multipart/form-data, primarily for uploading files. Multer is the star of the show here and makes getting files quick and easy during the request-response cycle.

### To focus specifically on the image upload portion of this exercise, I’m going to gloss over some parts of setting up the express server, routes, and Sequelize migration and model files. I covered this in another blog if you’d like to walk through putting it together.

### Connect a Relational DB and Backend with Node.js, Sequelize, PostgreSQL

### A Flatiron School instructor once told me that when learning a new language, library, or framework it helps to build a…

### medium.com

### A Quick Summary of our App so far

### We have two models, User, and Project.

### Each Project belongs to a User and a User has many Projects.

### Our User model has the following attributes (from the /models/user.js file):

```js
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);
```

and our Project model looks like this

```js
Project.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Project",
  }
);
```

### We would like to add an image to each of our projects. There are two ways to do this. I’m going to focus on the easier of the two right now, and come back with a refactored version in next week’s post.

### Today we are going to add some attributes to our Project which will represent the image we are uploading when creating a project. Next week, we will create a file model and extrapolate this logic.

### First, we are going to need to add some attributes to our Project and make sure their tables are changed in the DB.

### The sequelize-cli is a fast way to roll back the migrations and then update them after editing the Project model

```bash
npx sequelize-cli db:migrate:undo:all
```

### this will rollback our migrations to the beginning so we can make changes to our Project model then integrate them into the DB.

### The changes to our Project model’s attributes look like this:

```js
Project.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    // add the lines below
    imageType: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageData: DataTypes.BLOB("long"),
    //add the lines above
  },
  {
    sequelize,
    modelName: "Project",
  }
);
```

### We added the different image information we will need to store in our database in order to upload it to Postgres in a format Postgres is happy with.

### Next, we adjust our controller action, createProjectso we can now store these new attributes. Before we do this I’m going to explain a little Multer magic, so you know what’s going on under the hood.

### When we send our multipart/form-data Multer is going to create a req.body with our text fields and a req.file with the file when we send our form.

### We will pick apart these two pieces of the request to create our Project instance. In our /controllers/projects.controller.js:

```js
const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.body.userId,
      //add the lines below
      imageType: req.file.mimetype,
      imageName: req.file.originalname,
      imageData: req.file.buffer,
      //add the lines above
    });
    return res.status(201).json({ project });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
```

### Our new and improved createProject function is going to now store our file’s information inside the Project object. If we run a test in insomnia we can see we are creating the right Project now.

### The imageDataobject contains a buffer. Buffers are arrays of information stored in the DB to represent a file. We are going to convert this buffer to a string when retrieving it from the database in order to render our image on the front end

### Let’s do that now.

### Retrieving your image from the DB

### Making a GET request to the backend will now need one additional step. When retrieving the image we are going to convert the buffer into a base64 string. This format will be readable by our <img> tag, a buffer is not.

### Here’s our new and improved getAllProjects method in the /controllers/projects.controller.js file.

```js
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "createdBy",
        },
      ],
    })
      .then((projects) => {
        projects.map((project) => {
          const projectImage = project.imageData.toString("base64");
          project["imageData"] = projectImage;
        });
        return projects;
      })
      .then((projects) => {
        return res.status(200).json({ projects: projects });
      });
  } catch (error) {
    return res.status(500).send(error.mesage);
  }
};
```

### JavaScript has a built-in toString() method for our buffer and we will take advantage of it. We then reassign our key imageData to be that newly acquired string. If we run a get request in insomnia we should be getting back something like this:

```js
"projects": [
{
"id": 3,
"title": "\"project created with image test\"",
"description": "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt metus ipsum, id dictum quam eleifend quis. Sed ipsum odio, rutrum eget tincidunt ut, sollicitudin at nisi. Praesent dictum leo vitae lorem dictum, sit amet euismod orci euismod. Nam felis leo, fringilla ac mollis at, rhoncus ut augue. Etiam nunc mauris, fringilla vel fringilla in, aliquam at dolor. Morbi eget orci et libero laoreet pellentesque. Donec id feugiat massa, ut vestibulum ante.\"",
"userId": 1,
"imageType": "image/png",
"imageName": "Rectangle.png",
"imageData": "<A HUGE STRING OF RANDOM NUMBERS AND LETTERS
REPRESENTING OUR IMAGE>",
"createdAt": "2020-11-03T23:20:58.529Z",
"updatedAt": "2020-11-03T23:20:58.529Z",
"createdBy": {
"id": 1,
"firstName": "Testing",
"lastName": "Project with Image",
"createdAt": "2020-11-03T23:20:53.415Z",
"updatedAt": "2020-11-03T23:20:53.415Z"
}
}
]
}
```

### Our imageData buffer has been replaced with a base64 string encoding our image which we can now read from an img tag.

### To render our information on the front end we need to use this syntax:

### make sure your image format is correct.

```html
<!-- For jpeg -->
<img src="data:image/jpeg;base64, <YOUR BASE64 STRING>" alt="Alt Text" />
<!-- For png -->
<img src="data:image/png;base64, <YOUR BASE64 STRING>" alt="Alt Text" />
```

### Congrats!! You’ve added Images to your DB and brought them back again as well!

### Next Week I’ll share a refactored version of this idea with an Image model to help extrapolate some of the logic and make it reusable for the next part of this application.
