var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

document.getElementById("nameError").style.display = 'none'
document.getElementById("urlError").style.display = 'none'

var container;

if (localStorage.getItem("urlList") == null) {
    container = [];
}
else {
    container = JSON.parse(localStorage.getItem("urlList"));
    displayItem();
}


function submit() 

{

    if (validation()) 
    {
        var site = 
        {
            name: siteName.value,
            url: siteUrl.value
        }
        container.push(site);
        localStorage.setItem("urlList",JSON.stringify(container));
        displayItem();
        document.getElementById("nameError").style.display = 'none';
        clear()
    }

    else {
        if (siteName.value == "" && siteUrl.value == "") {
            document.getElementById("nameError").style.display = 'block'
            document.getElementById("urlError").style.display = 'block'
        }
        else if (siteUrl.value == "") {
            document.getElementById("urlError").style.display = 'block'
        }
        else if (siteName.value == "") {
            document.getElementById("nameError").style.display = 'block'
        }
    }

}


function clear() {

    siteName.value = "";
    siteUrl.value = "";
}

function validation() {
    if (siteName.value !== "" && siteUrl.value !== "") {
        return true
    }
    else {
        return false
    }
}

function displayItem() {

    var cartona = "";

    for (var i=0;i<container.length;i++) 
    {
        cartona +=

       `<div class="webwell row">
        <h2>${container[i].name}</h2>
        <a class="btn btn-primary" href="http://${container[i].url}" target="_blank">visit</a>
        <button class="btn btn-danger btndelete" onclick="deleteItem(${i})" >Delete</button>
        </div>`
    }


    document.getElementById("bookmarkList").innerHTML = cartona;
}

function deleteItem(index)
{
    container.splice(index,1)
    localStorage.setItem("urlList",JSON.stringify(container))
    displayItem()
}