export let propertyList: any = {
    Input: {
      type: { value: ["text", "number", "email", "password", "tel"] },
      placeholder: { value: "input box" },
      selectedType: { value: "text" },
    },
    Radio: {
      label: { value: "option 1" },
      groupName: { value: "gender" },
      value: { value: "" },
    },
    Checkbox: {
      label: { value: "Accept" },
      groupName: { value: "gender" },
    },
    Button: {
      label: { value: "Sign up" },
    },
    Textarea: {
      placeholder: { value: "Type your message here." },
    },
    Select: {
      placeholder: { value: "item name" },
      item: { value: ["one", "two", "three", "four"] },
    },
    Date: {
      value: { value: "05/05/2024" },
    },
  };
export  let commonProps = {
    id: { type: "text", value: "form" },
    width: { type: "number", value: 300 },
    height: { type: "number", value: 40 },
    background: { type: "color", value: "#fff" },
    label: { type: "text", value: "label" },
  };

  export let controlsData: any = {
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
  };