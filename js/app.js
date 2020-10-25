//Get  all sections on the document
const sectionElements = document.getElementsByTagName('section');
/**
1-Create a navbar button for every section dynamically
*/
var navBar= document.querySelector('#navBar');
//Create navbar unordered list only if there is a section in the page
if(sectionElements.length >0){
  list= document.createElement('ul');
  navBar.appendChild(list);
}
//loop over all document's section
for(let x = 0; x < sectionElements.length; x++){
  const navElement = document.createElement('li');
  navElement.classList.add("nav-btn");
  const title = sectionElements[x].querySelector('header').textContent;
  navElement.textContent= title;
  const sectionId = sectionElements[x].id;
  navElement.id= sectionId+ '-btn';
  //Scroll to the related section when navbar button is clicked
  navElement.addEventListener('click', function(){
    const section= document.getElementById(sectionId);
    section.scrollIntoView({behavior: 'smooth'});
  });
  list.appendChild(navElement);
}

/**
2-Highlight every section when its navbar button clicked
*/
//Get all navBar buttons then loop over them
const navButtons = document.querySelectorAll('.nav-btn');
for(const button of navButtons){
  button.addEventListener('click', function(event){
    event.preventDefault();
    //Deactivate the last clicked button
    const prev= document.querySelector('.active');
    if(prev != null)
      prev.className= prev.className.replace(' active','');
    //Activate the new button
    button.className += " active";
    //Get the id of the related section by using the id of navbar button
    const buttonId = button.id;
    const relatedSection= document.getElementById(buttonId.slice(0, buttonId.length-4));
    //Deactivate any active section
    const prevSection= document.querySelector('.active-section');
    if(prevSection != null)
      prevSection.className= prevSection.className.replace(' active-section','');
      //Activate the new section
    relatedSection.className += " active-section";
});
}



/**
3-Create the top button
*/
const myBtn = document.querySelector('#btn');
myBtn.addEventListener('click',function top(){
    document.documentElement.scrollIntoView({block:'start', behavior: 'smooth'});
});
//Listen to the scroll event
window.addEventListener('scroll', function(){
  if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    myBtn.style.display= 'block';
    else
    myBtn.style.display= 'none';
    //Call function that determine which section is viewed and highligh it
    checkViewport();
});

/**
4-Determine which section is viewed and highligh it
*/
function checkViewport(){
  for(const element of sectionElements){
    const sectionId = element.id;
    const relatedButton= document.getElementById(sectionId + '-btn');
    element.className = element.className.replace(' active-section','');
    relatedButton.className= relatedButton.className.replace(' active','');
    //Mesure section's coordinats according to the viewport
    const rect = element.getBoundingClientRect();
    //Get the id of the related button by using the id of the section
    if(rect.top >= 0 && rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth))
    {
      element.className += " active-section";
      relatedButton.className += ' active';
    }
  }
}
