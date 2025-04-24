import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';


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

                            <Popup>
                                <h2>
                                    {forum.title}
                                </h2>
                            </Popup>
                        
                        </Circle>
                ))

            
                
            }  
        </MapContainer>
        
    )
};

export default Map;