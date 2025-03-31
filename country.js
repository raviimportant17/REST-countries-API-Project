const countryName = new URLSearchParams(location.search).get('name')
const flagImage=document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.details-text-container h1')
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.population')

const region=document.querySelector('.region')
const subRegion=document.querySelector('.sub-region')
const capital=document.querySelector('.capital')
const currencies=document.querySelector('.currencies')
const languages=document.querySelector('.languages')
const topLevelDomain=document.querySelector('.top-level-domain')

const borderCountries=document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then(res=>res.json())
.then(([country])=>{
       //console.log(country)
       flagImage.src=country.flags.svg;
       countryNameH1.innerText=country.name.common;
       population.innerText=country.population.toLocaleString('en-IN')
       region.innerText=country.region
       topLevelDomain.innerText=country.tld.join(', ');
        
       if(country.capital){
          capital.innerText=country.capital;
       }
       if(country.nativeName){
           nativeName.innerText=Object.values(country.name.nativeName)[0].common
       }else{
         nativeName.innerText=country.name.common;
       }

       if(country.subregion){
        subRegion.innerText=country.subregion
       }
       if(country.languages){
        languages.innerText=Object.values(country.languages).join(', ');
       }
       
       if(country.currencies){
        currencies.innerText=Object.values(country.currencies)
        .map((currency)=>currency.name)
        .join(', ')
       }
      
       if(country.borders){
          country.borders.forEach((border) => {
             fetch(`https://restcountries.com/v3.1/alpha/${border}`)
             .then((res)=>res.json())
             .then(([borderCountry])=>{
                // console.log(borderCountry)
                 const borderCountriTag=document.createElement('a');
                 borderCountriTag.innerText=borderCountry.name.common;
                 borderCountriTag.href=`country.html?name=${borderCountry.name.common}`
                 console.log(borderCountriTag)
                 borderCountries.append(borderCountriTag);
             })
          });
       }
       }
  )


  const themeChange=document.querySelector('.theme-change');
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