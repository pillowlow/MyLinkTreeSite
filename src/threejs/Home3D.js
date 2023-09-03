import React,{Component} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Reflector } from "./libs/Reflector";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { colorPallette } from "../languages/colorPallette";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';




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



class ThreeScene extends Component{
    
   
    
    //This is a function to handle resizing of window
    handleWindowResize = () => {
        let newWidth, newHeight;
      
        // 如果是直式（高度 > 寬度）
        if (window.innerHeight > window.innerWidth) {
          newWidth = window.innerWidth;
          newHeight = window.innerWidth; // 讓它成為正方形
        } 
        // 如果是橫式（寬度 > 高度）
        else {
          newWidth = window.innerWidth / 2;
          newHeight = window.innerHeight; // 讓高度等於視窗高度
        }
      
        // 更新相機的長寬比和投影矩陣
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        
        // 調整渲染器的尺寸
        this.renderer.setSize(newWidth, newHeight);
      
        // 設定 canvas (或 .webgl) 的尺寸
        this.canvas.style.width = `${newWidth}px`;
        this.canvas.style.height = `${newHeight}px`;
      
        // 更新渲染
        this.renderer.render(this.scene, this.camera);
      }
      

    /*
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
        }*/

    animation = ()=>{
        
        // Update controls
        this.controls.update();
       // cam transform
       
        


        // Render
        this.renderer.setClearColor(0x000000);
        this.renderer.render(this.scene, this.camera);
        // turn spin
        try{
            //console.log(this.mesh.rotation.y);
            this.mesh.rotation.y +=0.3;
        }catch{

        }        
        

        this.composer.render(); 
        requestAnimationFrame(this.animation);
    }
    // listen
    componentDidUpdate(prevProps) {
        // 检查是否 currentPage 属性有变化
        if (this.props.currentPage !== prevProps.currentPage) {
          //console.log(`currentPage changed from ${prevProps.currentPage} to ${this.props.currentPage}`);
          
          // 根据新的 currentPage 值执行逻辑
          switch(this.props.currentPage) {
            case 'Homepage':
              this.SetColor('red');
              break;
            case 'Linkpage':
              this.SetColor('blue');
              break;
            case 'Projectpage':
              this.SetColor('yellow');
              break;
            default:
              break;
          }
        }
      }



