import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";


const fetchTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export function Category() {
    const { data: tags, error, isLoading } = useQuery({ queryKey: ['tags'], queryFn: fetchTags });
    

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  

    return (<div className='container mx-auto py-2 bg-[#0aaccb] md: max-w-full'>
        <h2 className="font-custom flex justify-center text-2xl font-bold text-white mb-4">Categorías</h2>
        <div className='flex flex-wrap justify-center space-x-4 overflow-x-auto hide-scroll-bar'>
            {tags && tags.map((tag) => (
                <a 
                    key={tag.id}
                    href={`/articles/category?name=${tag.name}`} 
                    className='mb-3 text-white bg-[#0aaccb] hover:bg-[#087b9b] text-md font-medium rounded-full px-4 py-1
                    transition-colors duration-300 whitespace-nowrap'>
                        
                    {tag.name}
                          
                </a>

            ))}

        </div>
    </div>);

}

export function TopBar() {
    return (
        <div className="container mx-auto py-2 bg-[#0aaccb] md: max-w-full">
            
            <div className='flex flex-wrap justify-center space-x-4 overflow-x-auto hide-scroll-bar'>
                <div className='flex flex-wrap gap-[250px] justify-center space-x-4 overflow-x-auto hide-scroll-bar'>
                    <h2 className="font-custom flex pt-5 justify-center text-5xl font-bold text-white mb-4">Novedades</h2>
                    
                </div>
            
            </div>
        </div>
    );
}

/*
<p className='mb-3 text-white bg-[#0aaccb] hover:bg-[#087b9b] text-md font-medium rounded-full px-4 py-1
                    transition-colors duration-300 whitespace-nowrap'>
                        Articulos 
                    </p>
                    <p className='mb-3 text-white bg-[#0aaccb] hover:bg-[#087b9b] text-md font-medium rounded-full px-4 py-1
                    transition-colors duration-300 whitespace-nowrap'>
                        Expertos
                    </p>

*/