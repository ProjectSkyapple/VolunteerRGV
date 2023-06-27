import { ImageSourcePropType, TouchableOpacity } from "react-native";
import ADText from "../ADText/ADText";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";
import { toADMonthDayDateString } from "../../functions/functions";

interface EOViewerEventEntryProps {
  source: ImageSourcePropType;
  isoDate: string;
  blurb: string;
  onPress?: () => void;
}

const EOViewerEventEntry = (props: EOViewerEventEntryProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ADIBEntry source={props.source} height={162}>
        <ADText>{toADMonthDayDateString(props.isoDate)}</ADText>
        <ADText style={textStyles.mediumHeading} numberOfLines={3}>
          {props.blurb}
        </ADText>
      </ADIBEntry>
    </TouchableOpacity>
  );
};

export default EOViewerEventEntry;
