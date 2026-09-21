import { usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const MENU = [
  { label: "HOME", route: "/" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
]as const;

const COLORS = {
  primary: "#0B1F3A",
  text: "#082143",
};

export default function TopNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
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
              style={[
                styles.navItem,
                isActive && styles.navItemActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 48,
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
});
