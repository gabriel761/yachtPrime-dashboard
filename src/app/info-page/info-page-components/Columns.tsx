

export type DataColumns = {
    icon: React.ReactNode,
    title?: string,
    body?: string,
    onClick?: Function
}
type props = {
    data:DataColumns []
    boxStyle?: string,
    titleStyle?: string,
    bodyStyle?: string
}

const Columns = ({data, boxStyle, titleStyle, bodyStyle}:props) => {
    
    return (
        <div  className=" flex flex-col lg:flex-row gap-[20px] ">
            {data.map((item, index) => (
                <div onClick={() => item.onClick && item.onClick()} key={index} className={`flex flex-col basis-0 grow py-[40px] px-[40px] gap-[30px] ${boxStyle} cursor-pointer hover:scale-[1.02] transition transition-all duration-300`}>
                    {item.icon}
                    <h3 className={` font-title  ${titleStyle}`}>{item.title}</h3>
                    <p className={` ${bodyStyle}`}>{item.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Columns;