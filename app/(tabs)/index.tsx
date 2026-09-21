import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

/* ---------- Navigation config ---------- */
const MENU = [
  { label: "HOME", route: "/" },
  { label: "ABOUT ME", route: "/about" },
  { label: "CONTACT", route: "/contact" },
] as const;

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

/* ---------- Climate Cart images ---------- */
const CLIMATE_IMAGES = [
  require("../../assets/images/climate cart/climate1.png"),
  require("../../assets/images/climate cart/climate2.png"),
  require("../../assets/images/climate cart/climate3.png"),
  require("../../assets/images/climate cart/climate4.png"),
  require("../../assets/images/climate cart/climate5.png"),
  require("../../assets/images/climate cart/climate6.png"),
  require("../../assets/images/climate cart/climate7.png"),
];

/* ---------- Project preview metadata ---------- */
const PROJECTS_META = [
  {
    title: "AvSpark – Women’s Football Broadcast Guide",
    accent: "27, 94, 60",
    category: "Personal Project & Web Development",
    preview:
      "A website that gathers where women’s football matches are broadcast, in one place.",
    context:
      "Built out of my own frustration with how hard it is to find where women’s football is shown. Browse upcoming matches from Damallsvenskan, WSL, Bundesliga Damer, Champions League and Liga F, see which broadcaster or streaming service has each match, and follow your favourite teams.",
    tags: ["React", "Supabase", "Google Sign-In", "Vercel"],
    image: require("../../assets/images/avspark/avspark.png"),
    imageRatio: 1440 / 900,
  },
  {
    title: "Soundscaping Children’s Books",
    accent: "58, 130, 140",
    category: "Interactive Systems & AI",
    preview:
      "Enhancing reading experiences through synchronized, AI-generated sound and music.",
    context:
      "Bachelor’s thesis project: an app that listens while an adult reads aloud to a child, understands where in the story they are, and plays or generates fitting sound effects at the right moments.",
    tags: ["React Native (Expo)", "Python", "WebSockets", "AudioGen & MusicGen", "Mixtral-8x7B"],
    image: require("../../assets/images/soundscaping/demo.jpg"),
    imageRatio: 1.25, // phone is centred, so the plain sides can be trimmed
  },
  {
    title: "Mood-Based Playlist Generator",
    accent: "236, 96, 140",
    category: "Machine Learning & NLP",
    preview:
      "Machine learning–driven music recommendations based on user mood.",
    context:
      "Course project in TNM108. You describe how you feel in words, and the system combines sentiment analysis with song audio features and lyrics to build a playlist that matches your mood.",
    tags: ["Python", "Scikit-learn", "Random Forest", "TF-IDF", "NLTK VADER"],
    image: require("../../assets/images/mood-playlist/app.png"),
    imageRatio: 1134 / 666,
  },
  {
    title: "Barn Break – 2D Platformer Game",
    accent: "230, 150, 40",
    category: "Game Programming & Unity",
    preview:
      "A Unity-based platform game developed using core game programming principles.",
    context:
      "Course project in TDDD23: a complete 2D platformer with player movement, enemies, collisions, level transitions and game state handling, built in Unity with C#.",
    tags: ["Unity (2D)", "C#"],
    image: require("../../assets/images/barn-break/playthrough_barn_break-2.gif"),
    imageRatio: 520 / 300,
  },
  {
    title: "Climate Cart – Sustainable Shopping Experience",
    accent: "110, 170, 40",
    category: "UX & Interaction Design",
    preview:
      "UX-driven interactive concept for visualizing the climate impact of food choices.",
    context:
      "Course project in TNM100. A virtual grocery store where every food choice gives instant feedback on its estimated CO₂e emissions, designed through impact mapping, storyboarding and user testing.",
    tags: ["Figma", "Impact mapping", "Storyboarding", "User testing"],
    image: require("../../assets/images/climate cart/climate1.png"),
    imageRatio: 2940 / 1652,
  },
] as ReadonlyArray<{
  title: string;
  category: string;
  preview: string;
  accent: string;
  context?: string;
  tags?: readonly string[];
  image?: number;
  imageRatio?: number;
}>;

