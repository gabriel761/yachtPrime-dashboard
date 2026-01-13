
type props = {
    data: {
            key: string,
            data: string | number
        }[]
    
}
const TwoColTable = ({data}:props) => {
    return ( 
        <table className="w-full font-light">
            <tbody>
                {
                    data.map((item: any, index) => (
                        <tr key={index} className="w-full">
                            <td className="w-[50%] ">{item.key}</td>
                            <td className="w-[50%]">{item.data}</td>
                        </tr>
                    ))
                }


            </tbody>
        </table>
     );
}
 
export default TwoColTable;