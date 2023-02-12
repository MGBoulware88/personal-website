var project_container = document.getElementById('project-list');
var cards = document.querySelectorAll(".cards");
var screenshots = document.querySelectorAll(".screenshots");
var obj = new Array();

/* Using the GitHub API to get the list of repositories and then populate the project cards with the
information. */
$.getJSON('https://api.github.com/users/tmchuynh/repos?per_page=53', (data) => {
    // console.log(data);
    data.forEach((element) => {


        if (element.fork == false && element.topics.length > 0) {
            $.getJSON(element.languages_url, (data) => {

                populate(element.name, element.pushed_at, Object.keys(data), element);
            })
        }
    })
})

/**
 * It creates a card for each project and populates it with the project's name, languages, last updated
 * date, and a screenshot
 * @param name - The name of the project
 * @param updated - The date the project was last updated
 * @param languages - an array of languages used in the project
 * @param element - the element of the array of objects
 */
function populate(name, updated, languages, element) {
    // console.log(name)

    var card = document.createElement("div");
    card.classList.add("cards");

    addLanguages(languages, card);

    var title = document.createElement("a");
    title.classList.add("title");
    title.setAttribute("href", element.html_url);
    var name_parts = name.replace("-", " ");
    title.innerHTML = name_parts;
    card.appendChild(title);

    // console.log(updated);
    var date = updated.split("T")[0]
    // console.log(date);
    var date_0 = date.split("-");

    var year = date_0[0];
    var month = date_0[1];
    var day = date_0[2];

    // console.log(month, " ", day, " ", year)


    if (checkFileExist("../public/screenshots/" + name + ".png")) {
        var img = document.createElement("img");
        img.classList.add("img-screenshot");
        // img.classList.add("hide");
        img.setAttribute("src", "../public/screenshots/" + name + ".png");
        img.setAttribute("alt", name);
        card.appendChild(img);

        cards.forEach(card => {
            card.addEventListener("mouseover", (e) => {
                screenshots.forEach(imgs => {
                    imgs.classList.remove("hide");
                })

            })

        });
    }

    var date = document.createElement("div");
    date.classList.add("date");

    var subtitle = document.createElement("code");
    subtitle.classList.add("last-updated");
    subtitle.classList.add("mb-0");
    subtitle.innerHTML = "Last updated on:"
    date.appendChild(subtitle);

    var last_updated = document.createElement("code");
    last_updated.innerHTML = month + "/" + day + "/" + year;
    last_updated.classList.add("last-updated");
    last_updated.classList.add("mt-0");
    date.appendChild(last_updated);

    card.appendChild(date);


    project_container.appendChild(card);
}

/**
 * It takes in an array of languages and a card element, and then it creates a div element with the
 * class "d-flex" and "languages_list" and then it creates an icon element with the class "bx" and then
 * it checks if the array of languages is empty, and if it is, it sets the innerHTML of the icon
 * element to a space, and then it checks if the array of languages includes "HTML" and if it does, it
 * creates an icon element with the class "bx" and "bxl-html5" and "html" and then it appends the icon
 * element to the div element, and then it checks if the array of languages includes "Python" and if it
 * does, it creates an icon element with the class "bx" and "bxl-python" and "python" and then it
 * appends the icon element to the div element, and then it checks if the array of languages includes "
 * @param languages - an array of strings that represent the languages used in the project
 * @param card - The card element that the languages will be added to.
 */
function addLanguages(languages, card) {
    var lang_icons = document.createElement("div");
    lang_icons.classList.add("d-flex");
    lang_icons.classList.add("languages_list");

    var icon = document.createElement("i");
    icon.classList.add("bx");
    if (languages.length == 0) {
        icon.innerHTML = " ";
    }
    if (languages.includes("HTML")) {
        var icon2 = document.createElement("i");
        icon2.classList.add("bx");
        icon2.classList.add("bxl-html5");
        icon2.classList.add("html");
        lang_icons.appendChild(icon2);
    }
    if (languages.includes("Python")) {
        var icon3 = document.createElement("i");
        icon3.classList.add("bx");
        icon3.classList.add("bxl-python");
        icon3.classList.add("python");
        lang_icons.appendChild(icon3);
    }
    if (languages.includes("JavaScript")) {
        var icon4 = document.createElement("i");
        icon4.classList.add("bx");
        icon4.classList.add("bxl-javascript");
        icon4.classList.add("javascript");
        lang_icons.appendChild(icon4);
    }
    if (languages.includes("CSS")) {
        var icon5 = document.createElement("i");
        icon5.classList.add("bx");
        icon5.classList.add("bxl-css3");
        icon5.classList.add("css");
        lang_icons.appendChild(icon5);
    }
    if (languages.includes("TypeScript")) {
        var icon6 = document.createElement("img");
        var source = document.createAttribute("src");
        source.value = "./public/icons/typescript.svg";
        icon6.setAttributeNode(source);
        icon6.classList.add("typescript");
        lang_icons.appendChild(icon6);
    }
    if (languages.includes("C#")) {
        var icon7 = document.createElement("img");
        var source = document.createAttribute("src");
        source.value = "./public/icons/csharp.svg";
        icon7.setAttributeNode(source);
        icon7.classList.add("csharp");
        lang_icons.appendChild(icon7);
    }
    if (languages.includes("Java")) {
        var icon9 = document.createElement("i");
        icon9.classList.add("bx");
        icon9.classList.add("bxl-java");
        icon9.classList.add("plain-java");
        lang_icons.appendChild(icon9);
    }
    if (languages.includes("SCSS")) {
        var icon10 = document.createElement("i");
        icon10.classList.add("bx");
        icon10.classList.add("bxl-sass");
        icon10.classList.add("scss");
        lang_icons.appendChild(icon10);
    }
    lang_icons.appendChild(icon);


    card.appendChild(lang_icons);
}

/**
 * It takes a string, finds all the words in it, and capitalizes the first letter of each word
 * @param str - The string to be converted.
 * @returns The first letter of each word is capitalized and the rest of the letters are lowercase.
 */
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

/**
 * It creates an XMLHttpRequest object, sends a HEAD request to the URL, and returns true if the status
 * is not 404
 * @param urlToFile - The URL to the file you want to check.
 * @returns a boolean value.
 */
function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}