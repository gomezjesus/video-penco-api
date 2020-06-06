const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    //author: authorSchema,
    authors: [authorSchema],
  })
);

//async function createCourse(name, author) {
async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(id) {
  //   const course = await Course.findById(id);
  //   course.author.name = "Jesus Gomez";
  //   course.save();
  const course = await Course.update(
    { _id: id },
    {
      $set: {
        "author.name": "Penco Mendopa",
      },
    }
  );
}
async function AddAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
//updateAuthor("5ed6dc0d096cbd61a2169a3b");
// createCourse("Node Course", [
//   new Author({ name: "Jesus" }),
//   new Author({ name: "Penco Mendopa" }),
// ]);

//AddAuthor("5ed6df30d1c6d66238120069", new Author({ name: "Camimuuuuu" }));
removeAuthor("5ed6df30d1c6d66238120069", "5ed6e07f8feac8624eae28b1");
