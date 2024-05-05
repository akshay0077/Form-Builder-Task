import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Control as ControlType } from "./components/Control";
import Navbar from "./components/Navbar";
import ListForm from "./components/ListForm";
import Sidebar from "./components/Sidebar";
import { FormPanel } from "./components/Form";
import RightSidebar from "./components/RightSidebar";

import { commonProps, propertyList } from "./helpers/ControlProperty";

const NewForm: React.FC = () => {
  const [droppedControls, setDroppedControls] = useState<ControlType[]>([]);
  const [selected, setSelected] = useState<any>("form");
  const [property, setProperty] = useState<any>({
    [selected]: { ...commonProps },
  });
  function countOccurrences(arr: any, element: string) {
    return arr.reduce((count: any, currentValue: any) => {
      return currentValue === element ? count + 1 : count;
    }, 0);
  }
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active && active.id !== over.id) {
      let keys = Object.keys(property).map((prop) => prop.split("-")[0]);
      let newId = active.id + "-" + (countOccurrences(keys, active.id) + 1);
      setProperty({
        ...property,
        [newId]: { ...commonProps, ...propertyList[active.id] },
      });
      setDroppedControls([...droppedControls, active]);
      setSelected(newId);
    }
  };
  return (
    <div className="overflow-hidden h-screen w-screen">
      <Navbar
        currentForm={droppedControls}
        setCurrentForm={setDroppedControls}
        property={property}
        setProperty={setProperty}
        selected={selected}
        setSelected={setSelected}
      />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-screen">
          <Sidebar />
          <SortableContext items={[]} strategy={horizontalListSortingStrategy}>
            <div className="flex-1 bg-white p-4 border border-gray-300">
              <FormPanel
                droppedControls={droppedControls}
                property={property}
                setProperty={setProperty}
                selected={selected}
                setSelected={setSelected}
                isPreview={false}
              />
            </div>
          </SortableContext>
          <RightSidebar
            selected={selected}
            property={property}
            setProperty={setProperty}
          />
        </div>
      </DndContext>
      <Toaster
        toastOptions={{
          className: "bg-neutral-950",
        }}
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
};
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListForm />} />
        <Route path="/addnew" element={<NewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
