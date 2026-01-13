const Container = ({children}:{children: React.ReactNode}) => {
    return ( 
        <div className="container mx-auto xl:px-[75px] px-[20px]">
            {children}
        </div>
     );
}
 
export default Container;