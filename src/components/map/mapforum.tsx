import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Circle,
	useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";


type Center = {
	lat: number;
	lng: number;
}

type Zone = Center & {
	ratio: number;
}

interface Props {
	forumid:number
	zone?: Zone
	center?: Center
}

const fetchInitialPosition = async () => {
	return { lat: 37.7749, lng: -122.4194 };
};

const fetchPosition = async (forumid:number) => {
	const { data, error } = await supabase
		.from("commentpost")
		.select("longitud, latitud,content, profiles(username)")
		.eq("id_post", forumid);

	if (error) {
		console.error(error);
	}
	return data;
};

const updatePosition = async (position: number) => {
	return position;
};

function LocationMarker() {
	const queryClient = useQueryClient();

	const {
		data: initialPosition,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["position"],
		queryFn: fetchInitialPosition,
	});

	const mutation = useMutation({
		mutationFn: updatePosition,
		onSuccess: (newPosition) => {
			queryClient.setQueryData(["position"], newPosition);
		},
	});

	useMapEvents({
		click(e) {
			mutation.mutate(e.latlng);
		},
	});
	const position = queryClient.getQueryData(["position"]) || initialPosition;

	if (!position) {
		return 0;
	}

	return <Marker position={[position.lat, position.lng]}></Marker>;
}

const Map: React.FC<Props> = ({center: _center, forumid:forumId, zone: _zone, }) => {
	const {
		data: location,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["location"],
		queryFn: () => fetchPosition(forumId),
	});

	const lat = _center?.lat || 8.296963; 
	const lng = _center?.lng || -62.711613;
	return (
		<MapContainer
			center={[lat, lng]}
			zoom={13}
			style={{ width: "800px", height: "400px" }}
			className="mt-4 mx-auto w-full px-[40px]"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker></LocationMarker>
			{
				_zone?.lat && _zone.lng && _zone.ratio &&
				  <Circle 
											center={[_zone.lat, _zone.lng]} 
											key={1} 
											radius={_zone.ratio} 
											color='red'>
				 </Circle>

			}
			{location &&
				location.map((marker, index) => (
					<Marker position={[marker.latitud, marker.longitud]} key={index}>
						<Popup>
							<p className="text-[16px]">{marker.content}</p>
							<h2 className='italic'>Atte: {marker.profiles.username}</h2>
						</Popup>
					</Marker>
				))}
		</MapContainer>
	);
};

export default Map;
