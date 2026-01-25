import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Pressable,
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

/* ---------- Project data ---------- */
/* Orbiventure is now the last project */
const PROJECTS = [
  { id: "1", title: "Soundscaping Children’s Books", subtitle: "Interactive Systems & AI" },
  { id: "2", title: "Mood-Based Playlist Generator", subtitle: "Machine Learning & NLP" },
  { id: "3", title: "Component-Based Shopping Cart", subtitle: "Web Development & React" },
  { id: "7", title: "Barn Break", subtitle: "Game Programming & Unity" },
  { id: "5", title: "Climate Cart", subtitle: "UX & Interaction Design" },
  { id: "6", title: "Information Visualization", subtitle: "Data Visualization & Visual Analytics" },
  { id: "4", title: "Orbiventure", subtitle: "Modelling & Simulation" },
];

/* ---------- Additional coursework ---------- */
const ADDITIONAL_COURSES = [
  "Sound Physics",
  "Control Systems",
  "Calculus II",
  "Data Structures",
  "Calculus I",
  "Applied Visualization and Virtual Reality",
  "Signals and Systems",
  "Mathematical Statistics",
  "3D Computer Graphics",
  "Linear Algebra",
  "Communication and User Interface Design",
  "Computer Graphics",
  "Electronic Publishing",
  "Digital Media",
  "Introductory Mathematics",
  "Scientific Methodology",
  "Information Visualization",
  "Project Management",
  "Programming Fundamentals",
  "Applied Mathematics in Engineering and Natural Sciences",
  "Graphical Techniques",
  "Applied Transform Theory",
  "Structured Methods for User Experience (UX)",
  "Object-Oriented Programming",
  "Mechanics and Wave Physics",
  "Calculus III",
];

/* ---------- Project Card ---------- */
function ProjectCard({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle: string;
}) {
  const router = useRouter();

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const shadow = useRef(new Animated.Value(0)).current;

  const onHoverIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1.02, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: -6, useNativeDriver: true }),
      Animated.timing(shadow, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  const onHoverOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      Animated.timing(shadow, { toValue: 0, duration: 150, useNativeDriver: false }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          transform: [{ scale }, { translateY }],
          shadowOpacity: shadow.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.15],
          }),
          shadowRadius: shadow.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 16],
          }),
        },
      ]}
    >
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/project/${id}`)}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ---------- Home Screen ---------- */
export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(20)).current;

  const arrowOpacity = useRef(new Animated.Value(1)).current;
  const hasScrolled = useRef(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(heroTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y > 20 && !hasScrolled.current) {
      hasScrolled.current = true;
      Animated.timing(arrowOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <FlatList
        data={PROJECTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
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

            <Animated.View
              style={[
                styles.hero,
                { opacity: heroOpacity, transform: [{ translateY: heroTranslate }] },
              ]}
            >
              <Text style={styles.heroText}>
                Hello, my name is <Text style={styles.name}>Ebba Johansson.</Text>
              </Text>

              <Text style={styles.heroSubtext}>
                I study Media Technology (M.Sc. in Engineering){"\n"}
                at Linköping University, focusing on software development,{"\n"}
                data-driven systems, data visualization{"\n"}
                and user-centered design.
              </Text>
            </Animated.View>

            <Text style={styles.sectionTitle}>
              SELECTED PROJECTS AND COURSES
            </Text>
          </>
        }
        renderItem={({ item }) => <ProjectCard {...item} />}
        ListFooterComponent={
          <View style={styles.coursesSection}>
            <Text style={styles.coursesTitle}>Additional coursework</Text>

            <Text style={styles.coursesLead}>
              In addition to the projects shown above, I have completed coursework
              in the following areas:
            </Text>

            <View style={styles.coursesGrid}>
              {ADDITIONAL_COURSES.map((course) => (
                <Text key={course} style={styles.courseItem}>
                  {course}
                </Text>
              ))}
            </View>
          </View>
        }
      />

      <Animated.View
        style={[styles.scrollArrow, { opacity: arrowOpacity }]}
        pointerEvents="none"
      >
        <Text style={styles.arrow}>↓</Text>
      </Animated.View>
    </>
  );
}

/* ---------- Styles ---------- */

const COLORS = {
  background: "#FBF8EF",
  primary: "#082040",
  text: "#062a5d",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },

  nav: {
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

  hero: {
    marginBottom: 80,
    marginTop: 60,
  },

  heroText: {
    fontSize: 47,
    paddingLeft: 20,
    lineHeight: 46,
    color: COLORS.text,
    maxWidth: "70%",
    fontWeight: "400",
  },

  heroSubtext: {
    fontSize: 35,
    lineHeight: 40,
    color: COLORS.text,
    maxWidth: "70%",
    paddingLeft: 20,
    marginTop: 12,
    fontWeight: "200",
  },

  name: {
    fontStyle: "italic",
  },

  sectionTitle: {
    fontSize: 20,
    paddingLeft: 20,
    letterSpacing: 1,
    color: COLORS.primary,
    marginBottom: 30,
    marginTop: 200,
  },

  row: {
    gap: 16,
    marginBottom: 16,
  },

  cardWrapper: {
    flexBasis: "30.3333%",
    shadowColor: "#000",
    marginLeft: 20,
  },

  card: {
    minHeight: 150,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    padding: 20,
    backgroundColor: COLORS.background,
  },

  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 13,
    color: COLORS.primary,
    opacity: 0.7,
    lineHeight: 18,
  },

  coursesSection: {
    maxWidth: 900,
    alignSelf: "center",
    marginTop: 160,
    marginBottom: 120,
    paddingHorizontal: 20,
  },

  coursesTitle: {
    fontSize: 20,
    letterSpacing: 1,
    color: COLORS.primary,
    marginBottom: 16,
  },

  coursesLead: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.text,
    opacity: 0.8,
    marginBottom: 32,
    maxWidth: 600,
  },

  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  courseItem: {
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  scrollArrow: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  arrow: {
    fontSize: 28,
    color: COLORS.primary,
    opacity: 0.5,
  },
});
