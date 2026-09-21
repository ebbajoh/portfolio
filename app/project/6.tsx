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

export default function ProjectInformationVisualization() {
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
            Scientific Visualization
          </Text>

          <Text style={styles.heroSubtext}>
            Designing visual representations to support analysis and
            decision-making.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            This project work was carried out as part of the course{" "}
            TNM067, Scientific Visualization. The course focused on how visual
            representations can be designed to effectively communicate data and
            support human reasoning.
          </Text>

          <Text style={styles.text}>
            Through a combination of theory and practical assignments, the work
            explored how data characteristics, task context, and human
            perception influence visualization design choices.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Key Topics</Text>
            <Text style={styles.text}>
              • Visual perception and cognition{"\n"}
              • Visual encodings (position, color, shape, size){"\n"}
              • Information density and clutter reduction{"\n"}
              • Task-oriented visualization design{"\n"}
              • Analytical reasoning through visual interfaces
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tools & Techniques</Text>
            <Text style={styles.text}>
              Visualization theory & design frameworks{"\n"}
              Sketching & prototyping{"\n"}
              Analytical task analysis{"\n"}
              Critical evaluation of visual designs
            </Text>
          </View>
        </View>

        {/* ---------- Methods ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Methods & Approach</Text>
          <Text style={styles.text}>
            The project emphasized iterative design and critical evaluation of
            visualizations. Different design alternatives were analyzed based on
            how well they supported specific analytical tasks rather than
            aesthetic appeal alone.
          </Text>

          <Text style={styles.text}>
            Design decisions were motivated using visualization theory,
            perceptual principles, and user task requirements, highlighting the
            trade-offs between accuracy, readability, and complexity.
          </Text>
        </View>

        {/* ---------- What I Learned ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>What I Learned</Text>
          <Text style={styles.text}>
            This course strengthened my understanding of how visualization
            choices directly affect interpretation and decision-making. A key
            insight was that effective visualizations are defined by how well
            they support user goals, not by visual complexity.
          </Text>

          <Text style={styles.text}>
            I also gained experience in reasoning about design trade-offs and
            justifying visual decisions based on theory and user context rather
            than intuition alone.
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
