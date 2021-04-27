import React, { CSSProperties, useEffect, useRef } from 'react'
import Three, { Mesh } from'three'
import { Canvas, PlaneBufferGeometryProps, useFrame } from '@react-three/fiber'
import { meshBounds } from '@react-three/drei'
import { ReactComponent } from '*.svg'


function Pillar(props:JSX.IntrinsicElements['mesh']){
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
const Pillars:React.FC=()=>{
    const scene = new Array(700).fill("").map((p,i)=>{
        const x = Math.random()*1600 - 800
        const y = 0
        const z = Math.random()*1600 - 800
        return <Pillar key={i} position={[x,y,z]} scale={[20, Math.random() * 160 + 10, 20]} />
    })
    return (
        <>
        {scene}
        </>
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
    return (
        <group>
            <Pillars />
            <Plane />
        </group>
    )
}
