'use client';
import { useEffect, useState } from 'react';

export default function Home() {
	const [data, setData] = useState([]);
	const [generalizedData, setGeneralizedData] = useState([]);

	useEffect(() => {
		fetch('/data.json')
			.then((response) => response.json())
			.then(setData);

		fetch('/generalized_data.json')
			.then((response) => response.json())
			.then(setGeneralizedData);
	}, []);

	const handleGeneralize = async () => {
		await fetch('/api/generalize?l=2');
		const response = await fetch('/generalized_data.json');
		const updatedData = await response.json();
		setGeneralizedData(updatedData);
	};

	return (
		<div className='min-h-screen bg-gray-900 p-4'>
			<div className='container mx-auto'>
				<h1 className='text-4xl font-bold text-center mb-6 text-white'>
					L-Diversity Data Anonymization
				</h1>

				<div className='shadow-md rounded-lg p-6 mb-6'>
					<h2 className='text-2xl font-semibold mb-4 text-white'>
						Data Comparison
					</h2>
					<table className='min-w-full bg-gray-800 text-white'>
						<thead>
							<tr>
								<th className='py-2 px-4'>Patient ID</th>
								<th className='py-2 px-4'>Original Age</th>
								<th className='py-2 px-4'>Generalized Age</th>
								<th className='py-2 px-4'>Original ZIP Code</th>
								<th className='py-2 px-4'>Generalized ZIP Code</th>
								<th className='py-2 px-4'>Original Diagnosis</th>
								<th className='py-2 px-4'>Generalized Diagnosis</th>
							</tr>
						</thead>
						<tbody>
							{data.map((original, index) => {
								const generalized = generalizedData[index];
								return (
									<tr key={original.patientId}>
										<td className='border py-2 px-4'>{original.patientId}</td>
										<td className='border py-2 px-4'>{original.age}</td>
										<td className='border py-2 px-4'>{generalized?.age}</td>
										<td className='border py-2 px-4'>{original.zipCode}</td>
										<td className='border py-2 px-4'>{generalized?.zipCode}</td>
										<td className='border py-2 px-4'>{original.diagnosis}</td>
										<td className='border py-2 px-4'>
											{generalized?.diagnosis}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<button
					onClick={handleGeneralize}
					className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300'>
					Generalize Data
				</button>
			</div>
		</div>
	);
}
