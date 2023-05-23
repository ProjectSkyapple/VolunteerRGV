import { ReactNode } from "react";
import { ImageBackground, View } from "react-native";
import { ImageSourcePropType } from "react-native/types";
import entryStyles from "../styles/entryStyles";

interface ADIBEntryProps {
  source: ImageSourcePropType;
  height: number;
  children: ReactNode;
}

const ADIBEntry = (ADIBEProps: ADIBEntryProps) => {
  return (
    <ImageBackground
      source={ADIBEProps.source}
      resizeMode="cover"
      style={[
        entryStyles.baseEntryImageBackgroundStyle,
        { height: ADIBEProps.height },
      ]}
      imageStyle={entryStyles.baseEntryImageBackgroundImageStyle}
    >
      <View style={{ flex: 1 }} />
      <View style={entryStyles.baseEntryBody}>{ADIBEProps.children}</View>
    </ImageBackground>
  );
};

export default ADIBEntry;
