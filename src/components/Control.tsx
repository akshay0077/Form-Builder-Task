import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export interface Control {
    id: string;
    icon: any;
}

export interface Property {
    id: string;
    name: string;
    value: string;
}

const ControlPanel: React.FC<Control> = ({ id, icon }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = {
        transform: CSS.Transform.toString(transform), 
    };
    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className="cursor-move mt-4 p-2 w-[100px] h-[100px]"
        >
                <li className="w-full h-full flex justify-center items-center rounded-md text-white border border-neutral-500 hover:bg-gray-200 hover:text-black transition duration-500 ease-in-out flex-col">
                    {icon}
                    {id}
                </li>
            
        </div>

    );
};
export default ControlPanel