import {
	MapContainer,
	TileLayer,
} from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

// Declaración de tipos para Leaflet
declare global {
	interface Window {
		L: any;
	}
}

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Center = {
	lat: number;
	lng: number;
}

interface ForumMapProps {
	onLocationSelect: (location: Center) => void;
	radius: number;
}

const ForumMap: React.FC<ForumMapProps> = ({ onLocationSelect, radius }) => {
	const defaultCenter = { lat: 8.296963, lng: -62.711613 }; // Venezuela
	const [isMapReady, setIsMapReady] = useState(false);

	useEffect(() => {
		console.log("ForumMap component mounted");
		console.log("Radius:", radius);
		
		// Simular carga del mapa
		const timer = setTimeout(() => {
			setIsMapReady(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, [radius]);

	if (!isMapReady) {
		return (
			<div className="w-full h-96 bg-gray-200 flex items-center justify-center">
				<p>Cargando mapa...</p>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-gray-900 mb-2">Selecciona la ubicación del foro</h3>
				<p className="text-sm text-gray-600">Haz clic en el mapa para marcar la ubicación</p>
			</div>
			
			<div className="w-full h-96 border-2 border-gray-300 rounded-lg overflow-hidden" style={{ position: 'relative' }}>
				<MapContainer
					center={[defaultCenter.lat, defaultCenter.lng]}
					zoom={10}
					style={{ width: "100%", height: "100%" }}
					className="w-full h-full"
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
			</div>
			
			<div className="mt-2 text-sm text-gray-600">
				Radio de la zona: {radius} km
			</div>
		</div>
	);
};

export default ForumMap; 