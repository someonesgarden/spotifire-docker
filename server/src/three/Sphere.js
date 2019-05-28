import * as THREE from 'three';
export const Sphere = {
    group  : null,
    shapes : [],
    move   : new THREE.Vector3( 0, 0, 0 ),
    ease   : 8,

    create( box, scene ) {
        this.group   = new THREE.Object3D();
        let shape1   = new THREE.CircleGeometry( 1, 10 );
        let shape2   = new THREE.CircleGeometry( 2, 20 );
        let points   = new THREE.SphereGeometry( 100, 30, 14 ).vertices;
        let material = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0, side: THREE.DoubleSide } );
        let center   = new THREE.Vector3( 0, 0, 0 );
        let radius   = 12;

        for ( let i = 0; i < points.length; i++ ) {
            let { x, y, z } = points[ i ];
            let home  = { x, y, z };
            let cycle = THREE.Math.randInt( 0, 100 );
            let pace  = THREE.Math.randInt( 10, 30 );
            let shape = new THREE.Mesh( ( i % 2 ) ? shape1 : shape2, material );

            shape.position.set( x, y, z );
            shape.lookAt( center );
            shape.userData = { radius, cycle, pace, home };
            this.group.add( shape );
        }
        this.group.position.set( 500, 0, 0 );
        this.group.rotation.x = ( Math.PI / 2 ) + .6;
        scene.add( this.group );
    },

    update( box, mouse, freq ) {
        let bass = ( Math.floor( freq[ 1 ] | 0 ) / 255 );
        this.move.x = ( box.width * .06 ) + -( mouse.x * 0.02 );
        this.group.position.x += ( this.move.x - this.group.position.x ) / this.ease;
        this.group.position.y += ( this.move.y - this.group.position.y ) / this.ease;
        this.group.position.z = 10 + ( bass * 80 );
        this.group.rotation.y -= 0.003;

        for ( let i = 0; i < this.group.children.length; i++ ) {
            let shape = this.group.children[ i ];
            let { radius, cycle, pace, home } = shape.userData;
            shape.position.set( home.x, home.y, home.z );
            shape.translateZ( bass * Math.sin( cycle / pace ) * radius );
            shape.userData.cycle++;
        }
    },
};
