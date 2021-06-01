function Ramp(){
    const db = new THREE.Group();
    
    const crownColor = 0xFF9705;
    
    const crownMaterial = new THREE.MeshLambertMaterial({
        color: crownColor
    });
    
    const crown = new THREE.Mesh(
        new THREE.SphereGeometry(30, 30, 30),
        crownMaterial
      );
    
    crown.scale.set(0.5,0.5,1)

    db.add(crown);
    
    const base = new THREE.Mesh(
        new THREE.BoxBufferGeometry(150, 10, 60),
        new THREE.MeshLambertMaterial({ color: 0xFF9705 })
      );
    base.position.set(0,15,0);
    base.rotation.z = Math.PI/8;
    
      db.add(base);

    return db;


}