    //Load the entire scene
    componentDidMount=()=>{

        this.size = {
            width:window.innerWidth,
            height:window.innerHeight
        }

        //setcolorout
        console.log("ThreeScene componentDidMount");
        // 傳遞 SetColor 方法給父組件
       

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
        this.camera.position.set( 15.6, 28.6, 26.0 )
        let euler = new THREE.Euler( 0.628536792447481, -0.3888148966690491, -0.10236577675077064, 'XZY' ); // 'YXZ' 是旋转顺序
        this.camera.rotation.copy( euler );
        
        
        this.scene.add(this.camera);

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true;
        // control limitation
        this.controls.minAzimuthAngle = - Math.PI / 4; 
        this.controls.maxAzimuthAngle = Math.PI / 4;   
        this.controls.minPolarAngle = Math.PI / 8;     
        this.controls.maxPolarAngle = Math.PI / 4;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 50;     

        

        // clock

        const clock = new THREE.Clock();

        // resize
        this.handleWindowResize();


        // bloom effect
         // 初始化 EffectComposer
         this.composer = new EffectComposer(this.renderer);
         this.renderPass = new RenderPass(this.scene, this.camera);
         this.composer.addPass(this.renderPass);
 
         // 添加 UnrealBloomPass
         this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
         this.bloomPass.threshold = 0.6;
         this.bloomPass.strength = 1.5;
         this.bloomPass.radius = 1;
         this.composer.addPass(this.bloomPass);




        // test bubble
        /*
        const bubbleGeometry = new THREE.SphereGeometry(3,128, 128 );
        let slimeBubble = new SlimeBubble(bubbleGeometry,{emmi_color: 0xff7f50});
        this.scene.add(slimeBubble );
        slimeBubble.position.y = 4;*/
       
        
        const loader = new FBXLoader();
        const loadpath = require('./assets/spin.fbx');
        // 當 FBXLoader 完成加載之後
        loader.load(loadpath, (fbx) => {
            this.mesh = fbx;
            this.mesh.scale.set(5,5,5);
            this.mesh.position.y = -1;
            
            // 初始化保存材質的變數
            this.redMaterials = [];
            this.blueMaterials = [];
            this.yellowMaterials = [];
            
            // 遍歷所有子對象
            this.mesh.traverse((child) => {
            if (child.isMesh) {
                // 遍歷這個 mesh 的所有材質
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach((material) => {
                if (material.name === 'red') {
                    this.redMaterials.push(material);
                } else if (material.name === 'blue') {
                    this.blueMaterials.push(material);
                } else if (material.name === 'yellow') {
                    this.yellowMaterials.push(material);
                }
                });
            }
            });
        
            this.scene.add(this.mesh);
            this.SetColor('red');
        });
        
        // set current page
        const { setCurrentPage } = this.props;
        
        
       



        // raycast
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const onClick = (event) => {
            
            event.preventDefault();
          
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          
            raycaster.setFromCamera(mouse, this.camera); // 注意 this.camera
          
            // 注意这里使用了 this.mesh
            const intersects = raycaster.intersectObjects([this.mesh]);
          
            if (intersects.length > 0) {
              

              const materialIndex = intersects[0].face.materialIndex;
              const material = intersects[0].object.material[materialIndex];
              const materialName = material.name;
              //console.log("Clicked material:", materialName);
          
              // 使用从 props 获取的 setCurrentPage 方法
              switch(materialName){
                case 'red':
                    
                    setCurrentPage('Homepage');
                    this.SetColor('red');

                    break;
                case 'blue':
                    
                    setCurrentPage('Linkpage');
                    this.SetColor('blue');


                    break;
                case 'yellow':
                    
                    setCurrentPage('Projectpage');
                    this.SetColor('yellow');

                    break;
                default:
                        
                    break;  
              }
             
             


            }
          };
         

        // reflector

        const reflectPlane = new THREE.BoxGeometry(100,1,100);
        let reflector = new Reflector(reflectPlane,{color: 0x000000, reflectStrength: 0.6});
        this.scene.add(reflector);
        reflector.position.y = -4;
        reflector.rotation.set(0,0,0);

        

        


       


        
        /*
        //Add Ambient light
        const light = new THREE.AmbientLight(0xcccccc,0.4)
        this.scene.add(light)*/

        // Add directional Light
        const directionalLight = new THREE.DirectionalLight( 0xffe4c4, 0.45 );
		directionalLight.position.set( - 1, 1, 1 );
        this.scene.add( directionalLight );    

        this.renderer.render(this.scene,this.camera)

        //Add event listener for resizing
        window.addEventListener('resize',this.handleWindowResize,false)

        // Add event listener for Fullscreen
        window.addEventListener('dblclick', this.handleFullscreen)

        window.addEventListener('click', onClick);



        this.mount.appendChild(this.renderer.domElement)

        this.animation()

    }
    SetColor = (color) => {
        //console.log("setcolor is invoked "+ color);
        switch(color){
            case 'red':
                
                this.redMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 1.5;
                    
                    const materialColor = colorPallette.red.red;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.blueMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.6; 
                    
                    const materialColor = colorPallette.red.blue;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.yellowMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.6;
                    
                    const materialColor = colorPallette.red.yellow;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor);
                  });

                break;
            case 'blue':
                

                this.redMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.8;
                    
                    const materialColor = colorPallette.blue.red;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.blueMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 2.0; 
                    
                    const materialColor = colorPallette.blue.blue;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.yellowMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.8; 
                    
                    const materialColor = colorPallette.blue.yellow;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor);  
                  });


                break;
            case 'yellow':
                

                this.redMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.6;
                    
                    const materialColor = colorPallette.yellow.red;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.blueMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 0.8;
                    
                    const materialColor = colorPallette.yellow.blue;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });
                this.yellowMaterials.forEach((material) => {
                    
                    material.emissiveIntensity = 1.5;
                    const materialColor = colorPallette.yellow.yellow;
                    material.color.set(materialColor);
                    material.emissive.set(materialColor); 
                  });

                break;
            default:
                    
                break;  
          }
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