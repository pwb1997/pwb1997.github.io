$(document).ready(function () {
    "use strict";

    // COMMANDS
    function clear() {
        terminal.text("Hi there, I'm Puwei.\nIf you are not sure what to do, just start with typing 'about'.\n");
    }

    function about() {
        terminal.append(`Hello, I'm Puwei and I'm a Computer Science and Data Science Student @ NYU Shanghai.
I love traveling, exploring, and making friends with all sorts of people.
Recently, I started learning Interactive Art to get some inspirations.
This repository is created mainly for my recent art work, but some of my previous projects are also included.

To start, type "help" to see the supported commands.
`);
    }

    function contact() {
        terminal.append("Github: pwb1997\nmail: pb1713@nyu.edu\n");
    }

    function help() {
        terminal.append(`Commands:

about          get my basic information
contact        get my email and github
ls             list all my works
cd             enter a work directory
random         randomly enter a work directory
`);
    }

    function ls() {
        var list = "";
        for (var i = 0; i < posts.length; i++) {
            list += i + 1;
            list += ". ";
            if (i < 9) {
                list += " ";
            }
            list += posts[i].name + "\n";
        }
        list += `
Hint: to enter a directory, use 'cd' command with an index.
For example, 'cd 1' will take you to 'Dirty Instrument'.
Alternatively, 'random' command will take you to a random directory.
`;
        terminal.append(list);
    }

    function cd(args) {
        if (!(/^\+?(0|[1-9]\d*)$/.test(args)) || args > posts.length || args < 1) {
            terminal.append("Invalid index, please pick a number from 1 to " + posts.length + "\n");
        } else {
            terminal.append("Opening '" + posts[args - 1].name + "' ... \n");
            window.location.href = "posts/" + posts[args - 1].url + ".html";
        }
    }

    function random() {
        var magicNum = Math.floor(Math.random() * posts.length);
        terminal.append("Opening '" + posts[magicNum].name + "' ...\n");
        window.location.href = "posts/" + posts[magicNum].url + ".html";
    }

    // END COMMANDS

    var terminal = $(".terminal");
    var prompt = "puwei.bao@nyu";
    var path = ">";

    var command = "";
    var commands = [{
        "name": "clear",
        "function": clear
    }, {
        "name": "contact",
        "function": contact
    }, {
        "name": "about",
        "function": about
    }, {
        "name": "help",
        "function": help
    }, {
        "name": "ls",
        "function": ls
    }, {
        "name": "cd",
        "function": cd
    }, {
        "name": "random",
        "function": random
    }];

    var posts = [{
        "name": "Dirty Instrument",
        "url": "dirty-instrument"
    }, {
        "name": "Face Mapping",
        "url": "face-mapping"
    }, {
        "name": "Algorithmic Music",
        "url": "algorithmic-music"
    }, {
        "name": "Stock Tracker",
        "url": "stock-tracker"
    }, {
        "name": "NYU Courses Crawler",
        "url": "nyu-courses-crawler"
    }]

    function processCommand() {
        var isValid = false;

        // Create args list by splitting the command
        // by space characters and then shift off the
        // actual command.

        var args = command.split(" ");
        var cmd = args[0];
        args.shift();

        // Iterate through the available commands to find a match.
        // Then call that command and pass in any arguments.
        for (var i = 0; i < commands.length; i++) {
            if (cmd === commands[i].name) {
                terminal.append("\n");
                commands[i].function(args);
                isValid = true;
                break;
            }
        }

        // No match was found...
        if (!isValid) {
            terminal.append("\ncommand not found\n");
        }

        $("html, body").animate({ scrollTop: $(document).height() }, 200);

        // Clean up.
        command = "";
    }

    function displayPrompt() {
        terminal.append("\n<span class=\"prompt\">" + prompt + "</span> ");
        terminal.append("<span class=\"path\">" + path + "</span> ");
    }

    // Delete n number of characters from the end of our output
    function erase(n) {
        command = command.slice(0, -n);
        terminal.html(terminal.html().slice(0, -n));
    }

    function clearCommand() {
        if (command.length > 0) {
            erase(command.length);
        }
    }

    function appendCommand(str) {
        terminal.append(str);
        command += str;
    }

    $(document).keydown(function (e) {
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // BACKSPACE
        if (keyCode === 8 && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            if (command !== "") {
                erase(1);
            }
        }
    });

    $(document).keypress(function (e) {
        // Make sure we get the right event
        e = e || window.event;
        var keyCode = typeof e.which === "number" ? e.which : e.keyCode;

        // Which key was pressed?
        switch (keyCode) {
            // ENTER
            case 13:
                {
                    terminal.append("\n");
                    processCommand();
                    displayPrompt();
                    break;
                }
            default:
                {
                    appendCommand(String.fromCharCode(keyCode));
                }
        }
    });

    // Display Initial Message
    clear();
    displayPrompt();
});