const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");

const searchInput=document.querySelector('.search-container input')

const themeChange=document.querySelector('.theme-change');

let allCountriesData;
fetch("https://restcountries.com/v3.1/all ")
  .then((res) => res.json())
  .then((data)=>{
    renderCountries(data)
    allCountriesData=data
  });
                             
  

filterByRegion.addEventListener("change", (e) => {
  //console.log(filterByRegion.value);
  //console.log(e.target.value)
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data){
    countryContainer.innerHTML='';
    data.forEach((country) => {

      const countryCard = document.createElement("a");
      countryCard.href = `/country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");

      const cardHTML = ` <img src="${country.flags.svg}" alt="${
        country.name.common
      } Flag"/>
                           <div class="card-text">
                              <h3 class="card-title">${
                                country.name.common
                              }</h3>
                                  <p><b>Population: </b>${country.population.toLocaleString(
                                    "en-IN"
                                  )}</p>
                                  <p><b>Region: </b>${country.region}</p>
                                  <p><b>Capital: </b>${country.capital}</p>
                           </div>
                      `;

      countryCard.innerHTML = cardHTML;

      countryContainer.appendChild(countryCard);
    });
  
}

searchInput.addEventListener('input',(e)=>{
    //console.log(e.target.value);
    //console.log(allCountriesData);
    const filteredCountries=allCountriesData.filter((country)=>{
       return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderCountries(filteredCountries);
    
})

themeChange.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        themeChange.innerHTML=`<i class="ri-sun-line"></i> &nbsp;&nbsp; Light Mode`;
        localStorage.setItem('theme','dark');
    }
    else{
        themeChange.innerHTML=`<i class="ri-moon-line"></i> &nbsp;&nbsp; Dark Mode`;
        localStorage.setItem('theme','light');
    }
})

window.addEventListener('DOMContentLoaded',()=>{
  const savedTheme=localStorage.getItem('theme');
  if(savedTheme==='dark'){
    document.body.classList.add('dark');
    themeChange.innerHTML=`<i class="ri-sun-line" ></i>&nbsp;&nbsp;Light Mode`;

  }
  else{
   
    themeChange.innerHTML=`<i class="ri-moon-line"></i> &nbsp;&nbsp;Dark Mode`;
  }
});