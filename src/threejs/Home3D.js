import React,{Component} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Water} from "./libs/Water2";
import { Reflector } from "./libs/Reflector";
import { SlimeBubble } from "./libs/SilmeBubble";

// import vertex from "./shaders/vertexShader";
// import fragment from "./shaders/fragmentShader";
// import * as dat from 'dat.gui';

/**
 * This is the main rendering component. This component consist of:
 * 1] The basic scene
 * 2] Camera
 * 3] Orbit Controls
 */

//Initialise GUI
// const gui = new dat.GUI();

const params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
};


class ThreeScene extends Component{
    
  


    //This is a function to handle resizing of window
    handleWindowResize = ()=>{
        // console.log("hello")
        
        //update the camera
        this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        // console.log(this.camera.aspect)

        //update the renderer
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.render(this.scene,this.camera)
        // this.canvas = this.renderer.domElement

    }

    // This is a function to display in fullscreen
    handleFullscreen = () => {
    
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
        if(!fullscreenElement)
        {
            if(this.canvas.requestFullscreen)
            {
                try{this.canvas.requestFullscreen()}
               catch(err){
                   console.log(err)
               }
            }
            else if(this.canvas.webkitRequestFullscreen)
            {
                this.canvas.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
    }

    animation = ()=>{
        
        // Update controls
        this.controls.update();
       // cam transform
       
        


        // Render
        this.renderer.setClearColor(0x000000);
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.animation);
    }

    //Load the entire scene
    componentDidMount=()=>{

        this.size = {
            width:window.innerWidth,
            height:window.innerHeight
        }
       
        //scene
        this.scene = new THREE.Scene()

        //renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias:true
        })
        this.renderer.setSize(this.size.width,this.size.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.toneMapping = THREE.NoToneMapping;

        // Assign the canvas
        this.canvas = this.renderer.domElement
        
        /*
            0.628536792447481, _y: -0.3888148966690491, _z: -0.30236577675077064, _order: 'XZY', _onChangeCallback: ƒ}
            Home3D.js:90 Vector3 {x: -13.730793217867078, y: 24.107525807579112, z: 25.88136484265634}
        */






        //camera
        this.camera = new THREE.PerspectiveCamera(45,this.size.width/this.size.height,0.1,100)
        this.camera.position.set( 13.730793217867078, 24.107525807579112, 25.88136484265634 )
        let euler = new THREE.Euler( 0.628536792447481, -0.3888148966690491, -0.30236577675077064, 'XZY' ); // 'YXZ' 是旋转顺序
        this.camera.rotation.copy( euler );
        
        
        this.scene.add(this.camera);

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true;

        // clock

        const clock = new THREE.Clock();


        // test bubble
        
       
        const bubbleGeometry = new THREE.SphereGeometry(3,128, 128 );
        
            
        let slimeBubble = new SlimeBubble(bubbleGeometry,{emmi_color: 0xff7f50});
       
        
        
        this.scene.add(slimeBubble );
        
       
        slimeBubble.position.y = 4;
       


        // reflector

        const reflectPlane = new THREE.BoxGeometry(100,1,100);
        let reflector = new Reflector(reflectPlane,{color: 0x000000, reflectStrength: 0.6});
        this.scene.add(reflector);
        reflector.rotation.set(0,0,0);

        

        


       


        
        
        //Add Ambient light
        const light = new THREE.AmbientLight(0xcccccc,0.4)
        this.scene.add(light)

        // Add directional Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
		directionalLight.position.set( - 1, 1, 1 );
        this.scene.add( directionalLight );    

        this.renderer.render(this.scene,this.camera)

        //Add event listener for resizing
        window.addEventListener('resize',this.handleWindowResize,false)

        // Add event listener for Fullscreen
        window.addEventListener('dblclick', this.handleFullscreen)


        this.mount.appendChild(this.renderer.domElement)

        this.animation()

    }
    
    render(){
        return(
            <div ref={
                mount=>{this.mount = mount}
            }>
            </div>
        )
    }

}

export default ThreeScene;