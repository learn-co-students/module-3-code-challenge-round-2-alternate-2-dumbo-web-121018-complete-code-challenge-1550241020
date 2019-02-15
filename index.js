document.addEventListener("DOMContentLoaded", function() {
  fetchMasterList()
  delegateListenerToCourseContainer()
  delegateListenerToCourseDetail()
});

const courseContainer = document.querySelector("#course-container")
let courseDetail = document.querySelector("#course-detail")
const studentForm = document.querySelector("#student-form")
const myURL = "https://sheltered-stream-73510.herokuapp.com/users/140/"

function fetchMasterList(){
  fetch(myURL+`courses`)
  .then(res => res.json())
  .then(courses =>
    courses.forEach(putCoursesOnDom)
  )
}
function putCoursesOnDom(course){
  const wholeCourse = document.createElement("div")
  const courseAttributes = document.createElement("div")
  console.log(course)
  courseAttributes.id = course.id,
  courseAttributes.instructor = course.instructor,
  courseAttributes.name = course.name,
  courseAttributes.semester = course.semester
  courseAttributes.innerHTML =
  `
  <li>${courseAttributes.name}</li>
  <li>${courseAttributes.instructor}</li>
  <li>${courseAttributes.semester}</li>
  <button class="button" data-id=${courseAttributes.id}> See Detail </button>
  `
  wholeCourse.append(courseAttributes)
  courseContainer.append(wholeCourse)
}

function delegateListenerToCourseContainer(){
  courseContainer.addEventListener("click", showCourse)
}

function showCourse(event){
  event.preventDefault()
  const clicked = event.target.dataset.id
  if(event.target.className === "button"){
  fetch(myURL+`courses/`+clicked)
    .then(res => res.json())
    .then(showStudents)
  }
}

function showStudents(course){
  const studentList = course.students
  studentList.forEach(student => {
    console.log(student)
    const kiddie = document.createElement("div")
    kiddie.innerHTML =
    `
    <li class="kiddie" data-id=${student.id}>${student.name} ${student.percentage}</li>
    `
    courseDetail.append(kiddie)
  })
}

function delegateListenerToCourseDetail(){
  courseDetail.addEventListener("click", showStudentForm)
}

function showStudentForm(event,student){
  event.preventDefault()
  const clicked = event.target.dataset.id
  const clickedStudent = event.target.textContent
  console.log(clickedStudent)
  const studentOnForm = document.createElement('div')
  studentOnForm.innerHTML=
  `
  <li>${clickedStudent}</li>
  Percentage <input type="text"><button>Edit</button>
  `
  studentForm.append(studentOnForm)
}
