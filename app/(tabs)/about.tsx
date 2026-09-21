import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
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

  // Handwriting font for the sketchy speech bubble (web only)
  useEffect(() => {
    if (Platform.OS !== "web" || document.getElementById("caveat-font")) return;
    const link = document.createElement("link");
    link.id = "caveat-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap";
    document.head.appendChild(link);
  }, []);

  /* ---------- Speech bubble animation ---------- */
  const bubblePop = useRef(new Animated.Value(0)).current;
  const bubbleFloat = useRef(new Animated.Value(0)).current;

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

    // Bubble pops in after the hero has appeared, then floats gently
    Animated.timing(bubblePop, {
      toValue: 1,
      delay: 2000,
      duration: 500,
      easing: Easing.out(Easing.back(2)),
      useNativeDriver: true,
    }).start();

    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(bubbleFloat, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(bubbleFloat, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    );
    float.start();
    return () => float.stop();
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
        <View style={styles.imageWrapper}>
          <View style={styles.imageFrame}>
            <Image
              source={require("../../assets/images/ebba.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Speech bubble saying hello */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.bubble,
              {
                opacity: bubblePop,
                transform: [
                  {
                    translateY: bubbleFloat.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -6],
                    }),
                  },
                  { rotate: "-4deg" },
                  { scale: bubblePop },
                ],
              },
            ]}
          >
            {/* Second, slightly off outline gives a hand-drawn double line */}
            <View style={styles.bubbleSketch} />
            <View style={styles.bubbleBody}>
              <Text style={styles.bubbleText}>Hej!</Text>
            </View>
            <View style={styles.bubbleTail} />
          </Animated.View>
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
            I have always liked how tech mixes logic and creativity. What I
            enjoy most is when problem-solving meets design, like in software
            development, data visualization and user-centered systems. I love
            building things that work well but are also easy and nice to use.
            To me, problem-solving can also be about leading a whole project,
            and I really like following one from the first idea all the way to
            the finished result.
          </Text>

          <Text style={styles.heroSubtext}>
            Outside of my studies, I enjoy spending time cooking, listening to
            music, and being with my boyfriend and friends. I am also a big
            football fan, and I love following women’s football in particular.
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
  imageWrapper: {
    width: 280,
    height: 360,
  },

  bubble: {
    position: "absolute",
    top: 22,
    left: -72,
  },

  // Irregular corner radii and a hard, offset shadow give a sketched look
  bubbleBody: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 6,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 4 },
  },

  bubbleSketch: {
    position: "absolute",
    top: -3,
    left: 3,
    right: -3,
    bottom: 3,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    opacity: 0.45,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 26,
    transform: [{ rotate: "2deg" }],
  },

  bubbleText: {
    fontSize: 30,
    lineHeight: 36,
    color: COLORS.primary,
    fontWeight: "600",
    fontFamily: '"Caveat", "Bradley Hand", "Segoe Print", cursive',
  },

  // Small rotated square that points the bubble towards the photo
  bubbleTail: {
    position: "absolute",
    right: 12,
    bottom: -9,
    width: 15,
    height: 15,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLORS.primary,
    transform: [{ rotate: "38deg" }],
  },

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
