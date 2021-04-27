import { OrbitControls } from "@react-three/drei"
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls"
import React, { useEffect, useRef } from "react"
import { useThree } from '@react-three/fiber'

const deg2Rad = Math.PI / 180

const CameraControls: React.FC<{
    orbitX?: number, orbitY?: number, distance?: number, x?: number, y?: number, z?: number

}> = ({ orbitX: rotationX = 0, orbitY: rotationY = 0, distance = 0, x = 0, y = 0, z = 0 }) => {

    const { gl, camera } = useThree()
    const orbitControlsRef = useRef<ThreeOrbitControls>()
    console.log(orbitControlsRef)
    useEffect(() => {
        const controls = orbitControlsRef.current!
        controls.target.set(x, y, z)

        controls.minAzimuthAngle = controls.maxAzimuthAngle = rotationX * deg2Rad
        controls.minPolarAngle = controls.maxPolarAngle = (rotationY + 90) * deg2Rad
        controls.minDistance = controls.maxDistance = distance
        controls.update()
    })

    return (
        //@ts-ignore
        <OrbitControls ref={orbitControlsRef} args={[camera, gl.domElement]} enabled />
    )
}
export default CameraControls