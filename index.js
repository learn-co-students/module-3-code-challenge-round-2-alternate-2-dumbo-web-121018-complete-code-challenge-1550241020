document.addEventListener("DOMContentLoaded", function() {
  courseContainer = document.querySelector('#course-container')
  courseDetail = document.querySelector('#course-detail')
  studentForm = document.querySelector('#student-form')
  let ul;
  fetch('https://sheltered-stream-73510.herokuapp.com/users/141/courses')
    .then(res => res.json())
    .then(courses => {
      courses.forEach(course => {
        courseContainer.innerHTML += `<p data-id='${course.id}' class="name">${course.name}</p>
        <p class="instructor">${course.instructor}</p>
        <p class='semester'>${course.semester}</p>
        <button class='see-detail-btn'>See Detail</button>`
        // console.log(courseContainer)
      })
    })

    courseContainer.addEventListener('click', e => {
      if (e.target.classList.contains('see-detail-btn')) {
        let id = e.target.previousElementSibling.previousElementSibling.previousElementSibling.dataset.id
        fetch(`https://sheltered-stream-73510.herokuapp.com/users/141/courses/${id}`)
          .then(res => res.json())
          .then(course => {
            // console.log(course.students)
            ul = document.createElement('ul')
            courseDetail.append(ul)
            // console.dir(ul)
            // debugger
            course.students.forEach(student => {
              const li = document.createElement('li')
              li.dataset.id = `${student.id}`
              li.innerText = `${student.name} ${student.percentage}`
              ul.append(li)
              // console.log(courseDetail)
            })
          })
          ul.remove()
      }
    })
    courseDetail.addEventListener('click', e => {
      e.preventDefault()
      let studentId = e.target.dataset.id
      fetch(`https://sheltered-stream-73510.herokuapp.com/users/141/students/${studentId}`)
      .then(res => res.json())
      .then(student => {
        studentForm.innerHTML = `<p>${student.name}</p>
        <p>${student.class_year}</p>
        <p>${student.percentage}</p>
        <input text="Percentage" placeholder="${student.percentage}"><button class='edit-button'>Edit</button>`
        console.log(studentForm)
      })
    })
});
