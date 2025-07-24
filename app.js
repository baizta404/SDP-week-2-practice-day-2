const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const recpiesContainer  = document.getElementById("recipies-container");

//fetch recipies
const fetchRecipies = async(searchInput) =>{
    recpiesContainer.innerHTML = `<h1 class="fw-bold text-center">Searcing For Your Item...</h1>`;
    
    const res = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await res.json();
    
    recpiesContainer.innerHTML = ""
    
    data.meals.forEach(meal => {
        
        const recipieDiv = document.createElement('div');
        recipieDiv.classList = "col-md-6 col-lg-4 mb-4";
        recipieDiv.innerHTML = `
            <div id="${meal.idMeal}" class="card shadow-sm h-100">
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

    });
}



searchBtn.addEventListener('click',()=>{
    console.log("button clicked")
    const searchInput = searchBox.value.trim();
    console.log(searchInput);
    fetchRecipies(searchInput)
})