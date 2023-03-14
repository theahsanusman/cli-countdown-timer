import inquirer from "inquirer";
import datepicker from 'inquirer-datepicker-prompt';
inquirer.registerPrompt('datepicker', datepicker);
inquirer.prompt([
    {
        type: 'datepicker',
        name: "dob",
        message: "What's your Date of Birth?",
        format: ['d', '/', 'm', '/', 'yyyy']
    }
]).then(answer => {
    const dob = new Date(answer.dob);
    let countDown = setInterval(() => {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let diff = dob.getTime() - currentDate.getTime();
        if (diff < 0) {
            dob.setFullYear(dob.getFullYear() + 1);
            diff = dob.getTime() - currentDate.getTime();
        }
        if (diff < 1000 * 60 * 60 * 24) {
            console.log(`Happy Birthday!`);
            clearInterval(countDown);
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        console.clear();
        console.log(`You have ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until your birthday!`);
    }, 1000);
});
