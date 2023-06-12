import { FlatList, ScrollView, View } from "react-native";
import ADText from "../ADText/ADText";
import EOViewerEventEntry from "../ADEntries/EOViewerEventEntry";
import screenStyles from "../styles/screenStyles";
import textStyles from "../styles/textStyles";
import { EOEvent } from "../../types/EOEvent";

interface HomeSubscreenProps {
  type: "feed" | "following" | "your-shares";
  data: EOEvent[];
}

const HomeSubscreen = (props: HomeSubscreenProps) => {
  return (
    <ScrollView
      style={screenStyles.baseScreenScrollView}
      contentContainerStyle={{ rowGap: 18 }}
    >
      <ADText
        style={[{ textAlign: "center", margin: 18 }, textStyles.largeHeading]}
      >
        Your feed.
      </ADText>

      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <EOViewerEventEntry
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            isoDate={item["Start Date"]}
            blurb={item["Blurb"]}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ padding: 9 }} />}
        /* TODO: ListEmptyComponent */
      />
    </ScrollView>
  );
};

export default HomeSubscreen;
