
function disconnect() {
    delete_cookie("token");
    location.reload();
}

function getContentOrganisationSelection() {
    var token = getCookie("token")
    var request = new XMLHttpRequest();
    request.open("GET", `https://service-back-dot-cloud-github.appspot.com/organizations/${token}`, true);
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
        data.OrganisationName = currentValue;
        console.log(data);

        setTitle();
        setFirstDiv(data);
        setlatestRepoDiv(data);
        setCommitsDiv(data);
        setStarsDiv(data);
        setMostStarsDiv(data);
        setIssuesDiv(data);
        setMostIssuesDiv(data);
        setMostCollaboratorsDiv(data);
        setOldestRepoDiv(data);
        setMostCommitsDiv(data);
        setTopicsDiv(data);
        setMostReleasesDiv(data);
        setWatchersDiv(data);
        setLangagesDiv(data);
        setLastDiv();
        setGraphs(data);
    }
    request.send();
    if (request.status === 200) {
        console.log("Réponse reçue: %s", request.responseText);
    } else {
        console.log("Statut de la réponse: %d (%s)", request.status, request.statusText);
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

function AddSection(NomID, html) {
    document.body.innerHTML += '<div id="' + NomID + '" class="p-5 ' + getAlternateDivClass() + '">' + html + '</div>';
};

function AddSectionWithTitlepolicies(NomID, html) {
    return AddSection(NomID, `<H2>${html}</h2>`)
}
function AddSectionWithPicture(NomID, html, htmlImg) {
    if (IsPair) {
        return AddSection(NomID,
            `<div class="d-flex">
                    <div class="flex-fill"><H2>${html}</H2></div>
                    <div>${htmlImg}</div>
            </div>`);
    } else {
        return AddSection(NomID,
            `<div class="d-flex">
                    <div>${htmlImg}</div>
                    <div class="flex-fill"><H2>${html}</H2></div>
            </div>`);
    }
}

function setFirstDiv(data) {
    AddSectionWithPicture("First",       
        `Let's explore some facts about <b>${data.OrganisationName}</b><br> 
        I will be your host for this little travel`,
        `<img src="./Image/Octo.png" style="Height: 300px">`);
};

function setlatestRepoDiv(data) {
    var d = new Date(data.LatestRepo);
    var today = new Date();
    var diff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / (1000 * 60 * 60 * 24));
    AddSectionWithPicture("Latest-repo",
        `So how goes <b>${data.LatestRepoName}</b> your latest project?<br>
        It's been <b>${diff}</b> days already`,
        ` <img src="./Image/NewBadge.png" style="Height: 200px">`);
};

function setCommitsDiv(data) {
    AddSectionWithTitlepolicies("Commits",
        `Already <b>${data.Commits}</b> commits since the beginning of <b> ${data.OrganisationName} </b>!<br>
         It has been a very long way!`);
};

function setMostCommitsDiv(data) {
    AddSectionWithTitlepolicies("Most-Commits",
        `Special mention to <b>${data.MostCommitsName}</b> : <br>
         Your biggest repository with his <b>${data.MostCommits}</b> commits`);
};

function setStarsDiv(data) {
    AddSectionWithPicture("Stars",       
        `Hey, look out, <b>${data.OrganisationName}</b> has a total of <b>${data.Stars}</b> stars.<br>
        I bet you are ready to start your space conquest.`,
        `<img src="./Image/Rocket.png" style="Height: 200px">`);
};

function setMostStarsDiv(data) {
    AddSectionWithPicture("Most-Stars",
        `I would like to suggest you to launch your rocket from your project <b>${data.MostStarsName}</b>.<br>
        his <b>${data.MostStars}</b> stars, that's already a very good start.`,
        `<img src="./Image/Planet.png" style="Height: 200px">`);
};

function setIssuesDiv(data) {
    AddSectionWithPicture("Issues",       
        `Also before starting just make sure that your <b>${data.Issues}</b> issues are all closed.<br>
        Would be a shame if your rocket traveled with some bugs`,
        `<img src="./Image/Octonaut.png" style="Height: 200px">`);
};

function setMostIssuesDiv(data) {
    AddSectionWithPicture("Most-Issues",
        `What happened with your project <b>${data.MostIssuesName}</b> ?<br>
        <b>${data.MostIssues}</b> issues is quite a frigtening number.`,
        `<img src="./Image/OctoFix.png" style="Height: 200px">`);
};

function setMostCollaboratorsDiv(data) {
    AddSectionWithPicture("Most-Collaborators",       
        `Which repository has the most collaborators?<br>
        It's <b>${data.MostCollaboratorsName}</b> with a total of <b>${data.MostCollaborators}</b> collaborators.<br>
        That's quite amazing!`,
        `<img src="./Image/OctoTeam.png" style="Height: 200px">`);
};

function setOldestRepoDiv(data) {
    var d = new Date(data.OldestRepo);
    var today = new Date();
    var diff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())) / (1000 * 60 * 60 * 24));
    AddSectionWithPicture("Oldest-repo",
        `Do you remember <b>${data.OldestRepoName}</b> your first project?<br>
        Today that would make <b>${diff}</b> days already. Seems like yesterday for me though.`,
        `<img src="./Image/OctoOld.png" style="Height: 200px">`);
};

function setMostReleasesDiv(data) {
    AddSectionWithTitlepolicies("Most-Releases",
        `<b>${data.MostReleases}</b> releases for <b>${data.MostReleasesName}</b>.<br>
        It's become quite hard to follow you.`);
}

function setMostWatchersDiv(data) {
    AddSectionWithTitlepolicies("Most-Watchers",
        `If there is one project that everyone should watch,<br>
        I guess it would be <b>${data.MostWatchersName}</b> with his <b>${data.MostWatchers}</b> watchers.`);
};

function setWatchersDiv(data) {
    AddSectionWithTitlepolicies("Watchers",
        `Your organisation has a total of <b>${data.Watchers}</b> watchers.<br>
        Way to go before reaching the first place.`);
};

function setLangagesDiv(data) {
    AddSection("Languages",
        `<H2>If you are asking which language is used in your organisation, we got your back:<br></H2>
        <div class="container">
            <canvas id="LanguagepieChart" style="width:800px; height:200px;" ></canvas>
        </div>`);
};

function setTopicsDiv(data) {
    AddSection("Topics",
        `<H2>Here are the topics your organisation is familiar with:<br></H2>
        <div class="container">
            <canvas id="TopicPieChart" style="width:800px; height:200px;" ></canvas>
        </div>`);
};

function setLastDiv() {
    AddSection("End",
        `<div class="text-center">
            <H1>
                Also for the amazing travel that we have made so far
            </H1>
            <img src="./Image/OctoThankU.png" style="Height: 300px">
        </div>`);
};


function setGraphs(data){
    var ctx1 = document.getElementById('LanguagepieChart').getContext('2d');
    var Chart1 = new Chart(ctx1, {
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
    var ctx2 = document.getElementById('TopicPieChart').getContext('2d');
    var Chart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: Object.keys(data.Topics),
            datasets: [{
                label: "langage DATE",
                backgroundColor: generateColors(Object.keys(data.Topics).length),
                data: Object.values(data.Topics),
            }]
        }
    });
}

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
function delete_cookie(name) {
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



var IsPair = true;
function getAlternateDivClass() {
    IsPair = !IsPair;
    if (IsPair) {
        return "bg-white text-right"
    }
    else {
        return "bg-light text-left";
    }
}