// ACCEPTANCE CRITERIA
        // https://www.youtube.com/watch?v=XF1_MlZ5l6M

    // WHEN I answer each prompt
    // THEN my input should be validated and at least one character type should be selected

    // WHEN all prompts are answered
    // THEN a password is generated that matches the selected criteria

    // WHEN the password is generated
    // THEN the password is either displayed in an alert or written to the page

/////////////////////
// Global Variables 
////////////////////

    var generateBtn = document.querySelector("#generate");

    // Prompts
    var pwdLength = Number(window.prompt("Type the length of the password to generate:", ""));
    var numberRangeYN = window.prompt("Should the password include numbers?", "");
    var lcAlphabetYN = window.prompt("Should the password include lowercase letters?", "");
    var ucAlphabetYN = window.prompt("Should the password include uppercase letters?", "");
    var specialCharsYN = window.prompt("Should the password include special characters?", "");
//////////////////////////////////////
// Check for user's password criteria
//////////////////////////////////////
    function checkCriteria(){

        // TESTING
            // console.log("numberRangeYN: " + numberRangeYN);
            // console.log("lcAlphabetYN: " + lcAlphabetYN);
            // console.log("ucAlphabetYN: " + ucAlphabetYN);
            // console.log("specialCharsYN: " + specialCharsYN);

        // Validate at least one of the items is Y
        // TODO: Figure out how to consolidate if stmts
        if ( numberRangeYN.toLowerCase() == "y" ) {
            console.log("Yes, use numbers.");
        } else {
            console.log("No, do not use numbers.");
        };

        if ( lcAlphabetYN.toLowerCase() == "y" ) {
            console.log("Yes, use lowercase characters.");
        } else {
            console.log("No, do not use lowercase characters.");
        };

        if ( ucAlphabetYN.toLowerCase() == "y" ) {
            console.log("Yes, use uppercase characters.");
        } else {
            console.log("No, do not use uppercase characters.");
        };

        if ( specialCharsYN.toLowerCase() == "y" ) {
            console.log("Yes, use special characters.");
        } else {
            console.log("No, do not use special characters.");
        };

        // TODO: Send all Y criteria to generatePassword() function
    }
///////////////////////////////////////
// Create objects for character ranges
///////////////////////////////////////
    const numberRange = { 
        a:0, b:1, c:2, d:3, e:4, 
        f:5, g:6, h:7, i:8, j:9 
    };

    const lcAlphabet = { 
        a:"a", b:"b", c:"c", d:"d", e:"e", 
        f:"f", g:"g", h:"h", i:"i", j:"j",
        k:"k", l:"l", m:"m", n:"n", o:"o",
        p:"p", q:"q", r:"r", s:"s", t:"t",
        u:"u", v:"v", w:"w", x:"x", y:"y",
        z:"z" 
    };

    const ucAlphabet = { 
        a:"A", b:"B", c:"C", d:"D", e:"E", 
        f:"F", g:"G", h:"H", i:"I", j:"J",
        k:"K", l:"L", m:"M", n:"N", o:"O",
        p:"P", q:"Q", r:"R", s:"S", t:"T",
        u:"U", v:"V", w:"W", x:"X", y:"Y",
        z:"Z" 
    };

    const specialChars = { 
        a:"!", b:"@", c:"$", d:"-", e:"_" 
    };

    // TESTING
        // console.log(Object.values(pwdLength));
        // console.log(Object.values(numberRange));
        // console.log(Object.values(lcAlphabet));
        // console.log(Object.values(ucAlphabet));
        // console.log(Object.values(specialChars));

//////////////////////////////////////////
// Function to check the password length
/////////////////////////////////////////

function checkPwdLength() {
    if (pwdLength < 8 || pwdLength > 128) {
        alert("Please choose a length between 8 and 128 characters.");

        if (confirm("Click the OK button to submit a new password length.")){
            pwdLength = Number(window.prompt("Type the length of the password to generate:", ""));

            checkPwdLength(pwdLength);
            
        } else {
            console.log("Cancelled.");
        }
    } else {
        console.log("The Password Length Will Be: " + pwdLength + " Characters.");
    }
}

/////////////////////////////////////////////////
// Check password length until the user clicks 
// the cancel button or enters correct criteria
// Check password criteria
////////////////////////////////////////////////
checkPwdLength(pwdLength);
checkCriteria();

function generatePassword() {

    //  Create a multidimensional array of ranges
    //  REF: https://www.javascripttutorial.net/javascript-multidimensional-array/
        
        var randPassword = randomize(
            pwdLength, 
            // Ranges
            [lcAlphabet.a, lcAlphabet.z],       
            [ucAlphabet.a, ucAlphabet.z],           // TESTING RESULTS
            // [numberRange.a, numberRange.j]       // doesn't like
            ["0","9"]                               // this is okay
            // [specialChars.a, specialChars.e]     // works, but uses range instead of specific special characters indicated in object
        );

    // Create random password from random integers and alphabet
        function randomize(pwdLength, ...ranges) {
            var str = "";    
            
            // TESTING
                // console.log("Within generatePassword() function. Do I still have the input for password Length? " + pwdLength);
                // console.log("number range object: " + Object.values(numberRange));
                // console.log("lowercase alphabet object: " + Object.values(lcAlphabet));
                // console.log("uppercase alphabet object: " + Object.values(ucAlphabet));
                // console.log("special characters object: " + Object.values(specialChars));
                // console.log("All Ranges? ");  
                // console.log(...ranges);                 
            
            while(pwdLength--) {                                                   

            // Create range length of objects
            var i = Math.floor(Math.random() * ranges.length);   
            
            // Get random item from object's min and max range
            var min = ranges[i][0].charCodeAt(0);                           
            var max = ranges[i][1].charCodeAt(0); 
            var maxChar = Math.floor(Math.random() * (max - min + 1)) + min; 

            // Formulate the random string
            str += String.fromCharCode(maxChar);   
            }
            return str;                                                        
        }

    //  Console Messages
        console.log("randomPassword: " + randPassword);
}

///////////////////////////////////////////////////////////////////
// Add event listener to generate password when button is clicked
//////////////////////////////////////////////////////////////////
generateBtn.addEventListener("click", writePassword, {
    // console.log("#password");
});

/////////////////////////////////////////
// TODO: Write password to the #password input
/////////////////////////////////////////
function writePassword() {
    console.log("randPassword within writePassword function: " + randPassword);
    // var password = generatePassword();
    // console.log("writePassword() function varpassword: " + password);

    // var passwordText = document.querySelector("#password");
    // console.log("writePassword() function varpasswordtext: " + passwordText);

    // passwordText.nodeValue = password; // .value or .nodeValue ???
}

writePassword(randPassword);
