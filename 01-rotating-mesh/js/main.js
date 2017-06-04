var scene, controls, camera, renderer;

container = document.getElementById('configurator');
var WIDTH = $(container).width();
var HEIGHT = $(container).height();

var SPEED = 0.001;

var cubeModel;



function init() {
    scene = new THREE.Scene();

    initMesh();
    initSphereModel();
    initCube();
    initCube2();
    initCamera();
    initLights();
    initRenderer();

    initControl();


    // document.body.appendChild(renderer.domElement);
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
function initSphereModel() {
    loader.load(
        '/webgl-experiments/blender-export/untitled2.json',
        function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            sphereModel = new THREE.Mesh(geometry, material);
            sphereModel.scale.set(0.8, 0.8, 0.8);
            // sphereModel.position.y += 0.5;
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
    var material = new THREE.MeshPhongMaterial({ transparent: false, map: THREE.ImageUtils.loadTexture('Bois_Frene.jpg') });
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

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    rotateCube();
    renderer.render(scene, camera);
}

init();
render();


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

function showcube() {
    cubeModel.visible = true;
};

function hidecube() {
    cubeModel.visible = false;
};

function changetexturecube() {
     console.log(cubeModel.material);
    // cubeModel.material.map.image = THREE.ImageUtils.loadTexture("Metal_Steel_Textured.jpg");
    // cubeModel.material.needsUpdate = true;

     text = THREE.ImageUtils.loadTexture( 'Metal_Steel_Textured.jpg' );
        cubeModel.traverse(function(child) {
            if(child instanceof THREE.Mesh){
                //alert("works");
                child.material.map = text;
                child.material.needsUpdate = true;
                child.geometry.buffersNeedUpdate = true;
                child.geometry.uvsNeedUpdate = true;
            }
        });
};
