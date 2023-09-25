import {ElementsProps} from "./Timeline";
import {
  Content,
  Line,
  TimelineItemWrapper,
  RemoveContainer,
} from "./Timeline.style";
import {ReactComponent as DeleteIcon} from "./../../Assets/Icons/RemoveCircle.svg";
import {ReactComponent as PinCircleIcon} from "./../../Assets/Icons/PinCircle.svg";
import {ReactComponent as PinMapIcon} from "./../../Assets/Icons/PinMap.svg";

export const TimelineItem = ({
  children,
  removable,
  lastItem = false,
  onRemoveItem,
}: ElementsProps) => {
  const handleRemoveClick = () => {
    onRemoveItem && onRemoveItem();
  };

  return (
    <TimelineItemWrapper>
      <Line $lastItem={lastItem}>
        {lastItem ? <PinMapIcon /> : <PinCircleIcon />}
      </Line>
      <Content>{children}</Content>
      <RemoveContainer>
        {removable && (
          <button type="button" aria-label="Remove" onClick={handleRemoveClick}>
            <DeleteIcon />
          </button>
        )}
      </RemoveContainer>
    </TimelineItemWrapper>
  );
};
