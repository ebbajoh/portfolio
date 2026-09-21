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

/* ---------- Images ---------- */
const ORBIVENTURE_IMAGES = [
  
  require("../../assets/images/orbiventure/start-2.png"),

  require("../../assets/images/orbiventure/chooseplanet.png"),
 
  require("../../assets/images/orbiventure/ingame.png"),
];

/* ---------- Colors ---------- */
const COLORS = {
  background: "#FBF8EF",
  primary: "#062a5d",
  muted: "#4A5D73",
};

export default function ProjectOrbiventure() {
  const router = useRouter();
  const pathname = usePathname();

  const pageOpacity = useRef(new Animated.Value(0)).current;
  const pageTranslate = useRef(new Animated.Value(16)).current;

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
        <Pressable onPress={() => router.back()}>
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
              <Pressable key={item.label} onPress={() => router.push(item.route)}>
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
            Orbiventure – Gravitational Slingshot Simulation
          </Text>

          <Text style={styles.heroSubtext}>
            Game-based visualization of orbital mechanics and gravitational
            forces.
          </Text>
        </View>

        {/* ---------- Overview ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.text}>
            This project was developed as part of the course TNM085, Modelling and
            Simulation. The goal was to model a physical system using differential
            equations, simulate it numerically, and visualize the result through
            a graphical application.
          </Text>

          <Text style={styles.text}>
            The result is a game-like simulation where a spacecraft is launched
            into space and influenced by the gravitational pull of one or two
            planets, demonstrating orbital motion and gravitational slingshot
            effects.
          </Text>
        </View>

        {/* ---------- Project Team ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Project Team</Text>
          <Text style={styles.text}>
            The project was developed together with Andrea Åstrand, Mira
            Bjerkhagen and Daniel Laesker.
          </Text>
        </View>

        {/* ---------- Method ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Method & Simulation</Text>
          <Text style={styles.text}>
            The system was modeled using Newton’s laws of motion and gravitation.
            Forces were used to calculate acceleration and velocity, which were
            updated over time.
          </Text>

          <Text style={styles.text}>
            Euler’s method was used for numerical integration. Early simulations
            were created in MATLAB before being implemented in Python.
          </Text>
        </View>

        {/* ---------- Two-column section ---------- */}
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Tech Stack</Text>
            <Text style={styles.text}>
              Python{"\n"}
              PyGame{"\n"}
              MATLAB{"\n"}
              Numerical methods{"\n"}
              Physics-based modeling
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>What I Learned</Text>
            <Text style={styles.text}>
              This project helped me better understand numerical simulation and
              physical modeling. I learned how equations turn into simulations,
              and how things like time steps and stability affect the results.
            </Text>
          </View>
        </View>

        {/* ---------- Visuals ---------- */}
        <View style={styles.fullSection}>
          <Text style={styles.sectionTitle}>Some pictures:</Text>

          <View style={styles.imageGrid}>
            {ORBIVENTURE_IMAGES.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={img}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ))}
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

  /* ---------- Images ---------- */
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },

  imageWrapper: {
    width: "65%",
    aspectRatio: 4 / 4,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
