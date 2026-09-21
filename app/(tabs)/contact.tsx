import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Linking,
  Pressable,
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
  primary: "#0B1F3A",
  text: "#062a5d",
  muted: "#4A5D73",
};

export default function ContactScreen() {
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
    <View style={styles.container}>
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
        <Text style={styles.title}>If you would like to contact me:</Text>


        {/* ---------- Contact items ---------- */}
        <View style={styles.links}>
          <ContactItem
            label="Email"
            value="ebbajohansson999@gmail.com"
            onPress={() =>
              Linking.openURL("mailto:ebbajohansson999@gmail.com")
            }
          />

         <ContactItem
  label="LinkedIn"
  value="linkedin.com/in/ebba-johansson-411090331"
  onPress={() =>
    Linking.openURL(
      "https://www.linkedin.com/in/ebba-johansson-411090331/"
    )
  }
/>

        </View>
      </Animated.View>
    </View>
  );
}

/* ---------- Contact Item ---------- */
function ContactItem({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() =>
        Animated.spring(scale, {
          toValue: 1.03,
          useNativeDriver: true,
        }).start()
      }
      onHoverOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start()
      }
      onPressIn={() =>
        Animated.spring(scale, {
          toValue: 0.97,
          useNativeDriver: true,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start()
      }
    >
      <Animated.View style={[styles.contactItem, { transform: [{ scale }] }]}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </Animated.View>
    </Pressable>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },

  /* Navigation */
  nav: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
    marginTop: 60,
    marginBottom: 80,
    paddingRight: 40,
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

  /* Hero */
  hero: {
    maxWidth: 720,
    alignSelf: "center",
  },

  title: {
    fontSize: 40,
    color: COLORS.text,
    marginBottom: 24,
    fontWeight: "400",
  },

  lead: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.muted,
    marginBottom: 48,
    maxWidth: 600,
  },

  /* Contact items */
  links: {
    gap: 20,
  },

  contactItem: {
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    backgroundColor: COLORS.background,
  },

  contactLabel: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  contactValue: {
    fontSize: 18,
    color: COLORS.text,
  },
});
