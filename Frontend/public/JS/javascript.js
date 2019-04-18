
    function disconnect(){
        alert("Appel de l'api de déconnection");
    }

    function getText(){
        document.body.innerHTML +='<img id="ImageLoading" class="images" src="https://zsdevcdnpr1.azureedge.net/online/v1/content/images/loader.gif"/>';
        var request = new XMLHttpRequest();
        var token = getCookie("token")
        request.open("GET", `http://localhost:4300/organization/ngr-organization/${token}`, true);
        request.onload = function () {
            document.body.removeChild(document.getElementById('ImageLoading'));
            var data = JSON.parse(this.response);
            console.log(data);
            
            getBanner();
            getUsers();
            getFolder();
            getCommit();
            getLangage();
            getTopics();
            getFolderState();
        }
        request.send();
        if (request.status === 200) {
            console.log("Réponse reçue: %s", request.responseText);
        } else {
            console.log("Status de la réponse: %d (%s)", request.status, request.statusText);
        }
    };

//--------------------Banner--------------------
    function getBanner(){
        var banner = document.getElementById("banner");
        banner.innerHTML = "MON TITRE";
    };


//--------------------DIV--------------------
function createDiv(NomID, text){
    var div = document.createElement("div");
    var div2 = document.createElement("div");
    div.className = "wrapper";
    div.id = NomID;
    div2.className = "container";
    div2.innerHTML = text;
    div.appendChild(div2);
    document.body.appendChild(div);
};


//--------------------User--------------------
function getUsers(){
    

    
    var text = "User : TEST TEST TEST"
    createDiv("User", text);
};


//--------------------Folder--------------------
function getFolder(){
    //get Folder by API
    var text = "Folder : TEST TEST TEST"
    createDiv("Folder", text);
};


//--------------------Commit--------------------
function getCommit(){
    //get Commit by API
    var text = "Commit : TEST TEST TEST"
    createDiv("Commit", text);
};


//--------------------Langage--------------------
function getLangage(){
    //Appel API pour récupéré les noms des langage ainsi que leur % d'utilisation

    var tabLabel = ["January", "February", "March", "April", "May", "June", "July"];
    var tabData = [1, 10, 5, 2, 20, 30, 25];

    document.body.innerHTML += '<div class="container">Langage : <canvas id="pieChart" style="width:800px; height:450px;" ></canvas></div>';
    
    var ctx = document.getElementById('pieChart').getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: {
            labels: tabLabel,
            datasets: [{
                label: "langage DATE",
                backgroundColor: [
                    'rgba(24,232,39,1.0)',
                    'rgba(150, 50, 150,1.0)',
                    'rgba(46,204,204,1.0)',
                    'rgba(255,0,0,1.0)',
                    'rgba(153,102,255,1.0)',
                    'rgba(192,57,43,1.0)',
                    'rgba(255, 159, 64,1.0)',
                    'rgba(44,195,107,1.0)',
                    'rgba(29,210,175,1.0)',
                    'rgba(74,163,223,1.0)',
                    'rgba(25,182,152,1.0)',
                    'rgba(255, 99, 132,1.0)',
                    'rgba(39,174,96,1.0)',
                    'rgba(26,188,156,1.0)',
                    'rgba(46,142,206,1.0)',
                    'rgba(255, 206, 86,1.0)',
                    'rgba(75, 192, 192,1.0)',
                    'rgba(64,212,126,1.0)',
                    'rgba(22,160,133,1.0)',
                    'rgba(242,202,39,1.0)'
                ],
                data: tabData,
                borderWidth: 0
            }]
        }
    });
};


//--------------------Topics--------------------
function getTopics(){
    //get Topics by API
    var text = "Topics : TEST TEST TEST"
    createDiv("Topics", text);
};


//--------------------FolderState--------------------
function getFolderState(){
    //get Folder state by API
    var text = "Folder state : TEST TEST TEST"
    createDiv("FolderState", text);
};


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }