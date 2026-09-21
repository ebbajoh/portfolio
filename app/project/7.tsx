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

export default function ProjectBarnBreak() {
  const router = useRouter();
  const pathname = usePathname();

  /* Page animation */
  const pageOpacity = useRef(new Animated.Value(0)).current;
  const pageTranslate = useRef(new Animated.Value(16)).current;

  /* Back button animation */
  const backScale = useRef(new Animated.Value(1)).current;
  const backTranslate = useRef(new Animated.Value(0)).current;

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
        <Pressable
          onPress={() => router.back()}
          onHoverIn={() => {
            Animated.parallel([
              Animated.spring(backScale, {
                toValue: 1.1,
                useNativeDriver: true,
              }),
              Animated.spring(backTranslate, {
                toValue: -6,
                useNativeDriver: true,
              }),
            ]).start();
          }}
          onHoverOut={() => {
            Animated.parallel([
              Animated.spring(backScale, {
                toValue: 1,
                useNativeDriver: true,
              }),
              Animated.spring(backTranslate, {
                toValue: 0,
                useNativeDriver: true,
              }),
            ]).start();
          }}
        >
          <Animated.Text
            style={[
              styles.backButton,
              {
                transform: [
                  { scale: backScale },
                  { translateX: backTranslate },
                ],
              },
            ]}
          >
            ←
          </Animated.Text>
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
            Barn Break – 2D Platformer Game
          </Text>

          <Text style={styles.heroSubtext}>
            A Unity-based platform game developed using core game programming
            principles.
          </Text>
        </View>

        {/* ---------- Media ---------- */}
        <View style={styles.mediaSection}>
          <View style={styles.gifGrid}>
            <Image
              source={require("../../assets/images/barn-break/playthrough_barn_break-2.gif")}
              style={styles.gif}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/barn-break/playthrough_barn_break-3.gif")}
              style={styles.gif}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/barn-break/playthrough_barn_break-4.gif")}
              style={styles.gif}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/barn-break/playthrough_barn_break-5.gif")}
              style={styles.gif}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.mediaCaption}>
            Gameplay excerpts from Barn Break
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            Barn Break was developed as part of the course{" "}
            TDDD23, Game Programming.
   The project involved designing and implementing
            a complete 2D platformer game using the Unity game engine.
          </Text>

        </View>

              {/* ---------- Project Team ---------- */}
                <View style={styles.fullSection}>
                  <Text style={styles.sectionTitle}>Project Team</Text>
                  <Text style={styles.text}>
                    The project was developed together with Andrea Åstrand.
                  </Text>
                </View>

        {/* ---------- Gameplay ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Gameplay & Mechanics</Text>
          <Text style={styles.text}>
            The player navigates through 2D levels filled with obstacles and
            enemies, using movement and timing to progress. Game logic
            was implemented using Unity’s component-based architecture and C#
            scripting.
          </Text>

          <Text style={styles.text}>
            Core mechanics include player movement and jumping, collision
            detection, enemy behavior, level transitions, and basic game state
            management such as restart and game over conditions.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>
              Unity (2D){"\n"}
              C#{"\n"}
              Physics & collision systems{"\n"}
              Game loops & state management{"\n"}
              Component-based architecture
            </Text>
          </View>

        </View>

        {/* ---------- What I Learned ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>What I Learned</Text>
          <Text style={styles.text}>
            In this project I got experience with real-time interactive
            systems and game development workflows. A big takeaway was how small
            changes in physics parameters and control logic can significantly
            impact player experience.
          </Text>

          <Text style={styles.text}>
            I also got some experience in structuring game logic, debugging
            and iterating on gameplay based on testing and
            feedback.
          </Text>
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

  /* Top bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 80,
  },

  backButton: {
    fontSize: 30,
    color: COLORS.primary,
  },

  /* Navigation */
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

  /* Hero */
  hero: {
    maxWidth: 900,
    marginBottom: 80,
  },

  heroTitle: {
    fontSize: 47,
    lineHeight: 46,
    color: COLORS.primary,
    fontWeight: "400",
    marginBottom: 24,
  },

  heroSubtext: {
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.muted,
    maxWidth: 720,
  },

  /* Media */
  mediaSection: {
    maxWidth: 900,
    marginBottom: 80,
  },

  gifGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  gif: {
    width: "48%",
    height: 200,
    borderRadius: 12,
  },

  mediaCaption: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 16,
    textAlign: "center",
  },

  /* Sections */
  fullSection: {
    maxWidth: 900,
    marginBottom: 64,
  },

  sectionTitle: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 16,
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

  /* Two-column layout */
  twoColumn: {
    maxWidth: 900,
    flexDirection: "row",
    gap: 64,
    marginBottom: 64,
  },

  column: {
    flex: 1,
  },
});
