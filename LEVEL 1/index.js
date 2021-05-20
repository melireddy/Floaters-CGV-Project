		// var scene = new THREE.Scene();
        // var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);

        // var renderer = new THREE.WebGLRenderer({antialias: true});
        // renderer.setSize(window.innerWidth,window.innerHeight);
        // document.body.appendChild(renderer.domElement);

        // var geometry = new THREE.BoxGeometry(1,2,1);
        // var material = new THREE.MeshBasicMaterial({color: 0xff0000});
        // var cube = new THREE.Mesh(geometry,material);

		// var loader = new THREE.GLTFLoader();

		// loader.load( 'Donut-LEVEL1.glb', function ( gltf ) {
		// 	console.log('Hello');
		// 	gltf.scene.scale.set(1000,1000,1000);
		// 	scene.add( gltf.scene );
		
		// }, undefined, function ( error ) {
		
		// 	console.error( error );
		
		// } );

 // Load 3D Scene
 var scene = new THREE.Scene(); 

 // Load Camera Perspektive
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 20000 );
camera.position.set( 0,25,75);
camera.lookAt( 0, 5, 0);
	
 // Load a Renderer
var renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setClearColor( 0xC5C5C3 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

 // Load Light
 var ambientLight = new THREE.AmbientLight( 0xcccccc );
 scene.add( ambientLight );
			 
 var directionalLight = new THREE.DirectionalLight( 0xffffff );
 directionalLight.position.set( 0, 1, 1 ).normalize();
 scene.add( directionalLight );				
 
  // glTf 2.0 Loader
 var loader = new THREE.GLTFLoader();				
	 loader.load( './room1-draft1.glb', function ( gltf ) {             // <<--------- Model Path
	 var object = gltf.scene;				
	 gltf.scene.scale.set( 1,1,1 );			   
	 gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
	 gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	 gltf.scene.position.z = 0;				    //Position (z = front +, back-)
	 gltf.scene.rotation.y += 0.4;
	 scene.add( gltf.scene );
	 });	 
 
 function animate() {
	 render();

	 requestAnimationFrame( animate );
	 }
 
 function render() {
	 renderer.render( scene, camera );
	 }
 
 render();
 animate();
		