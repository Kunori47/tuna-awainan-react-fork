import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";


export function NewContent() {
    const tags = [
        { id: 1, name: "Artículos" },
        { id: 2, name: "Expertos" },
        { id: 3, name: "community/introCommunity" },

    ];
    return (<div className='container mx-auto py-2 bg-[#047A8F] md: max-w-full'>
        <h2 className="font-custom flex justify-center text-2xl font-bold text-white mb-4">Novedades</h2>
        <div className='flex flex-wrap justify-center space-x-4 overflow-x-auto hide-scroll-bar'>
            {tags && tags.map((tag) => (
                <a 
                    key={tag.id}
                    href={`#${tag.name}`} 
                    className='mb-3 text-white bg-[#047A8F] hover:bg-[#047A8F] text-md font-medium rounded-full px-4 py-1
                    transition-colors duration-300 whitespace-nowrap'>
                        
                    {tag.name}
                          
                </a>

            ))}

        </div>
    </div>);

}