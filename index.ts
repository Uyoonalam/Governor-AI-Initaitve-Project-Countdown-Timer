#!/usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

let ans = await inquirer.prompt({
    type: "number",
    name: "a",
    message: "Please enter time in seconds",
    validate: (startTime) => {
        if (isNaN(startTime)) {
            return "Please enter a valid number";
        } else if (startTime > 60) {
            return "Seconds must be less than or equal to 60";
        } else {
            return true;
        }
    }
});

let inp = ans.a;

console.log("Starting timer for", inp, "seconds.");

function startTime(interval:number) {
    let time = new Date().setSeconds(new Date().getSeconds() + interval);
    let date = new Date(time);
    let intervalId = setInterval(() => {
        let currentTime = new Date();
        let timeDiff = differenceInSeconds(time, currentTime);
        if (timeDiff <= 0) {
            clearInterval(intervalId);
            console.log("Time's up");
        }

        let minute = Math.floor((timeDiff % (3600 * 23)) / 3600);
        let sec = Math.floor(timeDiff % 60);
        console.log(minute.toString().padStart(2, "0"), ":", sec.toString().padStart(2, "0"));
    }, 1000);
}

startTime(inp);