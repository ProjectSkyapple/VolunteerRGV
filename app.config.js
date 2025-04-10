import "dotenv/config";

export default {
  expo: {
    name: "VolunteerRGV",
    slug: "VolunteerRGV",
    version: "0.1.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#eeeeee",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon-foreground.png",
        backgroundColor: "#0061ff",
        backgroundImage: "./assets/adaptive-icon-background.png",
        monochromeImage: "./assets/adaptive-icon-monochrome.png",
      },
      package: "com.avgeekydev.VolunteerRGV",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    plugins: ["expo-secure-store"],
  },
};
