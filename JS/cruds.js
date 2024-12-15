let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
let settingMood = "dark";
let color = document.getElementById("color");
if (localStorage.settingMood) {
    settingMood = localStorage.settingMood;
    saved();
}

// Get Total 
function getTotal(e) {
    if (price.value != '') {
        total.style.background = "green"
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = +result;
    }else {
        total.style.background = "#a00d02";
        total.innerHTML = "";
    }
}
// Creat Product
let dataPro;
if (localStorage.products) {    
    dataPro = JSON.parse(localStorage.getItem("products"))
}else {
    dataPro = [];
}


submit.onclick = () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
// Count 
if (title.value != "" 
    && category.value != "" 
    && price.value != ""
    && count.value <=  100
) {
if (mood == "create") {
    if (newPro.count > 1) {
        for (i = 0;i < newPro.count;i++) {
            dataPro.push(newPro);
        }
    }else {
        dataPro.push(newPro);
    }
}else if (mood == "update") {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
}
clearData();
}
    // Save LocalStorage 
    localStorage.setItem("products", JSON.stringify(dataPro));
    showData();
}
showData();
// save clear Inputs 
function clearData() {
title.value = "";
price.value = "";
taxes.value = "";
ads.value = "";
discount.value = "";
total.innerHTML = "";
count.value = "";
category.value = "";
}
// Read 
function showData() {
    getTotal();
let table = ""; 
for (let i = 0; i< dataPro.length; i++) {
table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
                <button onclick="updateData(${i})" id="update">update</button>
            </td>
            <td>
                <button onclick="deleteData(${i})" id="delete">delete</button>
            </td>
        </tr>
        `
}
let deleteBtn = document.getElementById("deleteAll");
if (dataPro.length > 0) {
deleteBtn.innerHTML = `<button onclick="deleteAll()">delete All(${dataPro.length})</button>`
} else {
    deleteBtn.innerHTML = "";
}
document.getElementById("tbody").innerHTML = table;
}
showData();
// Delete 
function deleteData(i) {
dataPro.splice(i, 1);
localStorage.products = JSON.stringify(dataPro);
showData();
}

function deleteAll() {
    dataPro.splice(0)
    localStorage.products = dataPro;
    showData();
}


// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    total.innerHTML = dataPro[i].total;
    category.value = dataPro[i].category;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display="none";
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scrollTo({
        top:0,
        behavior:"smooth"
    })
}
// Search 
let searchMood = "title";


function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "Title";
    }else {
        searchMood = "category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}


function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'Title') {
                if (dataPro[i].title.includes(value.toLowerCase())){
                    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                </td>
            </tr>
            `
                }
        }else {
                if (dataPro[i].category.includes(value)){
                    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                </td>
            </tr>
            `
                }

        }
    }
    document.getElementById("tbody").innerHTML = table;
}
// Clean Data done

// setting 
let setting = document.getElementById("setting");
function Mood(x) {
        setting.classList.toggle("hidden");
    if (x.classList.contains("hidden")) {
        setting.style.left = "0px";
        setting.style.display = "fixed";
    }
    x.style.cursor = "pointer";
    // x.classList.toggle("dark");
    if (settingMood === "dark") {
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBg", "#ddf");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgI", "#fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgIF", "#fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainCt", "#1ff");
        document.styleSheets[0].cssRules[0].style.setProperty("--btn", "#370fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--btnF", "#6702ff");
        color.style.background = "white";
        settingMood = "white";
    }else {
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBg", "#222");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgI", "#111");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgIF", "#000");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainCt", "#ff1");
        document.styleSheets[0].cssRules[0].style.setProperty("--btn", "#370035");
        document.styleSheets[0].cssRules[0].style.setProperty("--btnF", "#51025f");
        color.style.background = "black";
        settingMood = "dark";
    }
    // if (settingMood == "dark") {
    //     settingMood = "white";
    // }else {
    //     settingMood = "dark";
    // }
    saved();
}
function show(x) {
    setting.classList.toggle("hidden");
        if (x.classList.contains("hidden")) {
            x.style.left = "0px";
            x.style.display = "fixed";
                x.style.cursor = "default"
        }else {
            x.style.left = "-140px";
            x.style.display = "fixed";
            x.style.cursor = "pointer"
        }
}
function saved() {
    localStorage.setItem("settingMood", settingMood);
    if (settingMood === "dark") {
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBg", "#222");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgI", "#111");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgIF", "#000");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainCt", "#ff1");
        document.styleSheets[0].cssRules[0].style.setProperty("--btn", "#370035");
        document.styleSheets[0].cssRules[0].style.setProperty("--btnF", "#51025f");
        color.style.background = "black";
    }else {
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBg", "#ddf");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgI", "#fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainBgIF", "#fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--mainCt", "#1d1");
        document.styleSheets[0].cssRules[0].style.setProperty("--btn", "#370fff");
        document.styleSheets[0].cssRules[0].style.setProperty("--btnF", "#6702ff");
        color.style.background = "white";
    }
}