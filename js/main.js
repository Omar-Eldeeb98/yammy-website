//^ jQuery Auto Complete ...
/// <reference types="../@types/jquery" />;

var datacontainer = document.getElementById("dataContainer");

$(function () {
  $(".loader").fadeOut(500, function () {
    $(".loading").slideUp(800, function () {
      $("body").css("overflow", "auto");
    });
  });
});

// & ================================== function open|close side  nav ===============================================================
function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    400
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  $(".links li")
    .eq(0)
    .animate({ top: 0 }, 300, function () {
      $(".links li")
        .eq(1)
        .animate({ top: 0 }, 300, function () {
          $(".links li")
            .eq(2)
            .animate({ top: 0 }, 300, function () {
              $(".links li")
                .eq(3)
                .animate({ top: 0 }, 300, function () {
                  $(".links li")
                    .eq(4)
                    .animate({ top: 0 }, 300, function () {
                      $(".links li").eq(5).animate({ top: 0 }, 300);
                    });
                });
            });
        });
    });
}

function closeSideNav() {
  let navHeaderTap = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -navHeaderTap,
    },
    400
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 400,
    },
    400
  );
}

closeSideNav();

$(".side-nav-menu i.open-close-icon").on("click", function () {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// & ================================== function open|close side  nav ===============================================================

// & ================================== function get meals   ===============================================================
async function getMeals() {
  document.getElementById("serchSection").innerHTML = "";
  closeSideNav();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  var result = await response.json();

  console.log(result.meals); //^ array of objects 'meals'
  displayMeals(result.meals);
}
getMeals();
// & ================================== function get meals ===============================================================

// & ================================== display meals ===============================================================
function displayMeals(mealsOfArray) {
  let box = " ";

  for (let i = 0; i < mealsOfArray.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${mealsOfArray[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${mealsOfArray[i].strMealThumb}" alt="..." >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${mealsOfArray[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  }

  datacontainer.innerHTML = box;
}

// & ================================== display meals ===============================================================

// & ================================== get and display meals by category ===============================================================
async function getCategories() {
  $(".inner-loading-screen").fadeIn(300);
  datacontainer.innerHTML = "";
  document.getElementById("serchSection").innerHTML = "";
  closeSideNav();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  var result = response.categories; //^ Array of oblects "categories"
  console.log(result);
  $(".inner-loading-screen").fadeOut(300);
  displayCategories(result);
}

function displayCategories(categoriesArray) {
  let box = "";

  for (let i = 0; i < categoriesArray.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  categoriesArray[i].strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      categoriesArray[i].strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${categoriesArray[i].strCategory}</h3>
                        <p>${categoriesArray[
                          i
                        ].strCategoryDescription.substring(0, 70)}</p>
                    </div>
                </div>
        </div>
        `;
  }

  datacontainer.innerHTML = box;
}

// & ================================== get and display meals by category  ===============================================================

// & ================================== get and display meals by Area  ===============================================================

async function getArea() {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  document.getElementById("serchSection").innerHTML = "";
  closeSideNav();

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  var result = respone.meals; //^ Array of oblects "{}"
  $(".inner-loading-screen").fadeOut(300);
  displayArea(result);
}

function displayArea(areaArray) {
  let box = "";

  for (let i = 0; i < areaArray.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${areaArray[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areaArray[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  datacontainer.innerHTML = box;
}
// & ================================== get and display meals by Area  ===============================================================

// & ==================================  display area meals    ===============================================================
async function getAreaMeals(area) {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  var result = response.meals;
  $(".inner-loading-screen").fadeOut(300);
  displayMeals(result);
}
// & ==================================  display area meals ===============================================================

// & ================================== get and display meals by category  ===============================================================
async function getCategoryMeals(category) {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  var result = response.meals;
  $(".inner-loading-screen").fadeOut(300);
  displayMeals(result);
}

// & ================================== get and display meals by category  ===============================================================

// & ================================== get and display INGREDIENTS  ===============================================================
async function getIngredients() {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  document.getElementById("serchSection").innerHTML = "";
  closeSideNav();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  var result = response.meals;
  console.log(result, "👋🏻"); //^ for testing
  $(".inner-loading-screen").fadeOut(300);
  displayIngredients(result.slice(0, 20));
}

function displayIngredients(ingredientArray) {
  let box = " ";

  for (let i = 0; i < ingredientArray.length; i++) {
    box += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  ingredientArray[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingredientArray[i].strIngredient}</h3>
                        <p>${ingredientArray[i].strDescription.substring(
                          0,
                          100
                        )}</p>
                </div>
        </div>
        `;
  }

  datacontainer.innerHTML = box;
}

// & ================================== get and display INGREDIENTS  ===============================================================

// & ================================== get and display INGREDIENTS meals  ===============================================================
async function getIngredientsMeals(ingredients) {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  var result = response.meals;
  console.log(result); //^ for testing
  $(".inner-loading-screen").fadeOut(300);
  displayMeals(result);
}

// & ================================== get and display INGREDIENTS meals  ===============================================================

// & ================================== show search inputs  ===============================================================
function showSearchInputs() {
  closeSideNav();
  datacontainer.innerHTML = "";
  document.getElementById("serchSection").innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 mb-3 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
}
// & ================================== show search inputs  ===============================================================

// & ================================== get and display meals details  ===============================================================

async function getMealDetails(mealId) {
  datacontainer.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  closeSideNav();
  document.getElementById("serchSection").innerHTML = "";

  datacontainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();

  var result = response.meals[0];
  console.log(result, "✅"); //^ for testing
  $(".inner-loading-screen").fadeOut(300);
  displayMealDetails(result);
}

function displayMealDetails(meal) {
  let ingredients = " ";

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");

  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let box = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-outline-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-outline-danger">Youtube</a>
            </div>`;

  datacontainer.innerHTML = box;
}

// & ================================== get and display meals details  ===============================================================

// & ================================== search section  ===============================================================
async function searchByName(term) {
  $(".inner-loading-screen").fadeIn(300);
  closeSideNav();
  datacontainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  var result = response.meals;
  $(".inner-loading-screen").fadeOut(300);
  result ? displayMeals(result) : displayMeals([]);
}

async function searchByFLetter(term) {
  $(".inner-loading-screen").fadeIn(300);
  closeSideNav();
  datacontainer.innerHTML = "";

  term == "" ? (term = "k") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  var result = response.meals;
  $(".inner-loading-screen").fadeOut(300);
  response.meals ? displayMeals(result) : displayMeals([]);
}

// & ================================== search section  ===============================================================

// & ================================== show contact us section  ===============================================================
function showContacts() {
  closeSideNav();
  document.getElementById("serchSection").innerHTML = "";

  datacontainer.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yahoo.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button onclick = "alert('Enabled Successfully 🙏')" id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.add("d-none", "d-block");
    }
  }

  if (
    nameValidation() == true &&
    emailValidation() == true &&
    phoneValidation() == true &&
    ageValidation() == true &&
    passwordValidation() == true &&
    repasswordValidation() == true
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled");
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
// & ================================== show contact us section ===============================================================
