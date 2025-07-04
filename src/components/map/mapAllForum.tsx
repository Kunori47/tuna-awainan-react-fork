import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export type Forun = {
    id: number,
    title: string,
    description: string,
    category: string,
    latitud: number,
    longitud: number,
    ratio: number,
    profiles:{
        username: string
        user_id: number
    }
}
interface Props{
    category: string
    forums: any[]
}

const fetchInitialPosition = async () => {
    return { lat: 37.7749, lng: -122.4194 };

};

const fetchPosition = async (category: string) =>{

    const { data, error } = await supabase
    .from("posts")
    .select("longitud, latitud, profiles(username)")
    .eq('category',category);

    if (error) {
        console.error(error);
    }

    return data;
}

const updatePosition = async (position:number) => {
    return position
}

function LocationMarker(){
    const queryClient = useQueryClient();
    
    const { data: initialPosition, isLoading, error } = useQuery({
        queryKey: ['position'],
        queryFn: fetchInitialPosition,
      });

    const mutation = useMutation({
        mutationFn: updatePosition,
        onSuccess: (newPosition) => {
            queryClient.setQueryData(['position'], newPosition);
        },
    });
    
    useMapEvents({
        click(e) {
            mutation.mutate(e.latlng);
        },
    });
      
    const position = queryClient.getQueryData(['position']) || initialPosition;

    if (!position) {
        return 0;
    }

    return (
        <Marker position={[position.lat, position.lng]}>
            <Popup>
                <span className='text-center'>
                    Estoy aquí: {position.lat} y {position.lng}
                </span>
                
            </Popup>
        </Marker>
    );

}

const Map: React.FC<Props> = ({ category, forums }) => {
    
    const { data: location , isLoading, error } = useQuery({
        queryKey: ['location'],
        queryFn: () => fetchPosition(category),
    });

    const valide = forums.filter((forum) => forum.latitud !== null && forum.longitud !== null && forum.ratio !== null);
    console.log(valide)
    return (
        <MapContainer center={[8.296963, -62.711613]} zoom={13} style={{ width: '1175px', height: '550px' }} className='w-full h-full'>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <LocationMarker></LocationMarker>
            {
                //all forums 
                valide?.map((forum) =>(
                   
                    <Circle 
                            center={[forum.latitud, forum.longitud]} 
                            key={1} 
                            radius={forum.ratio } 
                            color='red'>

                            <Popup >
                                <a href={`../${forum.id}`}>
                                    <div className='pl-1'>
                                        <img src={`https://mlwyobiniqrtpednprrb.supabase.co/storage/v1/object/public/files/posts/${forum.img}`} alt="" className='w-full h-32 object-cover rounded-lg mb-2' />
                                        <h2 className='text-center text-xl text-[#0cc0df]'>
                                            {forum.title}
                                        </h2>
                                    </div>
                                    
                                </a>
                            </Popup>
                        
                        </Circle>
                ))           
            }  
        </MapContainer>
        
    )
};

export default Map;