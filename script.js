//There are a lot of spare console logs used to ensure everything was working properly, I think there is probably a great deal of fine tuning/ simplification I could 

//setting up variables, using const for unchanging arrays, user choice will hold all possible values and generated password will hold the final password
let generateBtn = document.querySelector("#generate");
const lowerCase = ["a", "b" ,"c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" ,"o" ,"p" ,"q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z"];
const upperCase = ["A" ,"B" ,"C" ,"D" ,"E" ,"F" ,"G" ,"H" ,"I" ,"J" ,"K" ,"L" ,"M" ,"N" ,"O" ,"P" ,"Q" ,"R" ,"S" ,"T" ,"U" ,"V" ,"W" ,"X" ,"Y" ,"Z"];
const numbers = [0,1,2,3,4,5,6,7,8,9];
const specialCharacters = ["'","!","@","#","$","%","^","&","*","(",")","_","+","~","`","|","}","{","[","]","\"",":",";","?",">","<",",",".","/","-","="];
let userChoice = [];
let generatedPassword = "";



// this function calls the more heavy hitting function as well as shows the password on the page, the if statement clears the userChoice variable w/o refreshing
function writePassword() {
  if (userChoice.length > 0) {
    userChoice = [];
  }
  let userPassLengthHolder = userInput();
  let userBoolean = userConfirms()
  let password = generatePassword();
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}
// here i made seperate functions for my prompt and confirms so the user would not have to cycle through everything again if only one part is not w/i my edge
function userInput() {
  let userPassLength = window.prompt("Please indicate desired password length: 8-128");

  if (userPassLength < 8 || userPassLength > 128) {
    alert("Value must be between 8-128");
    return userInput();
  }
  console.log(userPassLength);
  return [userPassLength]; //I am unsure why but this array return method was the only way I could get my code to run properly
}
function userConfirms() {
  let userLower = confirm("Do you want lowercase letters in your password?");
  console.log(userLower);

  let userUpper = confirm("Do you want uppercase letters in your password?");
  console.log(userUpper);

  let userNumber = confirm("Do you want numbers in your password?");
  console.log(userNumber);

  let userSpecial = confirm("Do you want special characters in your password?");
  console.log(userSpecial);

  if (!userLower && !userUpper && !userNumber && !userSpecial) {
    alert("At least one must be selected");
    return userConfirms();
  }

  return [userLower, userUpper, userNumber, userSpecial];
}
function generatePassword() {
  // let userPassLengthHolder = userInput();
  userPassLength = userPassLengthHolder[0];
  console.log(userPassLength);

  // let userBoolean = userConfirms();
  console.log(userBoolean);
  userLower = userBoolean[0];
  userUpper = userBoolean[1];
  userNumber = userBoolean[2];
  userSpecial = userBoolean[3];

  if (userLower) {
    userChoice = userChoice.concat(lowerCase);
    console.log(userChoice);
  }
  if (userUpper) {
    userChoice = userChoice.concat(upperCase);
    console.log(userChoice);
  }
  if (userNumber) {
    userChoice = userChoice.concat(numbers);
    console.log(userChoice);
  }
  if (userSpecial) {
    userChoice = userChoice.concat(specialCharacters);
    console.log(userChoice);
  }
// i put my for loop into a function here so the user would not have to input their variables again if the password did not meet the parameters
  function createPassword() {
    if (generatedPassword.length > 0) {
      generatedPassword = "";
    }
    for (let i = 0; i < userPassLength; i++) {
      let randomIndex = Math.floor(Math.random() * userChoice.length);
      let randomCharacter = userChoice[randomIndex];
      generatedPassword = generatedPassword.concat(randomCharacter);
      console.log(generatedPassword);
  }}
  createPassword ();

  if (userLower) {
    // checks generatedPassword if it contains at least one item in lowerCase
    let doesContainLower = lowerCase.some(substring=>generatedPassword.includes(substring));
    console.log(doesContainLower);
    if (!doesContainLower) {
      return createPassword();
    }
  }
  
  if (userUpper) {
    // check generatedPassword if it contains at least one item in upperCase
    let doesContainUpper = upperCase.some(substring=>generatedPassword.includes(substring));
    console.log(doesContainUpper);
    if (!doesContainUpper) {
      return createPassword();
    }
  }
  if (userNumber) {
    // check generatedPassword if it contains at least one item in numbers
    let doesContainNumber = numbers.some(substring=>generatedPassword.includes(substring));
    console.log(doesContainNumber);
    if (!doesContainNumber) {
      return createPassword();
    }
  }
  if (userSpecial) {
    // check generatedPassword if it contains at least one item in specialCharacters
    let doesContainSpecial = specialCharacters.some(substring=>generatedPassword.includes(substring));
    console.log(doesContainSpecial);
    if (!doesContainSpecial) {
      return createPassword();
    }
  }
  return generatedPassword;
}

// ensures function doesnt run until user clicks
generateBtn.addEventListener("click", writePassword);
