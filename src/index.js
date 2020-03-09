import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";

import "./index.css"
import IronManMtl from "./IronMan/IronMan.mtl";
import IronManObj from "./IronMan/IronMan.obj"

//basic setup: scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1)
document.body.appendChild(renderer.domElement);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1000, 10000, 1000);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add(spotLight)

let objectIronMan;

// onload function for loading manager
const loadModel = () => {
    objectIronMan.position.y = -30
    objectIronMan.position.x = 0
    objectIronMan.position.z = -300
    scene.add(objectIronMan)
    console.log("loaded function in manager executed")
}

const manager = new THREE.LoadingManager(loadModel);

manager.onStart = (url, itemsLoaded, itemsTotal) => {
    console.log("Started Loading file: " + url + ".\nLoaded" + itemsLoaded + " of " + itemsTotal + " files. ");
}

const objLoader = new OBJLoader(manager);
const mtlLoader = new MTLLoader();

mtlLoader.load(
    IronManMtl,
    (mat) => {
        mat.preload();
        objLoader.setMaterials(mat)
        objLoader.load(
            IronManObj,
            (obj) => {
                objectIronMan = obj;
                console.log("loaded function in OBJLoader executed")
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (err) => {
                console.log("Error: " + err)
            }
        )
    }
)

camera.position.z = 0;

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
})


animate()
