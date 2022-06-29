document.addEventListener('DOMContentLoaded',onPageLoad); //page loads

//Runs on page load;
function onPageLoad (){ 
    displayTheFirstTown()
    getTownList();
}
//Get the first town and display its details.${sameTown.id}
function displayTheFirstTown(){
    fetch('https://collo-b.github.io/LetBIIGuide/db.json')  //fetching the first town details
    .then(response=>response.json())
    .then(townObject=> {
        console.log(townObject.towns)
        const townsArray = townObject.towns
       const firstTown = townsArray.find(town => town.id === 1)
       updateTown(firstTown)
    })
    .catch(error=>console.log(error))
}
//Displaying town details in the mainsection
function updateTown(town){
    document.getElementById('towns-name').textContent = town.name;
    document.getElementById('town-image').src = town.image_url;
    document.getElementById('town-description').textContent = town.description;
    document.getElementById('locationa').src = town.locationa_url;
    document.getElementById('descriptiona').textContent = town.descriptiona;
    document.getElementById('locationb').src = town.locationb_url;
    document.getElementById('descriptionb').textContent = town.descriptionb;
    document.getElementById('locationc').src = town.locationc_url;
    document.getElementById('descriptionc').textContent = town.descriptionc;
    document.getElementById('costs').textContent = town.cost;  
    document.getElementById('costsa').textContent = town.costa;
    document.getElementById('costsb').textContent = town.costb;   
}

//Fetch all towns and display them to unordered list;
function getTownList(){
    fetch('https://collo-b.github.io/LetBIIGuide/db.json')
    .then(response=>response.json())
    .then(towns =>{
           const townList = document.getElementById('towns');
           towns.forEach(town=>{
           let townItem = document.createElement('li');
           townItem.textContent = town.name;
           townItem.addEventListener('click',displayInMain)   // on click,show the details in main section
           townList.appendChild(townItem);
    });
    })
    .catch(error=>console.log(error))
    }


//Display a town in main section
function displayInMain(event){
    const clickedTownName = event.target.textContent;   //Grab the textcontent of the clicked town.
    fetch('https://collo-b.github.io/LetBIIGuide/db.json')                //fetch all towns
    .then(response=>response.json())
    .then(towns=>{
    let sameTown = towns.find(element=>{
                   return element.name === clickedTownName  // check if the name matches the grabbed one.    
        });
        //display in the main section
        updateTown(sameTown)             // calling the function to display in main section
    })
    .catch(error=>console.log(error))
    
    }

    //get user entered reviews and append them to ul
    const reviewForm = document.getElementById('review-form')
    reviewForm.addEventListener('submit',(e)=>{
        e.preventDefault(); 
        const customerReview = document.getElementById('review').value;
        const newReview = document.createElement('li');
        newReview.style.cursor = 'pointer'
        newReview.textContent = customerReview;
        newReview.addEventListener('click',()=>newReview.remove());
        const reviewList = document.getElementById('review-list')
        reviewList.appendChild(newReview);
        reviewForm.reset()
        newReview.addEventListener('click', (event)=>{
            event.preventDefault()
                newReview.remove()
        })
    
        fetch(`https://collo-b.github.io/LetBIIGuide/db.json`)
        .then(response=>response.json())
        .then(towns=>{
            const displayedTownName = document.getElementById('towns-name').textContent;
            let sameTown  = towns.find(element=>{
                return element.name ===  displayedTownName // check if the name matches  that of  the currently displayed town.
        })
        sameTown.reviews.push(customerReview)
        fetch(`https://collo-b.github.io/LetBIIGuide/db.json/${sameTown.id}`,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({"reviews":sameTown.reviews})
        })
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error))    
    }).catch();
    })
