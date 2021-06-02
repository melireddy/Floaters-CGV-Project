const { enable3d, Scene3D, Canvas, ExtendedObject3D, THREE } = ENABLE3D
      

class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    this.accessThirdDimension({ gravity: { x: 0, y: -20, z: 0 } })
    delete this.robot
    this.stars = []
    this.robars = []
    this.score = 0
    this.life = 3
    this.no_stars = 0
    this.truck1 = 0;
    this.car1= 0;
  }

  preload() {
    this.third.load.preload('sky', './resources/Orange Coral.png')
    this.load.html('star', './resources/star.svg')
  }

  async create() {
    const { lights } = await this.third.warpSpeed('-ground', '-sky', '-orbitControls')

    // adjust the camera
    this.third.camera.position.set(0, 5, 20)
    this.third.camera.lookAt(0, 0, 0)

    // enable physics debugging
    //this.third.physics.debug.enable()

    // add background image
    this.third.load.texture('sky').then(sky => (this.third.scene.background = sky))

    // add score text
    this.scoreText = this.add.text(32, this.cameras.main.height - 32, 'score: 0', {
      fontSize: '32px',
      fill: '#000'
    })
    this.scoreText.setOrigin(0, 1)
    this.scoreText.depth = 1

     // add lives text
     this.lifeText = this.add.text(32, this.cameras.main.height - 32, 'lives: 3', {
        fontSize: '32px',
        fill: '#000'
    })
    this.lifeText.setOrigin(0, 2)
    this.lifeText.depth = 1
    
    // add no of stars
    this.no_starsText = this.add.text(32, this.cameras.main.height - 32, '0/23', {
        fontSize: '32px',
        fill: '#000'
    })
    this.no_starsText.setOrigin(-10, 2)
    this.no_starsText.depth = 1

    // add platforms
    const platformMaterial = { phong: { transparent: true, color: 0x003300 } }
    const platforms = [
      this.third.physics.add.box(
        { name: 'platform-ground', x: 0,y: -1, width: 30, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right1', x: 12, y: -1, width: 30, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-left1', x: 25, y: 5, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right2', x: 35, y: 10, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 45, y: 10, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 60, y: 15, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 70, y: 20, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 78, y:15, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 84, y:10, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 95, y:0, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 108, y:0, width: 10, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 40, y: 1, width: 1.5, depth: 1, height: 1, mass: 20 },
        platformMaterial
      ),
      // Staircase
      this.third.physics.add.box(
        { name: 'platform-right3', x: 60, y:18, width: 1, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 61, y:19, width: 1, depth: 5, mass: 0 },
        platformMaterial
      ),
      this.third.physics.add.box(
        { name: 'platform-right3', x: 62, y:20, width: 1, depth: 5, mass: 0 },
        platformMaterial
      ),
      

    ]
  //add rotating bar
  const barPositions = [
      { x: -7.5, y: 0 },
       { x: 13, y: 0 },
       { x: 34, y: 13 },
       { x: 45, y: 13 },
       { x: 73, y: 20 },
    ]

    for(var i = 0; i < 4; ++i){
      const trap = new THREE.Group()
      trap.position.setY(2)
      const stand = this.third.add.box(
        { height: 3, y: 1, width: 0.4, depth: 0.4 },
        { lambert: { color: 0xc7373 } }
      )
      const bar = this.third.add.box({ width: 5,height: 0.5 , y: 2.5 }, { lambert: { color: 0xff0000 } })
      bar.name = 'obs-bar'
      trap.add(stand, bar)
      trap.name = 'obs-trap' // <-- set a name if you haven't already
      trap.position.set(barPositions[i].x,barPositions[i].y,0)
      this.third.add.existing(trap)
      this.third.physics.add.existing(trap)
      trap.body.setAngularFactor(0, 0, 1)
      trap.body.setFriction(0.8)

      this.robars.push(trap)
    }
    


    //add obstacles
    const obstacleMaterial = {standard : {color: 0xd6d6c2, metalness : 0.05 }} 
    const obstacles = [
    this.third.physics.add.cone(
      {name: 'obs-1',mass: 200, radius: 0.5, height: 9.83, depth: 1, x: 63, y: 18},
     obstacleMaterial
    ),
    this.third.physics.add.cone(
      {name: 'obs-2',mass: 200, radius: 0.5, height: 6, depth: 1, x: 59, y: 18},
     obstacleMaterial
    ),
    this.third.physics.add.cone(
      {name: 'obs-3',mass: 200, radius: 0.5, height: 2, depth: 1, x: 22, y: 0},
     obstacleMaterial
    ),
    this.third.physics.add.cone(
      {name: 'obs-4',mass: 200, radius: 0.5, height: 2, depth: 1, x: 24, y: 0},
     obstacleMaterial
    ),
    this.third.physics.add.cone(
      {name: 'obs-5',mass: 200, radius: 0.5, height: 4, depth: 1, x: 20.7, y: 8},
     obstacleMaterial
    ),
    this.third.physics.add.cone(
      {name: 'obs-5',mass: 200, radius: 1.7, height: 5, depth: 1, x: 87, y: 12},
     obstacleMaterial
    )
  ]

 

  // //add flamingo
  // // MODEL

  this.third.load.gltf('./models/flamingo.glb').then(gltf => {
      this.flamingo = new ExtendedObject3D()
      this.flamingo.add(gltf.scene)
      const scale = 0.01
      this.flamingo.scale.set(scale, scale, scale)
      this.flamingo.rotation.set(0,1,0)
      this.flamingo.position.set(-10,23,0)

      this.flamingo.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true
        }
      })

      // animations
      this.third.animationMixers.add(this.flamingo.animation.mixer)
      gltf.animations.forEach(animation => {
        this.flamingo.animation.add('fly', animation)
      })
      this.flamingo.animation.play('fly')

      this.third.add.existing(this.flamingo)
      this.third.physics.add.existing(this.flamingo, {
        shape: 'box',
        ignoreScale: true,
        width: 1,
        depth: 1,
        offset: { y: -0.5 }
      })
      this.flamingo.body.setLinearFactor(1, 1, 0)
      this.flamingo.body.setAngularFactor(0, 0, 0)
      this.flamingo.body.setFriction(0)
      this.flamingo.body.setCollisionFlags(6)

  })

  //add flamingo 2
  //add flamingo
  // MODEL

  this.third.load.gltf('./models/flamingo.glb').then(gltf => {
      this.flamingo2 = new ExtendedObject3D()
      this.flamingo2.add(gltf.scene)
      const scale = 0.02
      this.flamingo2.scale.set(scale, scale, scale)
      this.flamingo2.rotation.set(0,1,0)
      this.flamingo2.position.set(-5,18,0);

      this.flamingo2.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true
        }
      })

      // animations
      this.third.animationMixers.add(this.flamingo2.animation.mixer)
      gltf.animations.forEach(animation => {
        this.flamingo2.animation.add('fly', animation)
      })
      this.flamingo2.animation.play('fly')

      this.third.add.existing(this.flamingo2)
      this.third.physics.add.existing(this.flamingo2, {
        shape: 'box',
        ignoreScale: true,
        width: 1,
        depth: 1,
        offset: { y: -0.5 }
      })
      this.flamingo2.body.setLinearFactor(1, 1, 0)
      this.flamingo2.body.setAngularFactor(0, 0, 0)
      this.flamingo2.body.setFriction(0)
      this.flamingo2.body.setCollisionFlags(6)

  })

   // add trees
   const tree = new THREE.Group()
    tree.name = 'tree' // <-- set a name if you haven't already
    tree.position.setY(2)
    const body = this.third.add.box(
      {mass: 400, height: 1, y: 1, z: -1, width: 0.1, depth: 0.4 },
      { lambert: { color: 0x802000 } }
    )
    const head = this.third.add.cone({ radius: 0.30, y: 1.7, z: -1 , depth: 0.4 }, { lambert: { color: 0x001a00 } })
    const flair = this.third.add.cone({ radius: 0.5, y: 2, z: -1 , depth: 0.4 }, { lambert: { color: 0x001a00 } })
    tree.add(body, head, flair)
    tree.position.set(-6,-2,0)
    tree.scale.set(2.5,2.5,2.5)
    this.third.add.existing(tree)
    this.third.physics.add.existing(tree)
    tree.body.setCollisionFlags(2);

    const tree2 = tree.clone()
    tree2.scale.set(1.5,1.5,1.5)
    tree2.position.set(6.5,-2,0)
    this.third.add.existing(tree2)
    this.third.physics.add.existing(tree2)
    tree2.body.setCollisionFlags(2);

    const tree3 = tree.clone()
    tree3.scale.set(2,2,2)
    tree3.position.set(12,-2,0)
    this.third.add.existing(tree3)
    this.third.physics.add.existing(tree3)
    tree3.body.setCollisionFlags(2);

    const tree4 = tree.clone()
    tree4.scale.set(1.5,1.5,1.5)
    tree4.position.set(0,-2,0)
    this.third.add.existing(tree4)
    this.third.physics.add.existing(tree4)
    tree4.body.setCollisionFlags(2);

    const tree5 = tree.clone()
    tree5.scale.set(1.5,1.5,1.5)
    tree5.position.set(21,4,0)
    this.third.add.existing(tree5)
    this.third.physics.add.existing(tree5)
    tree5.body.setCollisionFlags(2);

    const tree6 = tree.clone()
    tree6.scale.set(2,2,2)
    tree6.position.set(26,4,0)
    this.third.add.existing(tree6)
    this.third.physics.add.existing(tree6)
    tree6.body.setCollisionFlags(2);

    const tree7 = tree.clone()
    tree7.scale.set(1.5,1.5,1.5)
    tree7.position.set(32,9.3,0)
    this.third.add.existing(tree7)
    this.third.physics.add.existing(tree7)
    tree7.body.setCollisionFlags(2);

    const tree8 = tree.clone()
    tree8.scale.set(3,3,3)
    tree8.position.set(40,9,0.8)
    this.third.add.existing(tree8)
    this.third.physics.add.existing(tree8)
    tree8.body.setCollisionFlags(2);

    const tree9 = tree.clone()
    tree9.scale.set(3,3,3)
    tree9.position.set(35,9,0.8)
    this.third.add.existing(tree9)
    this.third.physics.add.existing(tree9)
    tree9.body.setCollisionFlags(2);

    const tree10 = tree.clone()
    tree10.scale.set(4,4,4)
    tree10.position.set(62,12,1.8)
    this.third.add.existing(tree10)
    this.third.physics.add.existing(tree10)
    tree10.body.setCollisionFlags(2);

    const tree11 = tree.clone()
    tree11.scale.set(3,3,3)
    tree11.position.set(58,12.8,1)
    this.third.add.existing(tree11)
    this.third.physics.add.existing(tree11)
    tree11.body.setCollisionFlags(2);

    const tree12 = tree.clone()
    tree12.scale.set(3,3,3)
    tree12.position.set(67,18,0.8)
    this.third.add.existing(tree12)
    this.third.physics.add.existing(tree12)
    tree12.body.setCollisionFlags(2);

    const tree13 = tree.clone()
    tree13.scale.set(4,4,4)
    tree13.position.set(87,7,1.8)
    this.third.add.existing(tree13)
    this.third.physics.add.existing(tree13)
    tree13.body.setCollisionFlags(2);

