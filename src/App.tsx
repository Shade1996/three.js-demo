import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Box from './components/Box'
import Modal from './components/Modal'
import World from './components/World'
import CameraControls from './components/CameraControls'
import { Camera } from 'three'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

export default function App() {
	
	return (
			<div className="h-screen w-screen">
				<Canvas camera={{ position: [0, 150, 1000] }}> 
				<fog attach="fog" args={['#ff6161', 0.002, 1000]} />
				<directionalLight position={[1, 1, 1]} color="#ad0071" />
				<directionalLight position={[-1, -1, -1]} color="#ffd738" />
				<ambientLight color="#444444" />
					{/* <Box position={[0, 0, 0]} /> */}
					<World />
					<Suspense fallback={null}>
						{/* <Modal /> 
						<Ball /> */}
						<OrbitControls  screenSpacePanning/>
						 {/* <Environment preset='forest' background/> */}
					</Suspense>
				</Canvas>
			</div>
	)
}
