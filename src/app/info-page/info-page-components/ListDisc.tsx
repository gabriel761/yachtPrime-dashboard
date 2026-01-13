import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";

const ListDisc = ({data}:{data: string[]}) => {
    return ( 
        <ul className="ml-4 list-disc font-light ">
            {
                data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))
            }
           
        </ul>
     );
}
 
export default ListDisc;