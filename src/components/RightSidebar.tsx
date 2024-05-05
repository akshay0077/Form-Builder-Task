import { Input } from "./ui/input";
import React, { useMemo, ChangeEvent } from "react";

interface PropertyValue {
  type: string;
  value: any;
}


const RightSidebar: React.FC<any> = ({ selected,property, setProperty }) => {
  const handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (key==="type") {
      setProperty({ ...property, [selected]: { ...property[selected], selectedType: { ...property[selected][key], value: newValue } } })
    } else {
      setProperty({ ...property,[selected]: { ...property[selected], [key]: { ...property[selected][key], value: newValue } } })
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderProperty = (key: string, value: PropertyValue) => {
    if (key === "type" && Array.isArray(value.value)) {
      return (
        <li key={key} className="flex px-2 w-full justify-center items-center">
          <label className="text-white w-2/5 text-left">{key}</label>
          <select
            className="w-full p-3 mx-2 my-1 rounded-md"
            value={property[selected].selectedType.value}
            onChange={(e:any) => handleChange(key, e)}
          >
            {value.value?.map((option: string, index: number) => (
              <option className="w-full" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </li>
      );
    } else {
      return key==="selectedType" ? <></> :(
        <li key={key} className="flex px-2 justify-center items-center">
          <label className="text-white w-2/5 text-left">{key}</label>
            <Input
            type={value.type}
            value={value.value as string}
            onChange={(e) => handleChange(key, e)}
            className={value.type === "color" ? "h-[150px]" : ""}
            disabled={ key==="id"}
            />
        </li>
      );
    }
  };

  const memoizedProperty = useMemo(() => {
    let selectedProps = property[selected];
    console.log(property,selected);
    
    if (Array.isArray(selectedProps)) {
      return property[selected].map((propGroup:any, index:any) => (
        <React.Fragment key={index}>
          {Object.entries(propGroup).map(([key, value]:any) =>
            renderProperty(key, value)
          )}
        </React.Fragment>
      ));
    } else {
      return Object?.entries(selectedProps)?.map(([key, value]:any) =>
        renderProperty(key, value)
      );
    } 
  }, [property, renderProperty, selected]);
  return (
    <div className="bg-neutral-900 w-[25%] h-screen overflow-y-auto px-2">
      <h3 className="ml-5">Styling Properties</h3>
      <ul className="text-center mb-20 w-full">{memoizedProperty}</ul>
    </div>
  );
};

export default RightSidebar;
