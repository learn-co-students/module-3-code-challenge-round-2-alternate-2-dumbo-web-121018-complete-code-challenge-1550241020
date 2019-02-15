// document.addEventListener("DOMContentLoaded", () => {
//   console.log("loaded")
// })

let courseURL = `https://sheltered-stream-73510.herokuapp.com/users/137/courses`
let studentForm = document.querySelector("#student-form")



fetch(courseURL)
.then(res => res.json())
//returns all course objects
// .then(console.log)
.then(courses => courses.forEach(specificCourse))


function specificCourse(course) {
  //each specifc course
  // console.log(course)
  //find location for listing courses
  // console.log(document.querySelector("#course-container"))
  let courseList = document.querySelector("#course-container")
  courseList.innerHTML += `
    <h3>${course.name}</h3>
    <h3>${course.instructor}</h3>
    <h3>${course.semester}</h3>
    <button data-id="${course.id}" id="see-detail" class="detail-btn">See Detail</button>
    `
}

document.addEventListener("click", (e) => {
  // console.log(e.target)
  if (e.target.className === "detail-btn") {
    // console.log(e.target.className)
    singleCourse(e)
 }
  else if(e.target.className === "edit-btn") {
    // console.log(e.target.className)
    updateStudent(e)
  }
})
function singleCourse(e) {
  // console.log(e.target.dataset.id)
  let courseID = e.target.dataset.id
  // console.log(courseID)
  fetch(`${courseURL}/${courseID}`)
  .then(res => res.json())
  // .then(console.log)
  .then(displayCourseProfile)
}

function displayCourseProfile(course) {
  // console.log(course)
  // console.log(courseDetail)
  course.students.forEach(displayStudent)
}

  function displayStudent(student) {
    // console.log(student)
    let courseDetail = document.querySelector("#course-detail")
    courseDetail.innerHTML += `

    <li data-id ="${student.id}" class="list-students">Student Name: ${student.name}</li>

      <h3>Class Year: ${student.class_year}</h3>
      <h3>Percentage: ${student.percentage}</h3>
      <button data-id="${student.id}" id="edit-percentage" class="edit-btn">Edit</button>
    </li> `
  }

// function updateStudent(e) {
//   console.log(e.target.dataset.id)
//   let id = e.target.dataset.id
//   let percentage = document.querySelector("percentage-${percentage.id}").value
//   fetch(`${courseURL}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         percentage: percentage
//       })
//     })
//     .then(res => res.json())
// 
//   }
// }

//need to find percengtage location to edit the text for the percentage box
//using the dataset - id and value for percentage so i can update
//if i had more time i know what needs to be done
