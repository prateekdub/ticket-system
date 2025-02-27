import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";




export function DragDropProvider({ children, onDragEnd }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );
  return <DndContext  sensors={sensors} onDragEnd={onDragEnd}>{children}</DndContext>;
}


export function Droppable({ id, children, customClass='' }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`droppable-column ${customClass}`}>
      {children}
    </div>
  );
}

export function Draggable({ id, children, data }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
}
