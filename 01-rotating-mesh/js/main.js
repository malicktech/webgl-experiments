// global vaiables
var scene, controls, camera, renderer;

container = document.getElementById('configurator');
var WIDTH = $(container).width();
var HEIGHT = $(container).height();

var SPEED = 0.0005;

var cubeModel, tearModel, tearModel2;



$(document).ready(function() {
    // jquery code here

    /* =============================================================================================== 
    LAUCH
    =============================================================================================== */

    init();
    render();

    /* =============================================================================================== 
    EVENT
    =============================================================================================== */

    $("#target").click(function() {
        // console.log("Handler for .click() called.");
        // console.log(mesh.material[0]);
        mesh.material[0].color.setHex(0xff0000);
    });
    $("#changeTexture").click(function() {
        // console.log("Handler for .click() called.");
        // console.log(mesh.material[0]);
        mesh.material[0].color.setHex(0xff0000);
    });
    $("#hidegardecorps").click(function() {
        // console.log(mesh.children);
        mesh.visible = false;
    });
    $("#gardecorps").click(function() {
        // console.log(mesh.children);
        mesh.visible = true;
    });

    $('#radio_button').click(function() {
        // if ($(this).is(':checked')) alert('is checked'); 
        console.log('check-checky-check was changed');
        $("input[name='name']:checked").val()
    });

});



function init() {
    scene = new THREE.Scene();
    // initMesh();
    // initSphereModel();
    // initCube();
    // initCube2();
    initTearsModel();
    initTearsModel2();
    initCamera();
    initLights();
    initRenderer();

    initControl();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer = new THREE.WebGLRenderer( {alpha: true} );

    renderer.setSize(WIDTH, HEIGHT);
    // render
    container.appendChild(renderer.domElement);
}

function initControl() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}



function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

var mesh = null;

var loader = new THREE.JSONLoader();

function initMesh() {
    loader.load(
        // resource URL
        './marmelab.json',
        // Function when resource is loaded 
        function(geometry, materials) {
            // var material = materials[ 0 ];
            console.log();
            var material = new THREE.MeshFaceMaterial(materials);
            mesh = new THREE.Mesh(geometry, material);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
            mesh.translation = geometry.center();
            scene.add(mesh);
            // console.log(mesh);
            mesh.visible = false;
        });
}

// Special callback to get a reference to the sphere
function initTearsModel() {
    loader.load(
        '/webgl-experiments/blender-export/escalier_GC.json',
        function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            tearModel = new THREE.Mesh(geometry, material);
            tearModel.scale.set(0.4, 0.4, 0.4);
            tearModel.material[0].color.setHex(0x2f3a4c);
            tearModel.material[1].color.setHex(0xECF400);
            scene.add(tearModel);
        });

}

function initTearsModel2() {
    loader.load(
        '/webgl-experiments/blender-export/escalier_M.json',
        function(geometry, materials) {
            // var material = new THREE.MeshFaceMaterial(materials);
            var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('img/textures/Bois_Frene.jpg') });
            material.side = THREE.DoubleSide;
            tearModel2 = new THREE.Mesh(geometry, material);
            tearModel2.scale.set(0.4, 0.4, 0.4);
            scene.add(tearModel2);
            console.log(tearModel2.material);
        });
}



// Special callback to get a reference to the sphere
function initSphereModel() {
    loader.load(
        '/webgl-experiments/blender-export/untitled2.json',
        function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            sphereModel = new THREE.Mesh(geometry, material);
            sphereModel.scale.set(0.8, 0.8, 0.8);
            scene.add(sphereModel);
        });
}


function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}


function initCube2() {
    var geometry = new THREE.CubeGeometry(3, 3, 3);
    var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('img/textures/Bois_Frene.jpg') });
    material.side = THREE.DoubleSide;
    cubeModel = new THREE.Mesh(geometry, material);
    cubeModel.scale.x = cube.scale.y = cube.scale.z = 0.5;
    cubeModel.position.setX(3);
    cubeModel.position.setY(1);
    cubeModel.position.setZ(0);
    scene.add(cubeModel);
    // console.log(cubeModel);
}

function initCube() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
    cube.scale.x = cube.scale.y = cube.scale.z = 0.5;
    cube.position.setX(-3);
    cube.position.setY(2);
    cube.position.setZ(-0.5);
    scene.add(cube);
}

function rotateCube() {
    cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    cube.rotation.z -= SPEED * 3;
}

function rotateTearsModel() {
    tearModel.rotation.x -= SPEED * 2;
    tearModel.rotation.y -= SPEED;
    tearModel.rotation.z -= SPEED * 3;

    tearModel2.rotation.x -= SPEED * 2;
    tearModel2.rotation.y -= SPEED;
    tearModel2.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    // rotateMesh();
    // rotateCube();
    rotateTearsModel();
    renderer.render(scene, camera);
}


function changetexturecube() {
    text = THREE.ImageUtils.loadTexture('imagee/textures/Metal_Steel_Textured.jpg');
    cubeModel.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = text;
            child.material.needsUpdate = true;
            child.geometry.buffersNeedUpdate = true;
            child.geometry.uvsNeedUpdate = true;
        }
    });
}

function doHvSelect(clickedelement, texture) {

    console.log(clickedelement);
    $('#texture li').removeClass('select').addClass('disable');
    $(clickedelement).parent().removeClass('disable').addClass('select');
    text = THREE.ImageUtils.loadTexture('img/textures/' + texture);
    tearModel2.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.map = text;
            child.material.needsUpdate = true;
            child.geometry.buffersNeedUpdate = true;
            child.geometry.uvsNeedUpdate = true;
        }
    });
};


function showcube() {
    cubeModel.visible = true;
};

function hidecube() {
    cubeModel.visible = false;
};
