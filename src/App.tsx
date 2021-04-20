import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import Box from './components/Box'
import Modal from './components/Modal'

export default function App() {
	return (
			<div className="h-screen w-screen">
				<Canvas>
					<ambientLight intensity={0.1} />
					<directionalLight  position={[0,0,5]} />
					{/* <Box position={[0, 0, 0]} /> */}
					<Suspense fallback={null}>
						<Modal />
						<OrbitControls />
						<Environment preset='forest' background/>
					</Suspense>
					
				</Canvas>
			</div>
	)
}
