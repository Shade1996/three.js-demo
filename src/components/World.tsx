import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import Three, { Mesh, Object3D } from'three'
import { Canvas, MeshProps, PlaneBufferGeometryProps, useFrame } from '@react-three/fiber'
import { meshBounds } from '@react-three/drei'
import { ReactComponent } from '*.svg'
import { JsxAttributes } from 'typescript'
import * as THREE from 'three'

const tempObject = new THREE.Object3D()

const Pillar:React.FC<{ speed?: number, props?:MeshProps }> = ({ speed, ...props })=>{
    const mesh = useRef<THREE.Mesh>(null!)
   
    useFrame(()=> {
        mesh.current.position && (mesh.current.position.y = 20*Math.cos(Math.PI*Math.random()))
        mesh.current.position && (mesh.current.position.z += 0.2)
    })
    return(
        <mesh {...props} ref={mesh}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhongMaterial color="#ad0071" flatShading={true} />
        </mesh>
    )
}
const Pillars:React.FC=( count , ...props)=>{
    const mesh = useRef<THREE.Mesh>()
    const [dummy] = useState(() => new THREE.Object3D())

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
        const t = Math.random() * 100
        const factor = 20 + Math.random() * 100
        const speed = 0.01 + Math.random() / 200
        const xFactor = -40 + Math.random() * 80
        const yFactor = -20 + Math.random() * 40
        const zFactor = -20 + Math.random() * 40
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    
    // const scene = new Array(700).fill("").map((p,i)=>{
        const x = Math.random()*1600 - 800
        const y = 0
        const z = Math.random()*1600 - 800
    //     return <Pillar key={i} position={[x,y,z]} scale={[20, Math.random() * 160 + 10, 20]} />
    // })
  
    return (
        //@ts-ignore
    <instancedMesh ref={mesh} args={[null, null, count]} castShadow receiveShadow {...props}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color="#ad0071" flatShading={true} />
    </instancedMesh>
    )
}
function Plane (props:JSX.IntrinsicElements['mesh']){
    return(
        <mesh position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]} >
            <planeBufferGeometry args={[1800, 1800]} ref={(p:PlaneBufferGeometryProps) => p && p.translate!(0,0.5,0)} />
            <meshPhongMaterial color="#ad0071" flatShading={true}  />
        </mesh>
    )
}
export default function World(props: JSX.IntrinsicElements['mesh']) {
    const meshRef = useRef<THREE.InstancedMesh>(null!)
    const prevRef = useRef()

    useEffect(()=>{
        for (let i = 1; i < 1000 ; i++){
            tempObject.position.set(Math.random()*1600 - 800,0,Math.random()*1600 - 800)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i,tempObject.matrix)
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    })
    useFrame((state)=>{
        const time = state.clock.getElapsedTime()
        meshRef.current.position.y = Math.sin(time / 2)
    })

    
    return (
        <group>
        <instancedMesh ref={meshRef} args={
            //@ts-ignore
            [null, null, 700]} castShadow  {...props}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshPhongMaterial color="black" flatShading={true} />
        </instancedMesh>
        <Plane />
        </group>
    )
}

