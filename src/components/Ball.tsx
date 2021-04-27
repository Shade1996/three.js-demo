import { useLoader } from '@react-three/fiber'
import React from 'react'
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Ball() {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        'PavingStones092_1K_Color.jpg',
        'PavingStones092_1K_Displacement.jpg',
        'PavingStones092_1K_Normal.jpg',
        'PavingStones092_1K_Roughness.jpg',
        'PavingStones092_1K_AmbientOcclusion.jpg',
    ])
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight />
            <mesh>
                <sphereGeometry args={[1, 100, 100]} />
                <meshStandardMaterial 
                 displacementScale={0.2}
                 map={colorMap}
                 displacementMap={displacementMap}
                 normalMap={normalMap}
                 roughnessMap={roughnessMap}
                 aoMap={aoMap} 
                />
            </mesh>
        </>
    )
}
