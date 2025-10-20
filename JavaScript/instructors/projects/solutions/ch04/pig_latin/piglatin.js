"use strict";

let again = "y";
while(again == "y") {
    let userInput = prompt("Enter text: ");

    // if user didn't enter anything, prompt again. If user clicked Cancel, end loop
    if (userInput == "") {
        continue;
    } else if (userInput == null) {
        break;
    }

    // make lowercase
    userInput = userInput.toLowerCase();

    // remove punctuation
    userInput = userInput.replaceAll(".","");
    userInput = userInput.replaceAll(",","");
    userInput = userInput.replaceAll("!","");

    // convert user input to array of words and declare a vowels array
    const words = userInput.split(" ");
    const vowels = ["a","e","i","o","u"];
    
    // loop each word in the words array
    for (let i in words) {
        // get word and set a Boolean flag
        const word = words[i];
        let startsWithConsonant = true;

        // process words that start with a vowel
        const firstLetter = word.substring(0, 1);
        if (vowels.includes(firstLetter)) {
            words[i] = word + "way";
            startsWithConsonant = false
        }

        // process words that start with a consonant
        if (startsWithConsonant) {
            // add 'y' to vowels array
            vowels.push("y");

            // get index of first vowel
            let firstVowelIndex = -1;
            for (let i in word) {  
                const letter = word[i];
                if (vowels.includes(letter)) {
                    firstVowelIndex = i;
                    break;
                }
            }
            
            // remove all letters that come before the first vowel
            const beforeFirstVowel = word.substring(0, firstVowelIndex);
            words[i] = word.replace(beforeFirstVowel, "");

            //append letters that come before first vowel and 'ay' 
            words[i] += beforeFirstVowel + "ay";

            // remove 'y' from vowels array 
            vowels.pop();
        }
    }
    
    alert("Pig Latin Translator\n\n" +
        "Entered text: " + userInput + "\n" +
        "Pig Latin: " + words.join(" "));

    again = prompt("Continue? (y/n): ", "y");
}