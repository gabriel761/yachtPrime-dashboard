import { ReactNode } from "react";
const FormCard = ({ title, children }: { title: string, children: ReactNode }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark p-6.5">
                <h3 className="font-medium text-black dark:text-white">
                    {title}
                </h3>
            </div>
                <div className="p-6.5">
                    {children}
                </div>
            
        </div>
    );
}

export default FormCard;