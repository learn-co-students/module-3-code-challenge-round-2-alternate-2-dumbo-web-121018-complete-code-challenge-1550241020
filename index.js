document.addEventListener("DOMContentLoaded", function() {
  console.log("Read the readme :)")
  const courseContainer = document.querySelector("#course-container")
  const courseDetail = document.querySelector("#course-detail")
  const studentForm = document.querySelector("#student-form")
  let studentClassYear;
  let studentPercentage;


  function sideInfo() {
    fetch("https://sheltered-stream-73510.herokuapp.com/users/136/courses")
    .then(res => res.json())
    .then(courses => {
      courses.forEach(course => {
        courseContainer.innerHTML += `
        <p class="course_name">${course.name}</p>
        <p class="course_instructor">${course.instructor}</p>
        <p class="course_semester">${course.semester}</p>
        <button data-id="${course.id}" class="see_detail_btn">See Details</button>
        `
      })
    })
  }

  function seeDetails() {
    const seeDetails = document.querySelector(".see_detail_btn")
    courseContainer.addEventListener("click", event => {
      if(event.target.classList.contains("see_detail_btn")) {
        // console.log(event.target.dataset.id)
        fetch(`https://sheltered-stream-73510.herokuapp.com/users/136/courses/${event.target.dataset.id}`)
        .then(res => res.json())
        .then(students => {
          courseDetail.innerHTML = ""
          students.students.forEach(student => {
            courseDetail.innerHTML += `
              <li class="student_name" id="${student.percentage}" data-id="${student.id}">${student.name} ${student.percentage}</li>
            `
            // found you bug its only saving last student info
            // found temporary fix but need to refactor after code challenge
            studentClassYear = student.class_year
            studentPercentage = student.percentage
          })
        })
      }
    })
  }

  function editStudent() {
    const studentName = document.querySelector(".student_name")
    courseDetail.addEventListener("click", event => {
      if(event.target.classList.contains("student_name")) {
        const foundStudent = event.target.dataset.id
        studentForm.innerHTML = `
          <div class="edit_student_form">
            <h1>${event.target.innerText}</h1>
            <p class="student_year">${studentClassYear}</p>
            <p class="student_percentage">${event.target.id}</p>
            <label>Percentage</label>
            <input type="text" value="${event.target.id}" class="new_percent"></input>
            <button class="edit_btn" data-id="${foundStudent}">Edit Button</button>
          </div>
        `
        editPercentage()
      }
    })
  }

  function editPercentage() {
    studentForm.addEventListener("click", event => {
      if(event.target.classList.contains("edit_btn")) {
        const newPercent = document.querySelector(".new_percent").value
        const foundStudent = event.target.dataset.id
        const percentage = newPercent
        fetch(`https://sheltered-stream-73510.herokuapp.com/users/136/students/${foundStudent}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            percentage
          })
        })
        .then(res => res.json())
        .then(per => {
          const studentPercentage = document.querySelector(".student_percentage")
          studentPercentage.innerText = percentage
        })
      }
    })
  }

  sideInfo()
  seeDetails()
  editStudent()
});

// seems to persist and renders pessimistic
// needs a lot of refactoring

// Thanks for teaching us JS Jane, Ryan, and Graham!