/* ---------- Project section wrapper ---------- */
function ProjectSection({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const meta = PROJECTS_META[index];
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const flip = index % 2 === 1;
  const tint = (alpha: number) => `rgba(${meta.accent}, ${alpha})`;

  useEffect(() => {
    if (!open || Platform.OS !== "web") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reveal each project (fade + slide up) as it scrolls into view
  const ref = useRef<any>(null);
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const show = () =>
      Animated.timing(reveal, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();

    if (
      Platform.OS !== "web" ||
      typeof IntersectionObserver === "undefined" ||
      !ref.current
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reveal]);

  return (
    <Animated.View
      ref={ref}
      style={[
        detail.block,
        {
          opacity: reveal,
          transform: [
            {
              translateY: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [60, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View
        style={[
          detail.card,
          { backgroundColor: tint(0.22) },
          wide && { flexDirection: flip ? "row-reverse" : "row" },
        ]}
      >
        <View
          style={[
            detail.cardMedia,
            wide && detail.cardMediaWide,
            { aspectRatio: meta.imageRatio ?? 16 / 10 },
          ]}
        >
          {meta.image ? (
            <Image
              source={meta.image}
              style={detail.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[detail.cardPlaceholder, { backgroundColor: tint(0.3) }]}
            >
              <Text style={detail.placeholderIndex}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text style={detail.placeholderCategory}>{meta.category}</Text>
            </View>
          )}
        </View>

        <View style={[detail.cardBody, wide && detail.cardBodyWide]}>
          <View>
            <Text style={detail.index}>
              {String(index + 1).padStart(2, "0")} · {meta.category}
            </Text>
            <Text style={detail.heroTitle}>{meta.title}</Text>
            <Text style={detail.heroSubtext}>{meta.preview}</Text>

            {meta.context && (
              <Text style={detail.heroContext}>{meta.context}</Text>
            )}

            {meta.tags && (
              <View style={detail.tagRow}>
                {meta.tags.map((tag) => (
                  <Text
                    key={tag}
                    style={[detail.tag, { backgroundColor: tint(0.3) }]}
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <Pressable
            onPress={() => setOpen(true)}
            style={[detail.readMoreButton, { backgroundColor: tint(0.3) }]}
          >
            <Text style={detail.readMoreText}>
              Read more →
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={detail.modalOverlay} onPress={() => setOpen(false)}>
          {/* Inner Pressable stops clicks inside the box from closing it */}
          <Pressable
            style={[detail.modalBox, { borderTopColor: tint(0.6) }]}
            onPress={() => {}}
          >
            <View style={detail.modalHeader}>
              <Text style={detail.modalTitle} numberOfLines={2}>
                {meta.title}
              </Text>
              <Pressable
                onPress={() => setOpen(false)}
                style={[detail.modalClose, { backgroundColor: tint(0.25) }]}
                accessibilityLabel="Close"
              >
                <Text style={detail.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView
              style={detail.modalScroll}
              contentContainerStyle={detail.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </Animated.View>
  );
}

/* ---------- Project 0: AvSpark ---------- */
function AvSparkDetail() {
  return (
    <>
      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Background</Text>
        <Text style={detail.text}>
          This is a personal project that I built on my own, outside of any
          course, simply because I enjoyed it.
        </Text>
        <Text style={detail.text}>
          As a big football fan, I have long found it hard to figure out where
          women’s football matches are broadcast, even in the biggest leagues.
        </Text>
        <Text style={detail.text}>
          I therefore decided to build a website that collects information
          about where the matches can be watched. The project became a fun way
          to use my technical skills to solve a problem I had identified
          myself.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Tech Stack</Text>
        <Text style={detail.text}>
          React{"\n"}
          Supabase{"\n"}
          Google Sign-In{"\n"}
          Vercel
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Live Site</Text>
        <Pressable
          onPress={() =>
            // @ts-ignore — window is web-only
            window.open("https://avspark-damfotboll.vercel.app/", "_blank")
          }
        >
          <Text style={detail.link}>Visit AvSpark</Text>
        </Pressable>
      </View>
    </>
  );
}

/* ---------- Project 1: Soundscaping ---------- */
function SoundscapingDetail() {
  return (
    <>
      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>
          Media Technology Bachelor’s Thesis Project
        </Text>
        <Text style={detail.text}>
          This project was done as part of the Media Technology Bachelor’s
          Thesis Project. The goal was to design and develop a complete
          interactive system that enhances reading aloud to children using
          sound. The application listens to the reader in real time, analyzes
          the spoken words, and plays and create with AI a relevant sound
          effect at the right moments in the story.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Project Team</Text>
        <Text style={detail.text}>
          The project was developed in collaboration with Andrea Åstrand,
          Deema Abo Gheda, and My Vidén.
        </Text>
      </View>

      <View style={detail.twoColumn}>
        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Key Features</Text>
          <Text style={detail.text}>
            • Real-time speech-to-text analysis{"\n"}
            • Context-aware sound triggering{"\n"}
            • AI-generated sound effects{"\n"}
            • Low-latency communication via WebSockets{"\n"}
            • UX designed for both children and adults
          </Text>
        </View>

        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Tech Stack</Text>
          <Text style={detail.text}>
            React Native (Expo){"\n"}
            Python backend{"\n"}
            WebSockets{"\n"}
            Speech recognition{"\n"}
            AudioGen & MusicGen (Meta AI){"\n"}
            Mixtral-8x7B
          </Text>
        </View>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>What I Learned</Text>
        <Text style={detail.text}>
          In this project me and my group worked with visualizing software
          architecture, which helped me better understand how complex systems
          are structured. I also gained experience planning a larger project
          and working closely in a team. Since the system was used during
          live reading sessions, I learned how important it is to design for
          real-time interaction and reliability. We had strong collaboration
          throughout the project, and I gained a deeper understanding of
          communication and teamwork, as well as working with AI-generated
          audio and how timing and context directly affect the user
          experience.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Demo</Text>
      </View>

      <View style={detail.videoRow}>
        <View style={detail.videoWrapper}>
          {/* @ts-ignore — iframe is web-only */}
          <iframe
            src="https://www.youtube.com/embed/uRK5gJ2Wm2M"
            title="Soundscaping demo 1"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </View>

        <View style={detail.videoWrapper}>
          {/* @ts-ignore — iframe is web-only */}
          <iframe
            src="https://www.youtube.com/embed/NBrfUlb9ZDs"
            title="Soundscaping demo 2"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </View>
      </View>
    </>
  );
}

/* ---------- Project 2: Mood-Based Playlist Generator ---------- */
function MoodPlaylistDetail() {
  return (
    <>
      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Overview</Text>
        <Text style={detail.text}>
          This project was developed as part of the course TNM108, Machine
          Learning for Social Media. The goal was to explore how machine
          learning and natural language processing can be used to generate
          personalized music playlists based on a description of the user’s
          emotional state.
        </Text>
        <Text style={detail.text}>
          By combining sentiment analysis of user input with audio features
          and lyrical analysis of songs, the system classifies moods and
          generates playlists that feel emotionally relevant and
          personalized.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Project Team</Text>
        <Text style={detail.text}>
          The project was developed with Andrea Belin.
        </Text>
      </View>

      <View style={detail.twoColumn}>
        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Key Features</Text>
          <Text style={detail.text}>
            • Text-based mood input analyzed using sentiment analysis
            (VADER){"\n"}
            • Mood classification of songs using Random Forest{"\n"}
            • TF-IDF analysis of song lyrics{"\n"}
            • Audio features such as valence and energy{"\n"}
            • Playlist generation aligned with the user’s emotional state
          </Text>
        </View>

        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Tech Stack</Text>
          <Text style={detail.text}>
            Python{"\n"}
            Scikit-learn{"\n"}
            Random Forest Classifier{"\n"}
            TF-IDF{"\n"}
            NLTK VADER{"\n"}
            Pandas & NumPy
          </Text>
        </View>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>What I Learned</Text>
        <Text style={detail.text}>
          In this project I learnd a lot about machine learning in a
          recommendation system and how combining different types of data can
          improve the results.
        </Text>
        <Text style={detail.text}>
          I really enjoyed working on this project and it made me more
          interested in machine learning. It also showed how personal mood
          and music preferences can be and why personalization is important
          especially in modern digital services where tailored experiences
          are becoming very common.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Project Report</Text>
        <View style={detail.pdfWrapper}>
          {/* @ts-ignore — iframe is web-only */}
          <iframe
            src="/mood-playlist-report.pdf"
            title="Mood-Based Playlist Project Report"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </View>
      </View>
    </>
  );
}

/* ---------- Project 7: Barn Break ---------- */
function BarnBreakDetail() {
  return (
    <>
      <View style={detail.mediaSection}>
        <View style={detail.gifGrid}>
          <Image
            source={require("../../assets/images/barn-break/playthrough_barn_break-2.gif")}
            style={detail.gif}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/barn-break/playthrough_barn_break-3.gif")}
            style={detail.gif}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/barn-break/playthrough_barn_break-4.gif")}
            style={detail.gif}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/barn-break/playthrough_barn_break-5.gif")}
            style={detail.gif}
            resizeMode="contain"
          />
        </View>
        <Text style={detail.mediaCaption}>
          Gameplay excerpts from Barn Break
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Overview</Text>
        <Text style={detail.text}>
          Barn Break was developed as part of the course TDDD23, Game
          Programming. The project involved designing and implementing a
          complete 2D platformer game using the Unity game engine.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Project Team</Text>
        <Text style={detail.text}>
          The project was developed together with Andrea Åstrand.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Gameplay & Mechanics</Text>
        <Text style={detail.text}>
          The player navigates through 2D levels filled with obstacles and
          enemies, using movement and timing to progress. Game logic was
          implemented using Unity’s component-based architecture and C#
          scripting.
        </Text>
        <Text style={detail.text}>
          Core mechanics include player movement and jumping, collision
          detection, enemy behavior, level transitions, and basic game state
          management such as restart and game over conditions.
        </Text>
      </View>

      <View style={detail.twoColumn}>
        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Tech Stack</Text>
          <Text style={detail.text}>
            Unity (2D){"\n"}
            C#{"\n"}
            Physics & collision systems{"\n"}
            Game loops & state management{"\n"}
            Component-based architecture
          </Text>
        </View>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>What I Learned</Text>
        <Text style={detail.text}>
          In this project I got experience with real-time interactive systems
          and game development workflows. A big takeaway was how small
          changes in physics parameters and control logic can significantly
          impact player experience.
        </Text>
        <Text style={detail.text}>
          I also got some experience in structuring game logic, debugging and
          iterating on gameplay based on testing and feedback.
        </Text>
      </View>
    </>
  );
}

/* ---------- Project 5: Climate Cart ---------- */
function ClimateCartDetail() {
  return (
    <>
      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Overview</Text>
        <Text style={detail.text}>
          Climate Cart was developed as part of the course TNM100, Structural
          Methods for User Experience (UX). The project explored how
          interaction design and visualization can be used to raise awareness
          of climate impact related to everyday food choices.
        </Text>
        <Text style={detail.text}>
          The concept places users in a virtual grocery store where they
          select food items while receiving immediate feedback on estimated
          CO₂e emissions.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Project Team</Text>
        <Text style={detail.text}>
          The project was developed together with Andrea Åstrand, Daniel
          Laesker, and Caitlin Wu.
        </Text>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Design Process</Text>
        <Text style={detail.text}>
          We followed an iterative and user-centered design process. Early
          work included impact mapping, information hierarchy, and
          storyboarding.
        </Text>
        <Text style={detail.text}>
          We got a lot of feedback from seminars and user testing and it
          informed continuous addjustments of interaction flow and layout.
        </Text>
      </View>

      <View style={detail.twoColumn}>
        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Key Features</Text>
          <Text style={detail.text}>
            • Virtual grocery store environment{"\n"}
            • Real-time CO₂e feedback{"\n"}
            • Visual comparison to national averages{"\n"}
            • Color-coded climate indicators{"\n"}
            • Game-like progression
          </Text>
        </View>

        <View style={detail.column}>
          <Text style={detail.sectionTitle}>Tools & Methods</Text>
          <Text style={detail.text}>
            Figma{"\n"}
            Impact mapping{"\n"}
            Storyboarding{"\n"}
            UX principles{"\n"}
            User testing
          </Text>
        </View>
      </View>

      <View style={detail.fullSection}>
        <Text style={detail.sectionTitle}>Some pictures from figma:</Text>
        {CLIMATE_IMAGES.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={detail.visualImage}
            resizeMode="contain"
          />
        ))}
      </View>
    </>
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
      Animated.timing(arrowOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.nav}>
          {MENU.map((item) => {
            const isActive =
              item.route === "/" ? pathname === "/" : pathname.startsWith(item.route);

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

        <Text style={styles.sectionTitle}>SELECTED PROJECTS AND COURSES</Text>

        <ProjectSection index={0}>
          <AvSparkDetail />
        </ProjectSection>
        <ProjectSection index={1}>
          <SoundscapingDetail />
        </ProjectSection>
        <ProjectSection index={2}>
          <MoodPlaylistDetail />
        </ProjectSection>
        <ProjectSection index={3}>
          <BarnBreakDetail />
        </ProjectSection>
        <ProjectSection index={4}>
          <ClimateCartDetail />
        </ProjectSection>

        <View style={styles.coursesSection}>
          <Text style={styles.coursesTitle}>Additional coursework</Text>

          <Text style={styles.coursesLead}>
            In addition to the projects shown above, I have completed
            coursework in the following areas:
          </Text>

          <View style={styles.coursesGrid}>
            {ADDITIONAL_COURSES.map((course) => (
              <Text key={course} style={styles.courseItem}>
                {course}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>

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
  scrollView: {
    backgroundColor: COLORS.background,
  },

  container: {
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

  coursesSection: {
    maxWidth: 900,
    alignSelf: "center",
    marginTop: 40,
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

/* ---------- Project detail styles (shared across inline project sections) ---------- */

const DETAIL_COLORS = {
  primary: "#062a5d",
  muted: "#4A5D73",
};

const detail = StyleSheet.create({
  block: {
    maxWidth: 1200,
    marginBottom: 72,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    gap: 24,
    overflow: "hidden",
  },

  cardMedia: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },

  cardMediaWide: {
    flex: 1,
    width: undefined,
    alignSelf: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardPlaceholder: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },

  placeholderIndex: {
    fontSize: 96,
    lineHeight: 96,
    color: DETAIL_COLORS.primary,
    opacity: 0.5,
    fontWeight: "300",
  },

  placeholderCategory: {
    fontSize: 14,
    color: DETAIL_COLORS.primary,
    opacity: 0.6,
    letterSpacing: 0.5,
    marginTop: 8,
  },

  cardBody: {
    justifyContent: "space-between",
    gap: 24,
  },

  cardBodyWide: {
    flex: 1,
    paddingVertical: 8,
  },

  readMoreButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  readMoreText: {
    fontSize: 22,
    color: DETAIL_COLORS.primary,
    fontWeight: "600",
  },

  index: {
    fontSize: 13,
    color: DETAIL_COLORS.primary,
    opacity: 0.6,
    letterSpacing: 0.5,
    marginBottom: 16,
  },

  hero: {
    marginBottom: 56,
  },

  heroTitle: {
    fontSize: 34,
    lineHeight: 38,
    color: DETAIL_COLORS.primary,
    fontWeight: "400",
    marginBottom: 16,
  },

  heroSubtext: {
    fontSize: 20,
    lineHeight: 28,
    color: DETAIL_COLORS.muted,
    maxWidth: 720,
  },

  heroContext: {
    fontSize: 16,
    lineHeight: 26,
    color: DETAIL_COLORS.primary,
    maxWidth: 720,
    marginTop: 16,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },

  tag: {
    fontSize: 13,
    color: DETAIL_COLORS.primary,
    fontWeight: "500",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    maxWidth: 720,
    aspectRatio: 16 / 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(8, 32, 64, 0.15)",
    marginTop: 28,
  },

  category: {
    fontSize: 13,
    color: DETAIL_COLORS.primary,
    opacity: 0.55,
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  readMore: {
    fontSize: 15,
    color: DETAIL_COLORS.primary,
    fontWeight: "600",
    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(8, 32, 64, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  modalBox: {
    width: "100%",
    maxWidth: 900,
    maxHeight: "90%",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderTopWidth: 6,
    overflow: "hidden",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 28,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(8, 32, 64, 0.15)",
  },

  modalTitle: {
    flex: 1,
    fontSize: 22,
    color: DETAIL_COLORS.primary,
    fontWeight: "500",
  },

  modalClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  modalCloseText: {
    fontSize: 18,
    color: DETAIL_COLORS.primary,
  },

  modalScroll: {
    flexGrow: 0,
  },

  modalContent: {
    padding: 28,
  },

  fullSection: {
    marginBottom: 48,
  },

  sectionTitle: {
    fontSize: 18,
    color: DETAIL_COLORS.primary,
    marginBottom: 16,
    fontWeight: "500",
  },

  text: {
    fontSize: 16,
    lineHeight: 26,
    color: DETAIL_COLORS.primary,
    marginBottom: 12,
  },

  twoColumn: {
    flexDirection: "row",
    gap: 64,
    marginBottom: 48,
  },

  column: {
    flex: 1,
  },

  link: {
    fontSize: 16,
    color: DETAIL_COLORS.primary,
    textDecorationLine: "underline",
  },

  videoRow: {
    flexDirection: "row",
    gap: 24,
  },

  videoWrapper: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: DETAIL_COLORS.primary,
    backgroundColor: "#000",
  },

  pdfWrapper: {
    marginTop: 24,
    width: "100%",
    height: 800,
    borderWidth: 0.5,
    borderColor: DETAIL_COLORS.primary,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },

  imageWrapper: {
    width: "65%",
    aspectRatio: 1,
    borderRadius: 5,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  visualImage: {
    width: "100%",
    height: 420,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: "#EAE6DC",
  },

  mediaSection: {
    marginBottom: 56,
  },

  gifGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  gif: {
    width: "48%",
    height: 200,
    borderRadius: 12,
  },

  mediaCaption: {
    fontSize: 13,
    color: DETAIL_COLORS.muted,
    marginTop: 16,
    textAlign: "center",
  },
});
