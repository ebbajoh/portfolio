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

export default function ProjectShoppingCart() {
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
            Component-Based Shopping Cart System
          </Text>

          <Text style={styles.heroSubtext}>
            Reusable frontend architecture built with React and custom hooks.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            This project was developed as part of the course TDDC73, Interaction
            Programmering. The goal was to practice modern frontend development
            by building a small but complete shopping experience using reusable
            components and custom hooks.
          </Text>

          <Text style={styles.text}>
            The project focuses on separation of concerns, where application
            logic and state management are handled independently from UI
            components.
          </Text>
        </View>

        {/* ---------- Project Team ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Project Team</Text>
          <Text style={styles.text}>
            The project was developed together with Andrea Åstrand.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <Text style={styles.text}>
              • Custom shopping cart logic implemented with a reusable hook{"\n"}
              • Stateless UI components for cart rendering{"\n"}
              • Image carousel component with navigation and index tracking{"\n"}
              • Clear component APIs using typed props{"\n"}
              • Add and remove products with real-time cart updates
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>
              React{"\n"}
              TypeScript{"\n"}
              Custom React Hooks{"\n"}
              Component-based UI architecture{"\n"}
              HTML & CSS (via inline styling)
            </Text>
          </View>
        </View>

        {/* ---------- Architecture ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Architecture & Design</Text>
          <Text style={styles.text}>
            The application is structured around small and focused components.
            Core logic such as cart state and carousel navigation is encapsulated
            in custom hooks, while UI components remain stateless and declarative.
          </Text>

          <Text style={styles.text}>
            This approach improves reusability and readability, and mirrors
            patterns commonly used in frontend applications.
          </Text>
        </View>

        {/* ---------- GitHub ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Source Code</Text>
          <Pressable
            onPress={() =>
              window.open("https://github.com/ebbajoh/TDDC73", "_blank")
            }
          >
            <Text style={styles.link}>View project on GitHub</Text>
          </Pressable>
        </View>

        {/* ---------- What I Learned ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>What I Learned</Text>
          <Text style={styles.text}>
            This project really helped my understanding of component-driven
            development and state management in React. I gained practical
            experience in designing clean component APIs and separating logic
            from presentation.
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

  twoColumn: {
    maxWidth: 900,
    flexDirection: "row",
    gap: 64,
    marginBottom: 64,
  },

  column: {
    flex: 1,
  },

  link: {
    fontSize: 16,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
});
