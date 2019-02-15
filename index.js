// document.addEventListener("DOMContentLoaded", () => {
//   console.log("hello")
// })


const urlID = `138`
const courseURL = `https://sheltered-stream-73510.herokuapp.com/users/${urlID}/courses`
const studentURL = `https://sheltered-stream-73510.herokuapp.com/users/138/students`

fetch(courseURL)
.then(res => res.json())
.then(courses => courses.forEach(displayCourse))

function displayCourse(course) {
  const courseContainer = document.querySelector("#course-container")
  courseContainer.innerHTML += `
    <h2 data-id="${course.id}">${course.name}</h2>
    <h3 data-id="${course.id}">${course.instructor}</h3>
    <p data-id="${course.id}">${course.semester}</p>
    <button data-id="${course.id}" class="see-details-btn">See details</button>
    <br> <br> <br>
  `
}

document.addEventListener("click", (e) => {
  if (e.target.className === "see-details-btn"){
    showStudentList(e)
  }
  else if (e.target.className === "list-of-students"){
    showStudentProfile(e)
  }
  else if (e.target.className === "edit-percentage-btn"){
    changePercentage(e)
  }
})

function showStudentList(e) {
  const id = e.target.dataset.id
  fetch(`${courseURL}/${id}`)
  .then(res => res.json())
  .then(data => data.students.forEach(displayStudent))
}

function displayStudent(student) {
  // console.log(student)
  const courseDetail = document.querySelector("#course-detail")
  courseDetail.innerHTML += `
  <li data-id="${student.id}" class="list-of-students">
    ${student.name} ${student.percentage}
  </li>
  `
}


function showStudentProfile(e) {
  const id = e.target.dataset.id
  fetch(`${studentURL}/${id}`)
  .then(res => res.json())
  .then(student => displayProfile(student))
}


function displayProfile(student) {
  const studentForm = document.querySelector("#student-form")
  studentForm.innerHTML = `
    <h2> ${student.name} </h2>
    <h3> ${student.class_year} </h3>
    <p> ${student.percentage} </p>
    <textarea id="edit-${student.id}"> ${student.percentage} </textarea>
    <button class="edit-percentage-btn" data-id="${student.id}"> edit </button>
  `
  // let percentage = document.querySelector(`textarea#edit-${student.id}`).value
}

function changePercentage(e) {
  const id = e.target.dataset.id
  let percentage = document.querySelector(`textarea#edit-${id}`).value
  fetch(`${studentURL}/${id}`,{
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      percentage: percentage
    })
  })
  .then(res => res.json())
  // .then(displayProfile)
  .then(routingMethod)
}


function routingMethod(data) {
  displayStudent(data) // didnt have enough time to update list
  displayProfile(data)
}
