import ReactDOMServer from "react-dom/server";
import { HiEye } from "react-icons/hi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { MdLocalMall } from "react-icons/md";
import toast from "react-hot-toast";

import { Button } from "./ui/button";
import { FormPanel } from "./Form";
import Swal from "sweetalert2";

const Navbar = (props: any) => {
  const clipboardCopyCode = () => {
    const loadingToastId = toast.loading("Copying code to clipboard...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        padding: "12px",
      },
    });

    const formHTML = ReactDOMServer.renderToString(
      <FormPanel
        droppedControls={props.currentForm}
        property={props.property}
        setProperty={props.setProperty}
        selected={props.selected}
        setSelected={props.setSelected}
        isPreview={true}
      />
    );

    const innerHTML = formHTML.substring(5, formHTML.length - 7);

    const fullHTML = `<form ${innerHTML}></form>`;

    navigator.clipboard
      .writeText(fullHTML)
      .then(() => {
        toast.success("Code copied to clipboard successfully!", {
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            padding: "12px",
          },
        });
        toast.dismiss(loadingToastId);
      })
      .catch((error) => {
        console.error("Failed to copy HTML to clipboard:", error);
        toast.error("Failed to copy code to clipboard!", {
          duration: 4000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            padding: "12px",
          },
        });
        toast.dismiss(loadingToastId);
      });
      return fullHTML;
  };

  const formPreview = () => {
    let form: any = (
      <FormPanel
        droppedControls={props.currentForm}
        property={props.property}
        setProperty={props.setProperty}
        selected={props.selected}
        setSelected={props.setSelected}
        isPreview={true}
      />
    );
    let formHTML = ReactDOMServer.renderToString(form);
    formHTML =
      "<form " + formHTML.substring(4, formHTML.length - 6) + " </form>";
    Swal.fire({
      html: formHTML,
      width: "700px",
      heightAuto: false,
      customClass: "h-[780px]",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonText: `
      <div class="w-full flex justify-center items-center">
      <svg class="mr-5" fill="#fff" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 512 512" xml:space="preserve">
   <g>
     <g>
       <path d="M507.109,71.673L440.327,4.891C437.196,1.76,432.951,0,428.522,0C425.038,0,53.485,0,50.087,0C22.469,0,0,22.469,0,50.087
         v411.826C0,489.531,22.469,512,50.087,512c15.731,0,396.124,0,411.826,0C489.531,512,512,489.531,512,461.913V83.478
         C512,79.049,510.24,74.804,507.109,71.673z M200.348,33.391h178.087v100.174H200.348V33.391z M133.565,33.391h33.391v100.174
         h-33.391V33.391z M378.435,478.609h-244.87v-33.391h244.87V478.609z M378.435,411.826h-244.87v-33.391h244.87V411.826z
          M378.435,345.043h-244.87v-33.391h244.87V345.043z M478.609,461.913c0,9.206-7.49,16.696-16.696,16.696h-50.087V294.957
         c0-9.22-7.475-16.696-16.696-16.696H116.87c-9.22,0-16.696,7.475-16.696,16.696v183.652H50.087
         c-9.206,0-16.696-7.49-16.696-16.696V50.087c0-9.206,7.49-16.696,16.696-16.696h50.087v116.87c0,9.22,7.475,16.696,16.696,16.696
         H395.13c9.22,0,16.696-7.475,16.696-16.696V33.391h9.78l57.002,57.002V461.913z"/>
     </g>
   </g>
   </svg>
   <p class="font-semibold text-[24px]">Save</p>
   </div>
      `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let name=localStorage.getItem("selectedForm");
        if(!name)
          {
            const { value: formName } = await Swal.fire({
              title: "Form Builder",
              text: "Enter your form name:",
              input: "text",
              showCancelButton: true,
              confirmButtonText: "Submit",
              cancelButtonText: "Cancel",
              inputValidator: (value) => {
                if (!value) {
                  return "You need to enter a form name!";
                }
              },
            });
            name=formName;
            localStorage.setItem('selectedForm',formName);
          }

        if (name) {
          let oldForms:any = localStorage.getItem('form');
          let formData:any;
        
          if (oldForms) {
            oldForms = JSON.parse(oldForms);
            formData = {
              ...oldForms,
              [name]: formHTML
            };
          } else {
            formData = {
              [name]: formHTML
            };
          }
        
          localStorage.setItem("form", JSON.stringify(formData));
        
          toast.success(name + " Form is Saved Successfully.....!!!!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              padding: "12px",
            },
          });
        }
         else {
          toast.error("Opps..!!!, your form is not saved..!!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      } else {
        toast.error("Opps..!!!, your form is not saved..!!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };

  const newFormBoard = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('selectedForm')
        props.setSelected("form");
        props.setCurrentForm([]);
        props.setProperty({
          form: {
            id: { type: "text", value: "form" },
            width: { type: "number", value: 300 },
            height: { type: "number", value: 40 },
            background: { type: "color", value: "#fff" },
            label: { type: "text", value: "label" },
          },
        });
        toast.success("Let`s start with new one.....!!!!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            padding: "12px",
          },
        });
      }
    });
  };
  const handleAllNewForm = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="h-[60px] w-full bg-neutral-950 flex justify-between items-center px-4">
        <h1 className="font-light text-xl text-white ">Form Builder Task</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={clipboardCopyCode}>
            <FaRegCopy className="h-5 w-5 mr-1" /> Code Copy
          </Button>
          <Button variant="outline" onClick={formPreview}>
            <HiEye className="h-5 w-5 mr-1" /> Preview
          </Button>
          <Button variant="outline" onClick={newFormBoard}>
            <MdOutlineCreateNewFolder className="h-5 w-5 mr-1" /> New Form
          </Button>
          <Button variant="outline" onClick={handleAllNewForm}>
            <MdLocalMall className="h-5 w-5 mr-1" /> All Form
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
