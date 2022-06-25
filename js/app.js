//Variables
const courses = document.getElementById("courses-list");
shoppingCart = document.querySelector("#cart-content tbody");
clearCart = document.querySelector("#shopping-cart");

//EventListeners
eventlisteners();

function eventlisteners() {
  courses.addEventListener("click", buyCourse);
  clearCart.addEventListener("click", clearCartBtn);
  shoppingCart.addEventListener("click", ShopCartRmval);
  document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}

//Functions

function buyCourse(e) {
  e.preventDefault();

  if (e.target.classList.contains("add-to-cart")) {
    const course = e.target.parentNode.parentNode;

    getCourseInfo(course);
  }
}

function getCourseInfo(course) {
  const courseInfo = {
    image: course.querySelector(".course-image").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector(".add-to-cart").getAttribute("data-id"),
  };

  addCourseInfo(courseInfo);
}

function addCourseInfo(course) {
  const courseRow = document.createElement("tr");

  courseRow.innerHTML = `
    <tr>
    <td><img src=${course.image} style=width:100px;></td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td><a href=# class=remove data-id=${course.id}>X</a></td>
    </tr>
  `;

  // adding into Shopping cart
  shoppingCart.appendChild(courseRow);

  //adding the cart into local Storage
  saveIntoLocalStorage(course);
}

function saveIntoLocalStorage(course) {
  let courses = getCartIntoStorage();

  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
}

function getCartIntoStorage() {
  let courses;

  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}

function clearCartBtn(e) {
  e.preventDefault();

  if (e.target.classList.contains("button")) {
    shoppingCart.remove();
  }
}

function ShopCartRmval(e) {
  e.preventDefault();
  let course, courseid;
  // Removal from DOM
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();

    course = e.target.parentElement.parentElement;
    courseid = course.querySelector("a").getAttribute("data-id");
  }
  //Removal from local storage
  removeCourseLocalStorage(courseid);
}

function removeCourseLocalStorage(id) {
  //get local storage data
  let coursesLS = getCartIntoStorage();

  //Looping thru and use of index for removal
  coursesLS.forEach(function (courseLS, index) {
    if (courseLS.id === id) {
      coursesLS.splice(index, 1);
    }
  });

  // Add the rest of the array
  localStorage.setItem("courses", JSON.stringify(coursesLS));
}

function getFromLocalStorage() {
  let courseLS = getCartIntoStorage();

  courseLS.forEach(function (course) {
    const courseRow = document.createElement("tr");

    courseRow.innerHTML = `
      <tr>
      <td><img src=${course.image} style=width:100px;></td>
      <td>${course.title}</td>
      <td>${course.price}</td>
      <td><a href=# class=remove data-id=${course.id}>X</a></td>
      </tr>
    `;

    // adding into Shopping cart
    shoppingCart.appendChild(courseRow);
  });
}

/*
  function clearLocalStorage() {
  localStorage.clear();
} 
*/
