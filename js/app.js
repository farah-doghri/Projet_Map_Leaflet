$(document).ready(function(){
    /* initialisation de la fonction initmap */
    var map;
    var activePopup = false;
    var points = 0;
    let regions;//Select all country 

    let regionMisteryName;

    function initmapV3(){
        map = L.map('map').setView([47.0, 3.0], 6);
        let link= 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        L.tileLayer(link, {
            maxZoom: 7,
            minZoom: 5,
            //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            //    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            //id: 'mapbox/dark-v9',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);
    }
    /* Initialisation de la carte */
    initmapV3();

/////////////////////////////////////////////////////////////////////////////////////////////
    /* Creation d'un tableau qui va contenir les donnes des régions*/
    var tableau = [
        [45.4695797,    4.4502821,  'Auvergne-Rhone-Alpes'],
        [47.280513,     4.999437,   'Bourgogne-Franche-Comte'],
        [48.202047,     -2.932644,  'Bretagne'],
        [47.499998,     1.749997,   'Centre-Val de Loire'],
        [42.200604,     9.092893,   'Corse'],
        [48.580002,     5.950000,   'Grand Est'],
        [50.047503,     2.363062,   'Haut de france'],
        [48.999870,     0.171253,   'Normandie'],
        [48.7099198,    2.6000411,  'Ile-De-France'],
        [45.399044,     0.2995785,   'Nouvelle-Aquitaine'],
        [43.545911,     1.998862,    'Occitanie'],
        [47.7632836,    -0.3299687, 'Pays de la loire'],
        [43.9351691,    6.0679194,  "Provence-Alpes-Cote D'Azur"] 
    ];

    /* On boucle sur le tableau pour y placer les points */
    for (i = 0; i < tableau.length; i++) {
                
        var regionName = tableau[i][2];
        /*
        * On va creer un cercle sur la carte pour chaque point
        */
        var circleLocation = new L.LatLng(tableau[i][0], tableau[i][1]),
        circleOptions = {
            id: regionName,
        };
        
        // on ajoute le cercle a la carte
        var circle = new L.Circle(circleLocation, 20000, circleOptions);
        map.addLayer(circle);

        // on ajoute une class et un id au path du svg
        circle._container.firstElementChild.classList.add("region");
        circle._container.firstElementChild.id = regionName;
        
        //console.log(circle)
    }
/////////////////////////////////////////////////////////////////////////////////////////////
    
    
/////////////////////////////////////////////////////////////////////////////////////////////
    ////////////// GET RANDOM NUMBER //////////////
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    ////////////// SELECT ALL REGIONS //////////////
    function getAllRegion(){
        let regions = document.getElementsByClassName("region");
        let regionTab = new Array();

        for(let i=0; i < regions.length; ++i){
            regionTab.push(regions[i]);
        }

        return regionTab;
    }
    
    ////////////// GET REGION BY ID//////////////
    function getRegion(regionTab, idRegion){
        return regionTab[idRegion];
    }
   
    ////////////// FIND REGION'S NAME //////////////
    function gameOne() {
        let regions = getAllRegion();//Select all country 
        let regionID = getRandomInt(regions.length);//Random number

        //Selected country informations
        let regionMistery = getRegion(regions, regionID);
        let regionMisteryName = regionMistery.id;

        /////// Game information ///////
        var codeHTML;
        codeHTML =  '<h3 id="region_question">Where is this region</h3>' +
                    '<input type="text" name="player_answer" id="player_answer" required>' +
                    '<input type="submit" id="answer_btn" value="confirm">' ;
        
        var divGameInformation = document.getElementById("game_information");
        divGameInformation.innerHTML = codeHTML ;
        
        let player_answer = document.getElementById("player_answer");//Name of the country
        //////////////////////////////////

        //Test
        //console.log(regionMistery);
        //console.log(player_answer);

        regionMistery.classList.add("select_land_coloration");//Add color to the select country
        
        //Test
        console.log("Region = " + regionMisteryName);
        document.getElementById("answer_btn").addEventListener("click", function(){        
            if(player_answer.value == regionMisteryName){
                window.alert("Congratulation meennn!! I gat you!  Minimum 3! It's " + regionMisteryName);
                regions.splice(regionID, 1);
                regionMistery.classList.remove("select_land_coloration");
                
                //Active popub avec les info de la region
                activePopup = true;
                addPopup(regionMisteryName);
                
                if(points < 5) {
                    gameOne();
                    points++;
                }
            }else{
                window.alert("Zebi, It's " + regionMisteryName);
                regionMistery.classList.remove("select_land_coloration");

                if(points < 5) {    
                    gameOne();
                }
            }
            if (points >= 5) {
                points = 0;
            }
        })
    }
    
    function loadGame() {
        regions = getAllRegion();
        initListenerRegion();
        gameTwo();
    }

    ////////////// FIND REGION POSITION //////////////
    function gameTwo() {
        let regionID = getRandomInt(regions.length);//Random number

        //Selected country informations
        let regionMistery = regions[regionID];
        regionMisteryName = regionMistery.id;

        /////// Game information ///////
        var codeHTML;
        codeHTML =  '<h3 id="region_question">Where is this region ?</h3>' +
                    '<span id="select_region_name">'+regionMisteryName+'</span>' ;
        
        console.log("On est dans game 2");
        var divGameInformation = document.getElementById("game_information");
        divGameInformation.innerHTML = codeHTML ;
        
        //////////////////////////////////
        
    }

    function restarGameTwo(gameEnd) {
        
        console.log(gameEnd); 
        if(gameEnd == true) {
            console.log(gameEnd);
            console.log(points);
            console.log("ok"); 
            gameTwo();
        } 
    }
    

    function initListenerRegion() {
        $.each(regions, function() {
            $(this).click(function () {
                let regionName = this.id;

                console.log("Region select = " + regionName);
                
                verifregion(regionName);
            });
        })
    }

    function verifregion(regionName) {

        if(regionName == regionMisteryName){
            console.log("well done");
            window.alert("well done c'est bien " + regionMisteryName);
            //regions.splice(regionID, 1);
        }else{
            console.log("Et merde");
            window.alert("Et merde ça c'est " + regionName);
        }

        return gameTwo();
    }

    ///////////// PARCOURIR LES REGIONS //////////////
    function parcoursRegion(regions, regionMisterySpan, regionID) {
        
        for(i = 0; i < regions.length; i++){
            regions[i].addEventListener("click", function() {
                regionName = regions[i].id;
                //console.log(regionName);
                
                if(regionName == regionMisterySpan.innerHTML){
                    console.log("well done");
                    window.alert("well done c'est bien " + regionMisterySpan.innerHTML);
                    regions.splice(regionID, 1);    
                    points++;

                    //Active popub avec les info de la region
                    activePopup = true;
                    addPopup(regionMisteryName);

                    gameEnd = true;
                }
                else{
                    console.log("Et merde");
                    window.alert("Et merde ça c'est " + regionName);
                    gameEnd = true;
                }
                console.log("Valeur : " + i);
                if (gameEnd == true && i >= regions.length){          
                    restarGameTwo(gameEnd)
                }
            })
        }
    }

    ///////////// create popup ///////////// 
    function addPopup(idRegion) {
        // Get the popup
        let popup = document.getElementById("myPopup");

        // Get the button that opens the popup
        let btn = document.getElementById("myBtn");

        // Get the <span> element that closes the popup
        var spanClose = document.getElementsByClassName("popup-close")[0];

        // When the user clicks the button, open the popup 
        if(activePopup == true) {
            popup.style.display = "block";
        }

        // When the user clicks on <span> (x), close the popup
        spanClose.onclick = function() {
            popup.style.display = "none";
        }

        // When the user clicks anywhere outside of the popup, close it
        window.onclick = function(event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    

    let url =  window.location.href;
    let newUrl = new URL(url);
    let gameType = newUrl.searchParams.get("gameType");

    if(gameType == 1){
        window.onload = gameOne();
    }else if(gameType == 2){
        window.onload = loadGame();
    }
});