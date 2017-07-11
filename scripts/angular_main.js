var app = angular.module("portfolioApp", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider){
    $routeProvider.when('/', { templateUrl : "partials/main.html" })
                  .when("/games", { templateUrl : "partials/games.html" })
                  .when("/other", { templateUrl : "partials/other.html" })
                  .otherwise({redirectTo : '/'});
});

app.controller("mainController", function($scope, $routeParams, $location){
    if($location.path() == "/"){
        document.getElementById("topNavMainLink").focus();
    }
    if($location.path() == "/other"){
        $scope.loadFile = loadFile;
        $scope.modelPath = "Tower3";
        Start3js(document.getElementById("threeCanvas"), $scope.modelPath);
    }
    var topNavButtons = document.getElementById("topNav").children;    
    var path = "#!" + $location.path();
    for(var i = 0; i < topNavButtons.length; i++){
        var link = topNavButtons[i].firstChild;
        if(link.getAttribute("href") == path){
            link.classList.add("activeTopNavButton");
        }else{
            link.classList.remove("activeTopNavButton");
        }
    }
});

function setModel(path){
    console.log(path);
}

var currentModel;
var scene;

function Start3js(parent, defaultFile){
        scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, 8/5, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(800,500);//window.innerWidth, window.innerHeight);
        parent.appendChild(renderer.domElement);
        renderer.setClearColor(0x333333);

        var geometry = new THREE.BoxGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        var ambientLight = new THREE.AmbientLight( 0xffffff );
        scene.add(ambientLight);

        var lineGeometry = new THREE.Geometry();
        var twoThirdsPi = Math.PI * (2/3);
        var triXPos = Math.sin(twoThirdsPi) * 2;
        var triZPos = Math.cos(twoThirdsPi) * 2;
        lineGeometry.vertices.push(new THREE.Vector3(triXPos, 0, triZPos));
        lineGeometry.vertices.push(new THREE.Vector3(-triXPos, 0, triZPos));
        lineGeometry.vertices.push(new THREE.Vector3(0, 0, 2));
        lineGeometry.vertices.push(new THREE.Vector3(triXPos, 0, triZPos));

        var lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

        var line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);

        

        var cameraAngle = 0;            

        function render(){
            requestAnimationFrame(render);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cameraAngle += 0.03;
            if(cameraAngle > Math.PI * 2)
                cameraAngle -=Math.PI * 2;
            camera.position.set(Math.sin(cameraAngle) * 50, 16, Math.cos(cameraAngle) * 50);
            camera.lookAt(new THREE.Vector3(0, 7, 0));
            renderer.render(scene, camera);
        }

        loadFile(defaultFile);

        render();
    }

    function loadFile(filename){
        var mtlLoader = new THREE.MTLLoader();
        var objLoader = new THREE.OBJLoader2();

        mtlLoader.setPath("./models/Towers/");

        mtlLoader.load(filename + ".mtl", function(materials){
            materials.preload();
            objLoader.setMaterials(materials.materials);
            objLoader.meshCreator.materials = materials.materials;
            
            var addToScene = function(object){
                object.position.set(0,4,0);  
                if(currentModel){
                    scene.remove(currentModel);
                }
                currentModel = object;
                scene.add(object);
                console.log(object);
            };

            objLoader.load("./models/Towers/" + filename + ".obj", addToScene);
        });
    }