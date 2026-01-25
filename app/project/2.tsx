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
  { label: "RESUME", route: "/resume" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
] as const;

/* ---------- Colors ---------- */
const COLORS = {
  background: "#FBF8EF",
  primary: "#062a5d",
  muted: "#4A5D73",
};

export default function ProjectMoodPlaylist() {
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
            Mood-Based Playlist Generator
          </Text>

          <Text style={styles.heroSubtext}>
            Machine learning–driven music recommendations based on user mood.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            This project was developed as part of the course{" "}
            TNM108, Machine Learning for Social Media. 
            The goal was to explore how machine learning and natural language
            processing can be used to generate personalized music playlists
            based on a description of the user’s emotional state.
          </Text>

          <Text style={styles.text}>
            By combining sentiment analysis of user input with audio features
            and lyrical analysis of songs, the system classifies moods and
            generates playlists that feel emotionally relevant and
            personalized.
          </Text>
        </View>

                {/* ---------- Project Team ---------- */}
                <View style={styles.fullSection}>
                  <Text style={styles.sectionTitle}>Project Team</Text>
                  <Text style={styles.text}>
                    The project was developed with
                    {/* Replace with real names */}
                    {" "}Andrea Belin.
                  </Text>
                </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.text}>
              • Text-based mood input analyzed using sentiment analysis (VADER){"\n"}
              • Mood classification of songs using Random Forest{"\n"}
              • TF-IDF analysis of song lyrics{"\n"}
              • Audio features such as valence and energy{"\n"}
              • Playlist generation aligned with the user’s emotional state
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>
              Python{"\n"}
              Scikit-learn{"\n"}
              Random Forest Classifier{"\n"}
              TF-IDF{"\n"}
              NLTK VADER{"\n"}
              Pandas & NumPy
            </Text>
          </View>
        </View>

        {/* ---------- What I Learned ---------- */}
      <View style={styles.fullSection}>
  <Text style={styles.sectionTitle}>What I Learned</Text>
  <Text style={styles.text}>
    In this project I learnd a lot about machine learning in a recommendation
    system and how combining different types of data can improve the
    results.
  </Text>

  <Text style={styles.text}>
    I really enjoyed working on this project and it made me more interested in
    machine learning. It also showed how personal mood and music preferences
    can be and why personalization is important especially in modern digital
    services where tailored experiences are becoming very common.
  </Text>
</View>


        {/* ---------- Project Report (Embedded PDF) ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Project Report</Text>

          <View style={styles.pdfWrapper}>
            {/* @ts-ignore — iframe is web-only */}
            <iframe
              src="/mood-playlist-report.pdf"
              title="Mood-Based Playlist Project Report"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
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
    marginBottom: 12,
  },

  bold: {
    fontWeight: "600",
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

  pdfWrapper: {
    marginTop: 24,
    width: "100%",
    height: 800,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});
