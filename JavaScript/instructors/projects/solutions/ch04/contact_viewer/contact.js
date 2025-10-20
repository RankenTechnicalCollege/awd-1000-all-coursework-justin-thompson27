"use strict";

const contacts = [
    "1|Scott|scott@murach.com|1-559-555-5555",
    "2|Joel|joel@murach.com|1-409-555-5555",
    "3|Mike|mike@murach.com|1-363-555-5555"
];

const menuString = "COMMAND MENU\n" +
    "list - List all contacts\n" +
    "get # - Get contact with the specified number\n" +
    "exit - Exit program";

while (true) {
    // get command from user
    let command = prompt(menuString, "exit")
    
    // if user enters 'exit' or clicks Cancel, end loop
    if (command == "exit" || command == null) {
        break;
    }

    // remove whitespace and make command lower case
    command = command.trim().toLowerCase();

    // process command
    if (command == "list") {
        let output = "";
        for (let str of contacts) {
            const contact = str.split("|");
            output += `${contact[0]} - ${contact[1]}\n`;
        }
        alert(output);
    } 
    else if (command.startsWith("get ")) {
        const number = command.split(" ")[1];
        let output = `No data for #${number}`;  // default output
        for (let str of contacts) {
            if (str.startsWith(number)) {
                const contact = str.split("|");
                output = "Contact info for " + contact[1] + "\n";
                output += "Email: " + contact[2] + "\n";
                output += "Phone: " + contact[3];
            }
        }
        alert(output);
    } else {
        alert("Invalid command");
    }
}