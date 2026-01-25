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
  { label: "RESUME", route: "/resume" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
] as const;

const COLORS = {
  background: "#FBF8EF",
  primary: "#0B1F3A",
  text: "#062a5d",
  muted: "#4A5D73",
};

export default function AboutScreen() {
  const router = useRouter();
  const pathname = usePathname();

  /* ---------- Hero animation ---------- */
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(heroTranslate, {
        toValue: 0,
        duration: 600,
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
      {/* ---------- Navigation ---------- */}
      <View style={styles.nav}>
        {MENU.map((item) => {
          const isActive =
            item.route === "/"
              ? pathname === "/"
              : pathname.startsWith(item.route);

          return (
            <Pressable key={item.label} onPress={() => router.push(item.route)}>
              <Text style={[styles.navItem, isActive && styles.navItemActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ---------- Hero ---------- */}
      <Animated.View
        style={[
          styles.hero,
          { opacity: heroOpacity, transform: [{ translateY: heroTranslate }] },
        ]}
      >
        {/* Image */}
        <View style={styles.imageFrame}>
          <Image
            source={require("../../assets/images/ebba.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Text */}
        <View style={styles.heroTextWrapper}>
          <Text style={styles.heroText}>
            Hi, my name is <Text style={styles.name}>Ebba Johansson</Text>. I am 26
            years old and grew up in Sollentuna, just outside of Stockholm. I moved
            to Norrköping to study a technical foundation year, and later began
            studying Media Technology. I am now approaching the end of my studies
            here.
          </Text>

          <Text style={styles.heroSubtext}>
            My interest in technology comes from the combination of logic and
            creativity. I enjoy working in areas where problem-solving meets
            design, such as software development, data visualization, and
            user-centered systems. I find it especially rewarding to create
            solutions that are not only technically sound, but also easy to
            understand and pleasant to use.
          </Text>

          <Text style={styles.heroSubtext}>
            Outside of my studies, I enjoy spending time cooking, listening to
            music, and being with my boyfriend and friends.
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

  /* Navigation */
  nav: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
    paddingRight: 40,
    marginBottom: 80,
  },

  navItem: {
    color: COLORS.text,
    fontSize: 14,
    letterSpacing: 1,
  },

  navItemActive: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  /* Hero layout */
  hero: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: 1000,
    alignSelf: "center",
    gap: 64,
  },

  /* Image */
  imageFrame: {
    width: 280,
    height: 360,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  /* Text */
  heroTextWrapper: {
    flex: 1,
    maxWidth: 560,
  },

  heroText: {
    fontSize: 20,
    lineHeight: 30,
    color: COLORS.text,
    marginBottom: 20,
  },

  heroSubtext: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.muted,
    marginBottom: 16,
  },

  name: {
    fontStyle: "italic",
  },
});
