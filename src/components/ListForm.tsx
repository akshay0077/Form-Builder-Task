import { FiFilePlus } from "react-icons/fi";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const preview=(formName:string)=>{
    let allForms:any=localStorage.getItem('form');
    let formHtml=""
    if(allForms)
        {
            allForms=JSON.parse(allForms)
            formHtml= allForms[formName];
        }
    Swal.fire({
        html: formHtml,
        width: "650px",
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton:false,
        padding:0,
      })
}

const Dashboard = () => {
    const [previousForms, setPreviousForms] = useState<any[]>([]);

    useEffect(() => {
        // Retrieve form names from localStorage
        const oldForms = localStorage.getItem('form');
        
        if (oldForms) {
            const localStorageData = JSON.parse(oldForms);
            if (localStorageData) {
                const formNames = Object.keys(localStorageData);
                setPreviousForms(formNames);
            } else {
                console.log("No data found in localStorage.");
            }          
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleCreateNewForm = () => {
        window.location.href = "/addnew";
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900">
            <div className="bg-gray-800 text-white py-4 px-8">
                <h2 className="text-center font-semibold">Dhiwise Form Builder</h2>
            </div>
            <div className="flex-grow flex my-10">
                <div className="w-1/6 h-[120px] mx-5 shadow-inner rounded-md shadow-[rgba(255,255,255,0.2)] flex justify-center items-center cursor-pointer hover:bg-gray-700 transition-colors duration-300 ease-in-out" onClick={handleCreateNewForm}>
                    <Button variant="outline">
                        <FiFilePlus className="h-5 w-5 mr-1" /> Create New Form
                    </Button>
                </div>
                {previousForms.map((formName, index) => (
                    <div key={index} className="w-1/6 h-[120px] mx-5 flex justify-center items-center shadow-inner rounded-md shadow-[rgba(255,255,255,0.2)] cursor-pointer hover:bg-gray-700 transition-colors duration-300 ease-in-out" onClick={()=>preview(formName)}>
                        <div className="flex flex-col ">
                            <h2 className="text-white text-center text-xl">{formName}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-800 text-white py-4 px-8">
                <h4 className="text-center">Developed by Akshay Kher</h4>
            </div>
        </div>
    );
};

export default Dashboard;
