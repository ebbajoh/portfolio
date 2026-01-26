import { usePathname, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

/* ---------- Navigation config (same as index) ---------- */
const MENU = [
  { label: "HOME", route: "/" },
  { label: "RESUME", route: "/resume" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
] as const;

export default function ResumeScreen() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Navigation */}
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


      {/* Resume image */}
      <View style={styles.imageWrapper}>
     <Image
  source={require("../../assets/images/ebbaJohCV.png")}
  style={styles.image}
  resizeMode="contain"
/>

      </View>
    </ScrollView>
  );
}

/* ---------- Styles ---------- */

const COLORS = {
  background: "#FBF8EF",
  primary: "#0B1F3A",
  text: "#062a5d",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: "center",
  },

  /* Navigation */
  nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
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

  /* Title */
  title: {
    fontSize: 40,
    color: COLORS.text,
    marginBottom: 48,
    fontWeight: "400",
  },

  /* Resume image */
  imageWrapper: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: COLORS.text,
  },

  image: {
    width: "100%",
    height: 1200, // tweak if needed
  },
});
