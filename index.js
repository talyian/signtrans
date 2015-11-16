var loader = new THREE.JSONLoader();
var mesh;
function init() {
    // initialize scene
    var scene = new THREE.Scene();
    var w = document.body.clientWidth, h = document.body.clientHeight - header.clientHeight - 20;
    var light = new THREE.DirectionalLight( 0xffddaa, 1.5 );
    light.position.set( 2, 4, 4 )
    scene.add(light);

    var light = new THREE.DirectionalLight( 0xee6666, 0.2 );
    light.position.set( -1, -2, 1 )
    scene.add(light);

    var light = new THREE.DirectionalLight( 0xaaccee, 0.5 );
    light.position.set( -2, 3, -3 )
    scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xfff4e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(w, h);
    renderer.sortObjects = false;
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 15, w / h, 1, 10000 );
    camera.position.set( -0, 1, 3 );
    // camera.position.set( -0, 10, 30 );
    camera.lookAt(new THREE.Vector3(0, 1.35, 0));
    camera.up.set( 0, 0, 1 );

    loader.load("assets/person.json", function(geometry, materials) {

        var m = new THREE.MultiMaterial([
            new THREE.MeshLambertMaterial({"color": 0xAACCEE}),
            new THREE.MeshBasicMaterial({"color": 0xFF0000, "wireframe": true}),
        ]);
        console.log({
            'old material': materials,
            'new material': m
        });

        m.skinning = true;
        m.materials.map(k => k.skinning = true);
        mesh = new THREE.SkinnedMesh(geometry, m, false);
        mixer = new THREE.AnimationMixer(mesh)
        control.init(mesh, mixer);
        scene.add(mesh);

        function animate() {
            d = clock.getDelta();
            mixer.update(d * 2);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    });
}

var clock = new THREE.Clock();
init()
