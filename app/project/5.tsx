import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ---------- Navigation config ---------- */
const MENU = [
  { label: "HOME", route: "/" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
] as const;

/* ---------- Colors ---------- */
const COLORS = {
  background: "#FBF8EF",
  primary: "#062a5d",
  muted: "#4A5D73",
};

/* ---------- Climate Cart Images ---------- */
const CLIMATE_IMAGES = [
  require("../../assets/images/climate cart/climate1.png"),
  require("../../assets/images/climate cart/climate2.png"),
  require("../../assets/images/climate cart/climate3.png"),
  require("../../assets/images/climate cart/climate4.png"),
  require("../../assets/images/climate cart/climate5.png"),
  require("../../assets/images/climate cart/climate6.png"),
  require("../../assets/images/climate cart/climate7.png"),
];

export default function ProjectClimateCart() {
  const router = useRouter();
  const pathname = usePathname();

  /* Page animation */
  const pageOpacity = useRef(new Animated.Value(0)).current;
  const pageTranslate = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(pageOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pageTranslate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------- Top bar ---------- */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>

        <View style={styles.nav}>
          {MENU.map((item) => {
            const isActive =
              item.route === "/"
                ? pathname === "/"
                : pathname.startsWith(item.route);

            return (
              <Pressable
                key={item.label}
                onPress={() => router.push(item.route)}
              >
                <Text
                  style={[styles.navItem, isActive && styles.navItemActive]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* ---------- Animated content ---------- */}
      <Animated.View
        style={{
          opacity: pageOpacity,
          transform: [{ translateY: pageTranslate }],
        }}
      >
        {/* ---------- Hero ---------- */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Climate Cart – Sustainable Shopping Experience
          </Text>

          <Text style={styles.heroSubtext}>
            UX-driven interactive concept for visualizing the climate impact of
            food choices.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            Climate Cart was developed as part of the course{" "}
            TNM100, Structural Methods for User Experience (UX). The project explored how interaction design and
            visualization can be used to raise awareness of climate impact
            related to everyday food choices.
          </Text>

          <Text style={styles.text}>
            The concept places users in a virtual grocery store where they select
            food items while receiving immediate feedback on estimated CO₂e
            emissions.
          </Text>
        </View>

        {/* ---------- Project Team ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Project Team</Text>
          <Text style={styles.text}>
            The project was developed together with Andrea Åstrand, Daniel
            Laesker, and Caitlin Wu.
          </Text>
        </View>

        {/* ---------- Design Process ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Design Process</Text>
          <Text style={styles.text}>
            We followed an iterative and user-centered design process. Early work included impact mapping, information hierarchy,
            and storyboarding.
          </Text>

          <Text style={styles.text}>
            We got a lot of feedback from seminars and user testing and it informed continuous
            addjustments of interaction flow and layout.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.text}>
              • Virtual grocery store environment{"\n"}
              • Real-time CO₂e feedback{"\n"}
              • Visual comparison to national averages{"\n"}
              • Color-coded climate indicators{"\n"}
              • Game-like progression
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tools & Methods</Text>
            <Text style={styles.text}>
              Figma{"\n"}
              Impact mapping{"\n"}
              Storyboarding{"\n"}
              UX principles{"\n"}
              User testing
            </Text>
          </View>
        </View>

        {/* ---------- Visuals ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Some pictures from figma:</Text>

          {CLIMATE_IMAGES.map((img, index) => (
            <Image
              key={index}
              source={img}
              style={styles.visualImage}
              resizeMode="contain"
            />
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },

  backButton: {
    fontSize: 30,
    color: COLORS.primary,
  },

  nav: {
    flexDirection: "row",
    gap: 24,
  },

  navItem: {
    color: COLORS.primary,
    fontSize: 14,
    letterSpacing: 1,
  },

  navItemActive: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  hero: {
    maxWidth: 900,
    marginBottom: 80,
  },

  heroTitle: {
    fontSize: 47,
    lineHeight: 46,
    color: COLORS.primary,
    marginBottom: 24,
  },

  heroSubtext: {
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.muted,
    maxWidth: 720,
  },

  fullSection: {
    maxWidth: 900,
    marginBottom: 64,
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },

  text: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.primary,
    marginBottom: 12,
  },

  bold: {
    fontWeight: "600",
  },

  twoColumn: {
    flexDirection: "row",
    gap: 64,
    marginBottom: 64,
  },

  column: {
    flex: 1,
  },

  visualImage: {
    width: "100%",
    height: 420,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: "#EAE6DC",
  },
});
