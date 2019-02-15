document.addEventListener("DOMContentLoaded", function() {

const allCoursesURL = "https://sheltered-stream-73510.herokuapp.com/users/139/courses";
const courseContainer = document.querySelector("#course-container")




const getCoursesFetch = () => {
  fetch(allCoursesURL)
  .then(res => res.json())
  .then(data => showObjects(data))
  // .then(data => console.log(data))
  //getting an array back, now to make a function to put each into the course container..
}
// const getCoursesFetch(){
// }

// 'data' is an Array of Objects
// forEach this


const showObjects = (data) => {
  // // console.log('yes') // works
    data.forEach(formatObject)
}
    // console.log(data)
const formatObject = (data) => {
  // debugger
  const courseID = data.id
  const courseName = data.name
  const courseInstructor = data.instructor
  const courseSemester = data.semester

  courseContainer.innerHTML += `<div><p>${courseID}</p>
<p id="pcourseID">${courseName}</p>
<p>${courseInstructor}</p>
<p>${courseSemester}</p>
<button dataset-id=${data.id} class="course-button">See Details</button>
  `
}

// plan: i want to click the detail button (ANY), grab the Course ID.. load up the students whose IDs match the course of the individual button is associated to.
// students fetch

// document.addEventListener("click", function(){
//   document.getElementById("demo").innerHTML = "Hello World";
// });

const showDataDetail = (event) => {
  console.log("this works")
  debugger
  if (event.target.className == "course-button") {
    // console.log('registered button')
    const courseIDBasedOnClick = event.target.previousSibling.previousSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    // mind the long string, i'm trying to grab the ID based off the button click and how many siblings back is the ID.
    // console.log(courseIDBasedOnClick)

    // fetch students based on ID you grabbed
    fetch(`https://sheltered-stream-73510.herokuapp.com/users/139/courses/${courseIDBasedOnClick}`)
    .then(res => res.json())
    .then(data => showStudents(data.students))
    // debugger
    // .then(data => console.log(data.students)) // data.students is now an array of all students .. so now take all students and put on DOM!
  }

  const showStudents = (students) => {
    // // console.log('yes') // works
      students.forEach(formatStudent())
  }

  const formatStudent = (student) => {
    // debugger
    const courseID = student.name

    courseContainer.innerHTML += `<div><p>${courseID}</p>
  <p id="pcourseID">${courseName}</p>
  <p>${courseInstructor}</p>
  <p>${courseSemester}</p>
  <button dataset-id=${data.id} class="course-button">See Details</button>
    `
  }

  // ^^^^^ I wasn't done formatting the above to format the student cause test over! i have students in data.students as an array of objects ready to use!!!


} /// <== THIS IS SHOWDATADETAIL END


const pew = document.addEventListener("click", showDataDetail)






//// CALLS!!
getCoursesFetch()

  /// DOMCONTENTLOADED ENDS
});
