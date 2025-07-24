const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const recpiesContainer = document.getElementById("recipies-container");

//fetch recipies
const fetchRecipies = async (searchInput) => {
  recpiesContainer.innerHTML = `<h2 class="text-secondary fw-bold text-center py-5">Searcing For Your Item...</h2>`;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
  );
  const data = await res.json();

  recpiesContainer.innerHTML = "";

  if (!data.meals) {
    recpiesContainer.innerHTML = `
      <h2 class="text-danger fw-bold text-center py-5">Sorry, this item is not available</h2>
    `;
    return;
  }

  data.meals.forEach((meal) => {
    const recipieDiv = document.createElement("div");
    recipieDiv.classList = "col-md-6 col-lg-4 mb-4";
    recipieDiv.innerHTML = `
            <div id="${meal.idMeal}" class="card shadow-sm h-100 one-meal">
                <div>
                    <img class="card-img" src="${meal.strMealThumb}"/>
                </div>
                <div class="text-center">
                    <h4 class="mt-4 mb-3">${meal.strMeal}</h4>
                    <h6 class="mb-3">Category : ${meal.strCategory}</h6>
                    <h6 class="mb-4">Origin : ${meal.strArea}</h6>
                </div>
            </div>
        `;
    recpiesContainer.append(recipieDiv);

    // individual recipie te press krole details dekhabe
    recipieDiv.addEventListener("click", () => {
      fetchRecipeDetails(meal.idMeal);
    });
  });
};

//ind diye fetch korbo
const fetchRecipeDetails = async (idMeal) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const data = await res.json();
  const meal = data.meals[0];

  let ingredientsList = "<ul>";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
  }
  ingredientsList += "</ul>";

  const modalBody = document.getElementById("details-recipie");
  modalBody.innerHTML = `
    <div class="row mb-3">
        <div class="col-md-6">
            <img src="${meal.strMealThumb}" class="img-fluid mb-3 p-5" />
        </div>
        <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h5>${meal.strMeal}</h5>
            <h6>Ingredients:</h6>
            ${ingredientsList}
        </div>
    </div>
    <div class="row">
            <h6 class="text-center">Instructions:</h6>
            <p>${meal.strInstructions}</p>
    </div>
    
  `;

  // vai eida net tekhe ektu help nisilam clcik krole ase na j tai
  const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  modal.show();
};

searchBtn.addEventListener("click", () => {
  console.log("button clicked");
  const searchInput = searchBox.value.trim();
  console.log(searchInput);
  fetchRecipies(searchInput);
});
