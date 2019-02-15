document.addEventListener("DOMContentLoaded", function() {

// Variables --------------------
  let courseContainer = document.querySelector("#course-container")
  let courseDetail = document.querySelector("#course-detail")
  let studentDetailDiv = document.querySelector("#student-form")


// Show List of Courses (w/ Instructor and Semester) ---------------------------
  fetch("https://sheltered-stream-73510.herokuapp.com/users/146/courses")
    .then(res => res.json())
    .then(data => data.forEach(getCourseOnDom))

  function getCourseOnDom(course) {
    courseContainer.innerHTML += `<div class="course-div" data-id="${course.id}">
    <h3>${course.name}</h3>
    <p>${course.instructor}</p>
    <p>${course.semester}</p>
    <button type="button" name="button" class="see-detail-btn">See Detail</button>
    </div>`
  }

// Fetch Data of Specific Course -----------------------------------------------
  courseContainer.addEventListener('click', fetchCourseData)

  function fetchCourseData(event) {
    if (event.target.className === "see-detail-btn") {
      courseDetail.innerHTML = ""
      let courseId = event.target.parentElement.dataset.id

      fetch(`https://sheltered-stream-73510.herokuapp.com/users/146/courses/${courseId}`)
        .then(res => res.json())
        .then(course => course.students.forEach(displayStudentsForCourse))
    }
  }


// Upon Clicking Specific Course, Show List of Students Taking Course ----------
  function displayStudentsForCourse(student) {

    let studentLi = document.createElement("li")
    studentLi.setAttribute('data-id', `${student.id}`)
    studentLi.innerText = `${student.name} ${student.percentage}%`

    courseDetail.append(studentLi)
  }


// Upon Clicking Specific Student, Show Student's Info in Student Form "div" ---
  courseDetail.addEventListener('click', fetchStudentData)

  function fetchStudentData(event) {
    let studentId = event.target.dataset.id

    fetch(`https://sheltered-stream-73510.herokuapp.com/users/146/students/${studentId}`)
      .then(res => res.json())
      .then(student => showStudentDetails(student))
  }

  function showStudentDetails(student) {
    studentDetailDiv.innerHTML = `<h2>${student.name}</h2>
    Class Year: <p>${student.class_year}</p>
    Percentage: <p id="percentage">${student.percentage}%</p>
    <form class="edit-form" action="index.html" method="patch" data-id="${student.id}">
      <br><input id="percentage-input" type="text" name="percentage" value="">
      <button class="submit-btn" type="submit" name="button">Edit Percentage</button>
    </form>
    `
  }


// Update the Student's Percentage and Optimistically Render New Info ----------
  studentDetailDiv.addEventListener('submit', updateStudentsPercentage)

  function updateStudentsPercentage(event) {
    event.preventDefault();
    let studentId = event.target.dataset.id

    let inputValue = event.target.querySelector("#percentage-input").value
    let studentPercentage = event.target.parentElement.querySelector("#percentage")
    studentPercentage.innerText = inputValue + "%"
    // wont update student's percentage in course's list of students until refresh

    if (event.target.className === "edit-form"){
      // fetchStudentInfo()
      // forgot how to reuse previous fetch while making PATCH request instead

      fetch(`https://sheltered-stream-73510.herokuapp.com/users/146/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          percentage: inputValue
        })
      })
    }
  }

});
