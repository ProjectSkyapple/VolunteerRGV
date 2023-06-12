import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ADPrimaryFilledButton from "./src/components/ADButtons/ADPrimaryFilledButton";
import ADDangerFilledButton from "./src/components/ADButtons/ADDangerFilledButton";
import ADHPCard from "./src/components/ADCards/ADHPCard";
import ADIBEntry from "./src/components/ADEntries/ADIBEntry";
import textStyles from "./src/components/styles/textStyles";
import Constants from "expo-constants";
import ADText from "./src/components/ADText/ADText";
import HomeScreen from "./src/components/screens/HomeScreen";
import AuthenticationScreen from "./src/components/screens/AuthenticationScreen";
import screenStyles from "./src/components/styles/screenStyles";

export default function App() {
  return <AuthenticationScreen />;
}
