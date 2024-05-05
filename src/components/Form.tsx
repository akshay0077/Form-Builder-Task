import { useDroppable } from "@dnd-kit/core";
import { commonProps, propertyList } from "../helpers/ControlProperty";
import { Control as ControlType } from "./Control";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { DateTimePicker } from "./ui/date-time-picker/date-time-picker";
import { TimePicker } from "./ui/date-time-picker/time-picker";

export const FormPanel: React.FC<{
  droppedControls: ControlType[];
  setProperty: any;
  property: any;
  selected: any;
  setSelected: any;
  isPreview:any
}> = (props) => {
  let controlsData: any = {
    Input: {
      nextId: 0,
    },
    Radio: {
      nextId: 0,
    },
    Checkbox: {
      nextId: 0,
    },
    Button: {
      nextId: 0,
    },
    Textarea: {
      nextId: 0,
    },
    Select: {
      nextId: 0,
    },
    Date: {
      nextId: 0,
    },
    Time: {
      nextId: 0,
    },
    Hr:{
      nextId:0,
    }
  };

  const { isOver, setNodeRef } = useDroppable({
    id: "form",
  });

  const style = {
    border: isOver ? "2px dashed black" : "2px dashed transparent",
  };

  const handleClick = (controlId: string, control: any) => {
    props.setSelected(controlId);
    props.setProperty({
      ...props.property,
      [controlId]: {
        ...props.property[controlId],
        ...commonProps,
        id: { type: "text", value: controlId },
      },
    });
  };

  const renderControl = (controlId: any, id: any) => {
    switch (controlId) {
      case "Input":
        return (
          <div className="w-full flex  justify-start items-center">
            <label htmlFor={props.property[id]?.id?.value} className="mr-2">
              {props.property[id]?.label?.value}
            </label>
            <Input
              id={props.property[id]?.id?.value}
              placeholder={props.property[id]?.placeholder?.value}
              type={props.property[id]?.selectedType?.value}
              style={{
                width: props.property[id]?.width?.value + "px",
                height: props.property[id]?.height?.value + "px",
                background: props.property[id]?.background?.value,
              }}
              readOnly={!props.isPreview}
            />
          </div>
        );
      case "Radio":
        return (
          <div className="w-full flex  justify-start items-center">
            <Input
              name={props.property[id]?.groupName?.value}
              id={props.property[id]?.id?.value}
              placeholder={props.property[id]?.placeholder?.value}
              type={"radio"}
              
              style={{
                width: props.property[id]?.width?.value + "px",
                height: props.property[id]?.height?.value + "px",
                background: props.property[id]?.background?.value,
              }}
              readOnly={!props.isPreview}
            />
            <label htmlFor={props.property[id]?.id?.value} className="mr-2">
              {props.property[id]?.label?.value}
            </label>
          </div>
        );
      case "Checkbox":
        return (
          <div className="w-full flex  justify-start items-center">
            <Input
              name={props.property[id]?.groupName?.value}
              id={props.property[id]?.id?.value}
              placeholder={props.property[id]?.placeholder?.value}
              type="checkbox"
              value={props.property[id]?.value?.value}
              style={{
                width: props.property[id]?.width?.value + "px",
                height: props.property[id]?.height?.value + "px",
                background: props.property[id]?.background?.value,
              }}
              readOnly={!props.isPreview}
            />
            <label htmlFor={props.property[id]?.id?.value} className="mr-2">
              {props.property[id]?.label?.value}
            </label>
          </div>
        );
      case "Button":
        return (
          <div className="w-full flex  justify-start items-center">
            <Button
              id={props.property[id]?.id?.value}
              style={{
                width: props.property[id]?.width?.value + "px",
                height: props.property[id]?.height?.value + "px",
                background:
                  props.property[id]?.background?.value === "#fff"
                    ? props.property[id]?.background?.value === "rgba(0,0,0,.2)"
                    : props.property[id]?.background?.value,
              }}
            >
              <label htmlFor={props.property[id]?.id?.value} className="mr-2">
                {props.property[id]?.label?.value || "Button"}
              </label>
            </Button>
          </div>
        );
      case "Textarea":
        return (
          <div className="w-full flex  justify-start items-center">
            <label htmlFor={props.property[id]?.id?.value} className="mr-2">
              {props.property[id]?.label?.value}
            </label>
            <Textarea
              name={props.property[id]?.groupName?.value}
              id={props.property[id]?.id?.value}
              placeholder={props.property[id]?.placeholder?.value}
              style={{
                width: props.property[id]?.width?.value + "px",
                height: props.property[id]?.height?.value + "px",
                background: props.property[id]?.background?.value,
              }}
              readOnly={!props.isPreview}
            ></Textarea>
          </div>
        );
      case "Date":
        return (
          <div className="w-full flex  justify-start items-center">
            <DateTimePicker value={props.property[id]?.value?.value} 
            />
          </div>
        );
      case "Time":
        return (
          <div className="w-full flex  justify-start items-center">
            <TimePicker />
          </div>
        );
      case "Hr":
        return(
          <hr/>
        )
      default:
        return <></>;
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full flex flex-col justify-center items-center "
    >
      <h2 className="my-[7px]">Form Builder</h2>
      <div
        className="border border-solid border-gray-500 rounded-md my-[2px] py-5 px-5 overflow-y-auto"
        style={{
          minHeight: "600px",
          minWidth: "500px",
          width: props.property["form"]?.width?.value + "px",
          height: props.property["form"]?.height?.value + "px",
          background: props.property["form"]?.background?.value,
        }}
      >
        {props.droppedControls.map((control: ControlType) => {
          if (controlsData[control.id]?.nextId === undefined) return null;
          controlsData[control.id].nextId += 1;
          const controlId = `${control.id}-${controlsData[control.id].nextId}`;
          return (
            <div
              key={controlId}
              id={controlId}
              className="mb-2"
              onClick={() => handleClick(controlId, control.id)}
            >
              {renderControl(control.id, controlId)}
            </div>
          );
        })}
      </div>
    </div>
  );

};


