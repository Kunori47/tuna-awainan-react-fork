import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";




export function Category() {
    const tags = [
        { id: 1, name: "Escasez del agua" },
        { id: 2, name: "Calidad del agua" },
        { id: 3, name: "Turismo del agua" },
        { id: 4, name: "Pueblos indígenas" },
        { id: 5, name: "Conservaciónm" },
    ];
    return (<div className='container mx-auto py-2 bg-[#047A8F] md: max-w-full'>
        <h2 className="font-custom flex justify-center text-2xl font-bold text-white mb-4">Categorías</h2>
        <div className='flex flex-wrap justify-center space-x-4 overflow-x-auto hide-scroll-bar'>
            {tags && tags.map((tag) => (
                <a 
                    key={tag.id}
                    href={`/articles/category?name=${tag.name}`} 
                    className='mb-3 text-white bg-[#047A8F] hover:bg-[#047A8F] text-md font-medium rounded-full px-4 py-1
                    transition-colors duration-300 whitespace-nowrap'>
                        
                    {tag.name}
                          
                </a>

            ))}

        </div>
    </div>);

}