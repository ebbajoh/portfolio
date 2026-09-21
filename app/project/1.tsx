import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
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

export default function ProjectSoundscaping() {
  const router = useRouter();
  const pathname = usePathname();

  /* ---------- Page animation ---------- */
  const pageOpacity = useRef(new Animated.Value(0)).current;
  const pageTranslate = useRef(new Animated.Value(16)).current;

  /* ---------- Back button animation ---------- */
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
      {/* ---------- Top bar (Back + Menu) ---------- */}
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
                transform: [{ scale: backScale }, { translateX: backTranslate }],
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

      {/* ---------- Animated Page Content ---------- */}
      <Animated.View
        style={{
          opacity: pageOpacity,
          transform: [{ translateY: pageTranslate }],
        }}
      >
        {/* ---------- Hero ---------- */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Soundscaping Children’s Books</Text>
          <Text style={styles.heroSubtext}>
            Enhancing reading experiences through synchronized,
            AI-generated sound and music.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>
            Media Technology Bachelor’s Thesis Project
          </Text>
          <Text style={styles.text}>
            This project was done as part of the Media Technology
            Bachelor’s Thesis Project. The goal was to design and develop a
            complete interactive system that enhances reading aloud to children
            using sound. The application listens to the reader in real time,
            analyzes the spoken words, and plays and create with AI a relevant sound effect at the
            right moments in the story.
          </Text>
        </View>

        {/* ---------- Project Team ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Project Team</Text>
          <Text style={styles.text}>
            The project was developed in collaboration with
            {/* Replace with real names */}
            {" "}Andrea Åstrand, Deema Abo Gheda, and My Vidén.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.text}>
              • Real-time speech-to-text analysis{"\n"}
              • Context-aware sound triggering{"\n"}
              • AI-generated sound effects{"\n"}
              • Low-latency communication via WebSockets{"\n"}
              • UX designed for both children and adults
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>
              React Native (Expo){"\n"}
              Python backend{"\n"}
              WebSockets{"\n"}
              Speech recognition{"\n"}
              AudioGen & MusicGen (Meta AI){"\n"}
              Mixtral-8x7B
            </Text>
          </View>
        </View>

        {/* ---------- What I Learned ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>What I Learned</Text>
          <Text style={styles.text}>
            In this project me and my group worked with visualizing software architecture, which helped me better understand how complex systems are structured. I also gained experience planning a larger project and working closely in a team. Since the system was used during live reading sessions, I learned how important it is to design for real-time interaction and reliability. We had strong collaboration throughout the project, and I gained a deeper understanding of communication and teamwork, as well as working with AI-generated audio and how timing and context directly affect the user experience.
          </Text>
        </View>

        {/* ---------- Demo ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Demo</Text>
        </View>

        <View style={styles.videoRow}>
          <View style={styles.videoWrapper}>
            {/* @ts-ignore — iframe is web-only */}
            <iframe
              src="https://www.youtube.com/embed/uRK5gJ2Wm2M"
              title="Soundscaping demo 1"
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </View>

          <View style={styles.videoWrapper}>
            {/* @ts-ignore — iframe is web-only */}
            <iframe
              src="https://www.youtube.com/embed/NBrfUlb9ZDs"
              title="Soundscaping demo 2"
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </View>
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
    alignItems: "center",
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
    fontWeight: "400",
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
    color: COLORS.primary,
    marginBottom: 16,
    fontWeight: "500",
  },

  text: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.primary,
  },

  twoColumn: {
    maxWidth: 900,
    flexDirection: "row",
    gap: 64,
    marginBottom: 64,
  },

  column: {
    flex: 1,
  },

  videoRow: {
    flexDirection: "row",
    gap: 24,
    maxWidth: 900,
  },

  videoWrapper: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    backgroundColor: "#000",
  },
});
