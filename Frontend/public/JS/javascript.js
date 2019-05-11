
function disconnect() {
    delete_cookie("token")
}

function getContentOrganisationSelection() {
    var token = getCookie("token")
    var request = new XMLHttpRequest();
    request.open("GET", `http://localhost:8080/organizations/${token}`, true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        var select = document.getElementById("organisation-select");
        for (index in data) {
            select.options[select.options.length] = new Option(data[index], index);
        }
    }
    request.send();
}

function computeStats() {
    var request = new XMLHttpRequest();
    var token = getCookie("token")
    var currentValue = getOrganisationName();
    setLoader()
    request.open("GET", `https://service-back-dot-cloud-github.appspot.com/organization/${currentValue}/${token}`, true);
    request.onload = function () {
        removeLoader()
        var data = JSON.parse(this.response);
        console.log(data);

        setTitle();
        setlatestRepoDiv(data);
        setMostCommitDiv(data);
        setStarsDiv(data);
        setMostCollaboratorDiv(data);
        setLangage(data)
    }
    request.send();
    if (request.status === 200) {
        console.log("Réponse reçue: %s", request.responseText);
    } else {
        console.log("Status de la réponse: %d (%s)", request.status, request.statusText);
    }
};

function getOrganisationName() {
    var select = document.getElementById("organisation-select");
    return select.options[select.selectedIndex].text;
}

function setTitle() {
    var title = document.getElementById("header");
    title.innerHTML = getOrganisationName();
};

function AddSection(NomID, text) {
    document.body.innerHTML += '<div id="' + NomID + '" class="p-3 '+getAlternateBackgroundColor()+'">' + text + '</div>';
};

function setlatestRepoDiv(data) {
    var d = new Date(data.LatestRepo);
    var today = new Date();
    var diff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / (1000 * 60 * 60 * 24));
    AddSection("latest repo", `So how goes "${data.LatestRepoName}" your latest project? It's been ${diff} days already`);
};


function setMostCommitDiv(data) {
    AddSection("MostCommit", `"${data.MostCommitsName}" is your biggest repository with ${data.MostCommits} commits`);
};

function setStarsDiv(data) {
    AddSection("Stars", `${getOrganisationName()} has a total of ${data.Stars} stars. I bet you are ready to start your space conquest.`);
};

function setMostCollaboratorDiv(data) {
    AddSection("Most-Collaborator", `Wich repository as the most collaborators?<BR> It's ${data.MostCollaboratorsName} with a total of ${data.MostCollaborators} collaborators. That's quite amazing!`);
};

function setLangage(data) {
    AddSection("Language", `if you are asking wich language is used in your organisation, we got your back:<br>
     <div class="container"><canvas id="pieChart" style="width:800px; height:200px;" ></canvas></div>`);

    var ctx = document.getElementById('pieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data.Languages),
            datasets: [{
                label: "langage DATE",
                backgroundColor: generateColors(Object.keys(data.Languages).length),
                data: Object.values(data.Languages),
            }]
        }
    });
};



function setLoader() {
    var loaderDiv = document.getElementById("Loader");
    loaderDiv.innerHTML =
        `<div class="spinner-border" style="width: 8rem; height: 8rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>`;
}
function removeLoader() {
    document.body.removeChild(document.getElementById('Loader'));
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function generateColors(length) {
    var colors = [];
    for (i = 0; i < length; i++) {
        r = Math.floor(Math.random() * 200);
        g = Math.floor(Math.random() * 200);
        b = Math.floor(Math.random() * 200);
        v = Math.floor(Math.random() * 500);
        c = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        colors.push(c);
    };
    return colors;
}

var BackgroundColor = "bg-light";
function getAlternateBackgroundColor() {
    if (BackgroundColor == "bg-light") {
        BackgroundColor = "bg-white"
    }
    else {
        BackgroundColor = "bg-light";
    }
    return BackgroundColor
}