import { ImageSourcePropType, TouchableOpacity, View } from "react-native";
import ADText from "../ADText/ADText";
import ADIBEntry from "../ADEntries/ADIBEntry";
import textStyles from "../styles/textStyles";
import { toADMonthDayDateString } from "../../functions/functions";
import ADFilledTag from "../ADTags/ADFilledTag";

interface EOViewerEventEntryProps {
  source: ImageSourcePropType;
  isoDate: string;
  blurb: string;
  status: string;
  showStatus: boolean;
  onPress?: (...args: any[]) => any;
}

const EOViewerEventEntry = (props: EOViewerEventEntryProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ADIBEntry source={props.source} height={162}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <ADText>{toADMonthDayDateString(props.isoDate)}</ADText>
          {props.status == "Scheduled" && props.showStatus && (
            <ADFilledTag
              linearGradientColors={["#0C0", "#0C0"]}
              text="Scheduled"
            />
          )}
          {props.status == "Canceled" && props.showStatus && (
            <ADFilledTag
              linearGradientColors={["#F00", "#F00"]}
              text="Canceled"
            />
          )}
          {props.status == "In Review" && props.showStatus && (
            <ADFilledTag
              linearGradientColors={["#888", "#888"]}
              text="In Review"
            />
          )}
          {props.status == "Details Changed" && props.showStatus && (
            <ADFilledTag
              linearGradientColors={["#F63", "#F63"]}
              text="Details Changed"
            />
          )}
        </View>
        <ADText style={textStyles.mediumHeading} numberOfLines={3}>
          {props.blurb}
        </ADText>
      </ADIBEntry>
    </TouchableOpacity>
  );
};

export default EOViewerEventEntry;
