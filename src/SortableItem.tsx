import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  children?: ReactNode;
  onDragEnd?: (args: any) => void;
}

export const SortableItem = ({
  id,
  children,
  onDragEnd,
}: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: any = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    userSelect: "none",
    width: "100%",
  };

  const handleDragEnd = (event: any) => {
    if (onDragEnd) {
      onDragEnd(event);
    }
  };

  const mergedListeners = {
    ...listeners,
    onDragEnd: handleDragEnd,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...mergedListeners}
      className="draggable-ite"
    >
      {children}
    </div>
  );
};
