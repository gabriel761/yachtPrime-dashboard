import { Proprietario } from "@/types/applicationTypes/Proprietario";

const SearchRecommendations = ({data, onClick}:{data?:Proprietario[], onClick: (id: Proprietario) => void}) => {
    if(data?.length == 0) return null
    return ( 
        <ul className={`custom-select absolute bg-white z-20 w-full text-black appearance-none rounded-lg border border-stroke transition shadow-default  dark:border-form-strokedark dark:bg-form-input absolute z-99 max-h-300 overflow-y-auto overflow-x-hidden`}>
            {
                data?.map((item) => 
                  <li key={item.id} onClick={() => onClick(item)}>{item.nome}</li>  
                )
            }
        </ul>
     );
}
 
export default SearchRecommendations;