import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

export default function Box(props: JSX.IntrinsicElements['mesh']) {
	const mesh = useRef<THREE.Mesh>(null!)
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
	
  return (
	<mesh
	  {...props}
	  ref={mesh}
	  scale={active ? 1.5 : 1}
	  onClick={() => alert("hello")}
	  onPointerOver={(event) => setHover(true)}
	  onPointerOut={(event) => setHover(false)}
	>
	  <boxGeometry args={[1, 1, 1]} />
	  <meshPhongMaterial color={hovered ? 'hotpink' : 'royalblue'} />
	</mesh>
  )
}
