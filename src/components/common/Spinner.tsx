const Spinner = ({size = 20}:{size?:number}) => {
    return ( 
        <div style={{width: size, height: size}} className="animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
     );
}
 
export default Spinner;