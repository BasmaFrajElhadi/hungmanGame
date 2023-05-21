//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//get array of letters 
let lettersArray = Array.from(letters);

//select letters container
let lettersContainer = document.querySelector('.letters');

//generate letters 
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");
    //create letter text node
    let theLetter = document.createTextNode(letter);
    //append letter to the span
    span.appendChild(theLetter);
    // add class on the span
    span.className = 'letter-box';
    //append span to letter container
    lettersContainer.appendChild(span);
});

//object of words and categories
const words ={
    programming :["php","CSS","javaScript","go","python","scala","SQL"],
    movies : ["The Shawshank Redemption","The Godfather","The Dark Knight ","Angry Men","Schindler's List"],
    people : ["Johnny Depp","Arnold Schwarzenegger","Jim Carrey","Emma Watson"],
    countries : ["Libya","Bahamas","Cuba","Egypt","Germany"]
}

//get random property
let allKeys = Object.keys(words);

//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

//set category info
document.querySelector('.game-info .category span').innerHTML = randomPropName;

//select letters guess element
let letterGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array 
let lettersAndSpace = Array.from(randomValueName);
//create spans depend on word
lettersAndSpace.forEach(letter =>{
    //create empty span 
    let emptySpan = document.createElement("span");
    //if letter is space
    if(letter == ' '){
        // add class to span 
        emptySpan.className = 'white-space';
    }
    //append spans to the guess letter container
    letterGuessContainer.appendChild(emptySpan);
});
//set wrong attempts
let wrongAttempts = 0;
//select the draw element 
let theDraw = document.querySelector(".hangman-draw");
//select guess spans
let guessSpans = document.querySelectorAll('.letters-guess span');

//handle clicking on letters
document.addEventListener("click",(e)=>{
    //set the chose status 
    let theStatus = false;
    //check if the element clicked is the letter 
    if(e.target.className === 'letter-box'){
        e.target.classList.add('clicked');
        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase(); 
        //get choosing word
        let theChoosingWord = Array.from(randomValueName.toLowerCase()); 
        //search for letter in choosing word
        theChoosingWord.forEach((wordLetter , wordIndex)=>{
            if(wordLetter === theClickedLetter){
                //set status to correct 
                theStatus = true;
                //loop on all guess spans
                guessSpans.forEach((span , spanIndex)=>{
                    if(spanIndex == wordIndex){
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        //if choosing wrong letter
        if(!theStatus){
            //increase the wrong attempts
            wrongAttempts++;
            //add class wrong on the Draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            //play fail sound
            document.getElementById('fail').play();
            //max number of attempts is 8
            if(wrongAttempts === 8){
                endGame();
                //disable letters
                lettersContainer.classList.add("finished");
            }
        }else{
             //play success sound
            document.getElementById('success').play();
        }
    
    }
});



function endGame(){
    //create popup
    let div = document.createElement("div");
    //create text 
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueName}`);
    //Append text to Div
    div.append(divText);
    //Add Class On Div
    div.className = 'popup';
    //append to body
    document.body.appendChild(div);

}
