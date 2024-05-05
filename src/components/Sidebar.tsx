import { useState } from "react";
import { AiOutlineFieldTime, AiOutlineCalendar } from "react-icons/ai";
import { RiCheckboxBlankLine, RiRadioButtonLine } from "react-icons/ri";
import { RiInputField } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { RxDividerHorizontal } from "react-icons/rx";


import ControlPanel from "./Control";

interface SortableComponent {
  id: string;
  icon: JSX.Element;
}
export let controls: SortableComponent[] = [
  { id: "Input", icon: <RiInputField /> },
  {
    id: "Radio",
    icon: <RiRadioButtonLine />,
  },
  {
    id: "Checkbox",
    icon: <RiCheckboxBlankLine />,
  },
  {
    id: "Button",
    icon: <BsCardText />,
  },
  {
    id: "Textarea",
    icon: <BsCardText />,
  },
  {id: "Divider", icon:<RxDividerHorizontal />},
  { id: "Date", icon: <AiOutlineCalendar /> },
  { id: "Time", icon: <AiOutlineFieldTime /> },
];

const Sidebar = () => {
  const [sortableItems] = useState<SortableComponent[]>(controls);

  return (
    <div className="bg-neutral-900 w-[20%]  min-h-screen">
      <h3 className="mx-2 text-white">Drag and Drop Elements</h3>
      <hr />
      <h3 className="my-2 mx-2 text-white">Form elements</h3>
      <ul className="mx-2 w-full flex flex-wrap mb-20">
        {sortableItems.map((item, index) => (
          <ControlPanel key={index} id={item.id} icon={item.icon} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
