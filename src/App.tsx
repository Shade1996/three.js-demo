import Pillarworld from './components/ThreeWorld/Pillarworld'
const data = new Array(700).fill(0).map((d, id) => ({ id }));

export default function App() {
	
	return (
			<div className="h-screen w-screen bg-black">
				<Pillarworld data={data} />
			</div>
	)
}