// ************************************************************************************************************************************* //
    // add car obstacle
    // this.third.physics.debug?.enable();

    // add another platform
    this.third.physics.add.box(
      { name: 'platform-additional1', x: 38,y: -2, width: 10, depth: 5, mass: 0 },
      platformMaterial
    );

    // Create & add Cars & Trucks
    const truck1 = new Truck();
    truck1.scale.set(0.025,0.025,0.025);
    truck1.position.set(40,0,0);
    truck1.rotation.x = -Math.PI/2;
    truck1.rotation.z = Math.PI;
    this.third.scene.add(truck1);
    this.third.physics.add.existing(truck1, {depth: 40, mass: 10, shape: 'mesh', width: 60, height: 30, setFriction: (999,999,999)});
    this.truck1 = truck1;

    const car1 = new Car();
    car1.scale.set(0.025,0.025,0.025);
    car1.position.set(72,23,0);
    car1.rotation.x = -Math.PI/2;
    car1.rotation.z = Math.PI;
    this.third.scene.add(car1);
    this.third.physics.add.existing(car1, {depth: 40, mass: 10, shape: 'mesh', width: 60, height: 30, setFriction: (999,999,999)});
    this.car1 = car1;

    const truck2 = new Truck();
    truck2.scale.set(0.025,0.025,0.025);
    truck2.position.set(77.5,18,0);
    truck2.rotation.x = -Math.PI/2;
    this.third.scene.add(truck2);
    this.third.physics.add.existing(truck2, {depth: 40, mass: 10, shape: 'mesh', width: 60, height: 30, setFriction: (999,999,999)});

    
    

  
    // add stars
    const svg = this.cache.html.get('star')
    const starShape = this.third.transform.fromSVGtoShape(svg)
    const starScale = 250
    const starPositions = [
      { x: -12, y: 2 },
      { x: 17, y: 2 },
      { x: 22, y: 8.5 },
      { x: 24, y: 8.5 },
      { x: 37, y: 12 },
      { x: 38, y: 12 },
      { x: 47, y: 12 },
      { x: 48, y: 13 },
      { x: 49, y: 14 },
      { x: 50, y: 15 },
      { x: 52, y: 17 },
      { x: 53, y: 18 },
      { x: 61.5, y: 16.5 },
      { x: 63, y: 22 },
      { x: 72, y: 23 },
      { x: 73, y: 24 },
      { x: 74, y: 23 },
      { x: 75, y: 22 },
      { x: 76, y: 21 },
      { x: 77, y: 17 },
      { x: 79, y: 17 },
      { x: 81, y: 17 },
      { x: 87, y: 12 }

    ]
    starPositions.forEach((pos, i) => {
      const star = this.third.add.extrude({ shape: starShape[0], depth: 120 })
      star.name = `star-${i}`
      star.scale.set(1 / starScale, 1 / -starScale, 1 / starScale)
      star.material.color.setHex(0xe6e600)
      star.position.setX(pos.x)
      star.position.setY(pos.y)
      this.third.physics.add.existing(star, {
        shape: 'box',
        ignoreScale: true,
        width: 0.5,
        height: 0.5,
        depth: 0.5
      })
      star.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true
        }
      })
      star.body.setCollisionFlags(6)
      this.stars.push(star)
    })

    /**
     * Model by Tomás Laulhé (https://www.patreon.com/quaternius), modifications by Don McCurdy (https://donmccurdy.com)
     * https://threejs.org/examples/#webgl_animation_skinning_morph
     * CC-0 license
     */
    // add robot
    this.third.load.gltf('./models/robot.glb').then(gltf => {
      this.robot = new ExtendedObject3D()
      this.robot.add(gltf.scene)
      this.robot.name = 'player'
      const scale = 1 / 3
      this.robot.scale.set(scale, scale, scale)

      this.robot.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = true
        }
      })

      // animations
      this.third.animationMixers.add(this.robot.animation.mixer)
      gltf.animations.forEach(animation => {
        this.robot.animation.add(animation.name, animation)
      })
      this.robot.animation.play('Idle')

      this.third.add.existing(this.robot)
      this.third.physics.add.existing(this.robot, {
        shape: 'capsule',
        ignoreScale: true,
        height: 0.8,
        radius: 0.4,
        offset: { y: -0.8 }
      })
      this.robot.body.setLinearFactor(1, 1, 0)
      this.robot.body.setAngularFactor(0, 0, 0)
      this.robot.body.setFriction(0)

      this.third.camera.lookAt(this.robot.position)

      // add a sensor
      const sensor = new ExtendedObject3D()
      sensor.position.setY(-0.9)
      this.third.physics.add.existing(sensor, { mass: 1e-8, shape: 'box', width: 0.2, height: 0.2, depth: 0.2 })
      sensor.body.setCollisionFlags(4)

      // connect sensor to robot
      this.third.physics.add.constraints.lock(this.robot.body, sensor.body)

      // detect if sensor is on the ground
      sensor.body.on.collision((otherObject, event) => {
        if (/platform/.test(otherObject.name)) {
          if (event !== 'end') this.robot.userData.onGround = true
          else this.robot.userData.onGround = false
        }
      })

      // check robot overlap with star
      this.robot.body.on.collision((otherObject, event) => {
        if (/star/.test(otherObject.name)) {
          if (!otherObject.userData.dead) {
            otherObject.userData.dead = true
            otherObject.visible = false
            this.score += 10
            this.no_stars ++
            this.scoreText.setText(`score: ${this.score}`)
            this.no_starsText.setText(`${this.no_stars}/23`)
            this.third.physics.destroy(otherObject)
            if(this.no_stars == 23){
              window.location.href = "victory - level 2.html";
            }
          }
        }
      })

      this.robot.body.on.collision((otherObject, event) => {
        if (/bar/.test(otherObject.name)) {
          if (event == 'collision') {
            // console.log("hello")
             console.log(event)
        
          }
        }
      })    

       // check robot overlap with enemy or obstacle*
       this.robot.body.on.collision((otherObject, event) => {
        if (/enemy/.test(otherObject.name) ||  /obs/.test(otherObject.name)) {
          if (!otherObject.userData.dead) {
            otherObject.userData.dead = true
            otherObject.visible = false
            this.third.physics.destroy(otherObject)
            this.life = this.life - 1
            this.lifeText.setText(`lives: ${this.life}`)
            if(this.life == 0 ){

              console.log('dead')
              this.third.physics.destroy(this.robot)
              this.robot.userData.dead = true
              this.robot.visible = false
              window.location.href = "gameover - level 2.html";
              //document.location.reload(true)
            }
          }
        }
      }) 
      
      // vehicles have obstacle immunity
      // check vehicle overlap with obstacle* to delete obstacle
      car1.body.on.collision((otherObject, event) => {
        if (/obs/.test(otherObject.name)) {
          if (!otherObject.userData.dead) {
            otherObject.userData.dead = true
            otherObject.visible = false
            this.third.physics.destroy(otherObject)
            // this.lifeText.setText(`lives: ${this.life}`)
          }
        }
      })
      truck2.body.on.collision((otherObject, event) => {
        if (/obs/.test(otherObject.name)) {
          if (!otherObject.userData.dead) {
            otherObject.userData.dead = true
            otherObject.visible = false
            this.third.physics.destroy(otherObject)
            // this.lifeText.setText(`lives: ${this.life}`)
          }
        }
      })


    })

    // add keys
    this.keys = {
      w: this.input.keyboard.addKey('w'),
      a: this.input.keyboard.addKey('a'),
      d: this.input.keyboard.addKey('d')
    }
  }

  walkAnimation() {
    if (this.robot.animation.current !== 'Walking') this.robot.animation.play('Walking')
  }

  idleAnimation() {
    if (this.robot.animation.current !== 'Idle') this.robot.animation.play('Idle')
  }



  update(time, delta) {
    // rotate the starts
    // (this looks strange I know, I will try to improve this in a future update)
    this.stars.forEach(star => {
      if (!star.userData.dead) {
        star.rotation.y += 0.03
        star.body.needUpdate = true
      }
    })

    this.robars.forEach(bar => {
      if (!bar.userData.dead) {
        if(bar.children[1].name == 'obs-bar'){
          bar.children[1].rotation.z += 0.015
        }
        bar.body.needUpdate = true
      }
    })

    if(this.flamingo){
      //console.log('hello')
      this.flamingo.position.x += 0.07
      const speed = 4
      const rotation = this.flamingo.getWorldDirection(this.flamingo.rotation.toVector3())
      const theta = Math.atan2(rotation.x,rotation.y)

      const x = Math.sin(theta) * speed,
        y = this.flamingo.body.velocity.y,
        z = 0

      this.flamingo.body.setVelocity(x, y, z)
      this.flamingo.body.needUpdate = true
    }

    if(this.flamingo2){
      //console.log('hello')
      this.flamingo2.position.x += 0.07

      const speed = 3
      const rotation = this.flamingo2.getWorldDirection(this.flamingo2.rotation.toVector3())
      const theta = Math.atan2(rotation.x,rotation.y)

      const x = Math.sin(theta) * speed,
        y = this.flamingo2.body.velocity.y,
        z = 0

      this.flamingo2.body.setVelocity(x, y, z)
      this.flamingo2.body.needUpdate = true
    }
    
   

    if (this.robot && this.robot.body && this.car1 && this.truck1) {

    

      //fall off platform
      if(this.robot.position.y < -2 || this.car1.position.y < -2 || this.truck1.position.y < -2){
        this.third.physics.destroy(this.robot)
        this.robot.userData.dead = true
        this.robot.visible = false
        window.location.href = "gameover - level 2.html";
        //document.location.reload(true)
      }
      else{
        // add just the camera position
        this.third.camera.position.copy(this.robot.position).add(new THREE.Vector3(0, 5, 16))

        // get rotation of robot
        const theta = this.robot.world.theta
        this.robot.body.setAngularVelocityY(0)

        // set the speed variable
        const speed = 7

        // move left
        if (this.keys.a.isDown) {
          this.robot.body.setVelocityX(-speed)
          if (theta > -(Math.PI / 2)) this.robot.body.setAngularVelocityY(-10)
          this.walkAnimation()
        }
        // move right
        else if (this.keys.d.isDown) {
          this.robot.body.setVelocityX(speed)
          if (theta < Math.PI / 2) this.robot.body.setAngularVelocityY(10)
          this.walkAnimation()
        }
        // do not move
        else {
          this.robot.body.setVelocityX(0)
          this.idleAnimation()
        }

        // jump
        if (this.keys.w.isDown && this.robot.userData.onGround && Math.abs(this.robot.body.velocity.y) < 1e-1) {
          this.robot.animation.play('WalkJump')
          this.robot.body.applyForceY(16)
        }
      }
        
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth * Math.max(1, window.devicePixelRatio / 2),
    height: window.innerHeight * Math.max(1, window.devicePixelRatio / 2)
  },
  scene: [MainScene],
  ...Canvas()
}

window.addEventListener('load', () => {
  enable3d(() => new Phaser.Game(config)).withPhysics('ammo')
})