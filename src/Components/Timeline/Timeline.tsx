import {TimelineWrapper} from "./Timeline.style";

export interface ElementsProps {
  children: React.ReactNode;
  removable?: boolean;
  lastItem?: boolean;
}

interface TimelineProps {
  elements: ElementsProps[];
}

export const Timeline = ({elements}: TimelineProps) => {
  return (
    <TimelineWrapper>
      {elements.map((element, index) => (
        <div key={index}>
          {element.children}
          {element.removable ? <button>Remove</button> : null}
        </div>
      ))}
    </TimelineWrapper>
  );
};
