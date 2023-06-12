import { ImageSourcePropType, TouchableOpacity } from "react-native";
import ADText from "../ADText/ADText";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";

interface EOViewerEventEntryProps {
  source?: ImageSourcePropType;
  isoDate: string;
  blurb: string;
  onPress?: () => void;
}

const EOViewerEventEntry = (props: EOViewerEventEntryProps) => {
  return (
    <TouchableOpacity>
      <ADIBEntry
        source={{ uri: "https://reactjs.org/logo-og.png" }}
        height={162}
      >
        <ADText>{props.isoDate}</ADText>
        <ADText style={textStyles.mediumHeading} numberOfLines={3}>
          {props.blurb}
        </ADText>
      </ADIBEntry>
    </TouchableOpacity>
  );
};

export default EOViewerEventEntry;
