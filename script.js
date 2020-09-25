// Assigns generateBtn to the DOM object with ID generate
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button which was pulled above. calls function showModal when clicked.
generateBtn.addEventListener("click", showModal);

// Assigns generateFinalBtn to the Modal generate password button
var generateFinalBtn = document.querySelector("#finalPasswordGenerator");
// Add event listener to Modal generate password button, calls generatePassword on click
generateFinalBtn.addEventListener("click", generatePassword);
// Assigns continueBtn to the continue button on first modal
var continueBtn = document.querySelector("#continue-button");
// onclick of continueBtn, calls nextModal function which advances to the next modal
continueBtn.addEventListener("click", nextModal)

var specialChars = ["!","\"","#","$","%","&","'","(",")","*","+",",",".","/",":",";","=","~","`","}","|","{","_","^","]","\\","[","@",">","?"];
var upperCaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numbers = ["0","1","2","3","4","5","6","7","8","9"];
var passLength;
// Write password to the #password input field in the HTML
function writePassword(password) {
  var passwordText = document.querySelector("#password");
  passwordText.innerHTML=password;
}


function showModal (){
  $('#passwordGeneratorModal').modal('show');
}

// This is the function that gets called when the final generate password button (on the second modal) gets clicked.
function generatePassword() {
  var useSpecials = document.querySelector("#useSpecialsCheck").checked;
  var useNumbers = document.querySelector("#useNumbersCheck").checked;
  var useUppers = document.querySelector("#useUppersCheck").checked;
  var useLowers = document.querySelector("#useLowersCheck").checked;
  var passLength = document.querySelector("#choosePassLengthSlider").value;
  var preRandomPassword = "";
  $('#passwordLengthModal').modal('hide');

  while (passLength > preRandomPassword.length)
  {

    if (useNumbers && (passLength > preRandomPassword.length)) {
      preRandomPassword += (numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (useSpecials && (passLength > preRandomPassword.length)) {
      preRandomPassword += (specialChars[Math.floor(Math.random() * specialChars.length)]);
    }
    if (useUppers && (passLength > preRandomPassword.length)) {
      preRandomPassword += (upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]);
    }
    if (useLowers && (passLength > preRandomPassword.length)) {
      preRandomPassword += (lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]);
    }
  }

  var finalPassword = shuffle(preRandomPassword);
  writePassword(finalPassword);
 // Jquery lines that reset the checkboxes every time you generate a password
  $('input[type=checkbox]').prop('checked',false);
  // Jquery lines that triggers an onchange so that the validation logic re-applies.
  $('input[type=checkbox]').trigger("change");
  // Set value of HTML element of ID choosePassLenghtSlider to 68
  document.getElementById("choosePassLengthSlider").value = '68';
  // triggers the "oninput" value of the range slider so that it updates the value in the innerHTMl to default
  $('input[type=range]').trigger("input");
}

function validateInput() {
  var checkCount = 0;
  var isChecked = document.querySelector("#useSpecialsCheck").checked;
  if (isChecked) {
    checkCount++
  }
  isChecked = document.querySelector("#useNumbersCheck").checked;
  if (isChecked) {
    checkCount++
  }
  isChecked = document.querySelector("#useUppersCheck").checked;
  if (isChecked) {
    checkCount++
  }
  isChecked = document.querySelector("#useLowersCheck").checked;
  if (isChecked) {
    checkCount++
  }
   // If checkcount is greater than 0 enable button, disable button below 1.
   // Calls an onchange event in the HTML to accomplish.
  var buttonEnabler = document.querySelector("#continue-button");
  if (checkCount > 0) {
    buttonEnabler.disabled = false;
  }
  else {
    buttonEnabler.disabled = true;
  }
}

function updateSliderValue() {
  passLength = document.querySelector("#choosePassLengthSlider").value;
  var passLengthValue = document.querySelector("#sliderValueDisplay");
  // Sets the value of the HTML element with ID sliderDisplayValue to the value of the html slider with id choosePassLengthSlider
  passLengthValue.innerHTML=passLength;
}

function nextModal() {
  // Jquery line that selects the html element with the ID of passwordGeneratorModal and hides it
  $('#passwordGeneratorModal').modal('hide');
  // Jquery line that shows the second modal with ID passwordLengthModal
  $('#passwordLengthModal').modal('show');
}

// Function that shuffles the contents of a string and returns the same string scrambled.
function shuffle(string) {
  var arr = string.split('');           // Convert String to array
  arr.sort(function() {
    return 0.5 - Math.random();
  });
  string = arr.join('');                // Convert Array to string
  return string;                        // Return shuffled string
}