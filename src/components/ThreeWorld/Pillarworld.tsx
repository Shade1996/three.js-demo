import React, { Suspense } from 'react'
import { Canvas, PlaneBufferGeometryProps, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBO } from '@react-three/drei'
import InstancePillar from './InstancePillar'
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing'
function Plane (props:JSX.IntrinsicElements['mesh']){
    return(
        <mesh position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]} >
            <planeBufferGeometry args={[1800, 1800]} ref={(p:PlaneBufferGeometryProps) => p && p.translate!(0,0.5,0)} />
            <meshPhongMaterial color="#ad0071" flatShading={true}  />
        </mesh>
    )
}


const  Pillarworld:React.FC<{ data?: any }> = ({ data }) => {
    return (
        <Canvas 
		 camera={{ position: [0, 120, 800] }}
				gl={{ antialias: false, alpha: false }}
			// camera={{ position: [0, 0, 15], near: 5, far: 20 }}
		> 
			<fog attach="fog" args={['#ff6161', 0.002, 1000]} />
			<directionalLight position={[1, 1, 1]} color="#ad0071" />
			{/* <directionalLight position={[-1, -1, -1]} color="#ffd738" /> */}
			<ambientLight color="#444444" />
			<Suspense fallback={null}>
				{/* <Modal /> 
				<Ball /> */}
				{/* <OrbitControls  screenSpacePanning/> */}
			</Suspense>
			<InstancePillar data={data}/>
			<EffectComposer multisampling={0}>
			<SSAO samples={31} radius={10}  luminanceInfluence={0.1} />
			<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />

			</EffectComposer>
			
		</Canvas>
    )
}

export default Pillarworld
