import {readFile} from "fs/promises";

try {
    const names = await readFile("names.txt", "utf8");
    console.log(names);
} catch(e) {
    console.log(e.message);
}
