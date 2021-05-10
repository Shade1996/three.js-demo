import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, MeshProps, PlaneBufferGeometryProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { colorState } from '../../state'
const pillarObject3D = new THREE.Object3D()


const InstancePillar:React.FC<{ data: any }> = ({ data }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!)
    const numPoints = data.length
    useSnapshot(colorState)
    const pillars = useMemo(() => {
        const temp =[]
        for (let i = 0; i < numPoints; i++){
            const x = Math.random()*1600 - 800
            const y = 0
            const z = Math.random()*1600 - 800
            const speed = 0.01 + Math.random() / 200
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 })
        }
        return temp
    }, [data])
    useFrame((state)=>{
        const mesh = meshRef.current
        pillars.forEach((pillar, i)=>{
            let { t, factor, speed, x, y, z } = pillar
             t = pillar.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.max(1.5, Math.cos(t) * 5)
            pillar.mx += (state.mouse.x * state.viewport.width - pillar.mx) * 0.02
            pillar.my += (state.mouse.y * state.viewport.height - pillar.my) * 0.02
            
            pillarObject3D.position.set(
                (pillar.mx / 10) * a + x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (pillar.my / 10) * b + y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (pillar.my / 10) * b + z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            pillarObject3D.updateMatrix();
            mesh.setMatrixAt(i, pillarObject3D.matrix)
        })
        mesh.instanceMatrix.needsUpdate = true
        
    })
    return (
        <instancedMesh ref={meshRef} args={ 
            //@ts-ignore
            [null,null,numPoints]} frustumCulled={false}>
            <boxBufferGeometry args={[5, 20, 5]} />
            <meshPhongMaterial color="#ad0071" flatShading={true} />
        </instancedMesh>
    )
}

export default InstancePillar


