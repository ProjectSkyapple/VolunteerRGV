import { ImageSourcePropType, TouchableOpacity } from "react-native";
import ADText from "../ADText/ADText";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";

interface EOViewerEventEntryProps {
  source: ImageSourcePropType;
  isoDate: string;
  blurb: string;
  onPress?: () => void;
}

const EOViewerEventEntry = (props: EOViewerEventEntryProps) => {
  let startDateObject = new Date(props.isoDate);
  let startDateShortString = startDateObject
    .toDateString()
    .substring(4, 10)
    .toUpperCase();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <ADIBEntry source={props.source} height={162}>
        <ADText>{startDateShortString}</ADText>
        <ADText style={textStyles.mediumHeading} numberOfLines={3}>
          {props.blurb}
        </ADText>
      </ADIBEntry>
    </TouchableOpacity>
  );
};

export default EOViewerEventEntry;
