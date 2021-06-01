// Include thisas a source tag in main .html file
    // <script src="car.js"></script>

// Code to create objects within main script
  // Create & Add Car
  // const myCar = new Car();
  // myCar.scale.set(0.025,0.025,0.025);
  // myCar.position.set(1,-0.25,0);
  // myCar.rotation.x = -Math.PI/2;
  // this.third.scene.add(myCar);
  // this.third.physics.add.existing(myTree, { x: 3, y: -0.25, depth: 120, mass: 0, shape: 'box', width: 60, height: 60});

// Pick a random value from an array
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function Wheel() {
    const wheelGeometry = new THREE.BoxBufferGeometry(12, 33, 12);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.z = 6;
    wheel.castShadow = false;
    wheel.receiveShadow = false;
    return wheel;
  }

  function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#303030";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(8, 8, 48, 24);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#303030";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  function Car() {
    const vehicleColors = [
        0xa52523,
        0xef2d56,
        0x0ad3ff,
        0xff9f1c /*0xa52523, 0xbdb638, 0x78b14b*/
      ];

    const car = new THREE.Group();
  
    const color = pickRandom(vehicleColors);
  
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 30, 15),
      new THREE.MeshLambertMaterial({ color })
    );
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);
  
    const carFrontTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;
  
    const carBackTexture = getCarFrontTexture();
    carBackTexture.center = new THREE.Vector2(0.5, 0.5);
    carBackTexture.rotation = -Math.PI / 2;
  
    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.flipY = false;
  
    const carRightSideTexture = getCarSideTexture();
  
    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshLambertMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ color: 080808 }), // top
      new THREE.MeshLambertMaterial({ color: 080808 }) // bottom
    ]);
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);
  
    const backWheel = new Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);
  
    const frontWheel = new Wheel();
    frontWheel.position.x = 18;
    car.add(frontWheel);
  
    return car;
  }