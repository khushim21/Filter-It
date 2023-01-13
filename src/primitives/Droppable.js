import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = useMemo(
    () => ({
      opacity: isOver ? 0.5 : 1,
    }),
    [isOver]
  );

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};
