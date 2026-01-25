import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const PROJECTS = [
  {
    id: "1",
    title: "Portfolio Website",
    subtitle: "React Native",
    description:
      "A personal portfolio built with React Native and Expo, focused on clean design and performance.",
  },
  {
    id: "2",
    title: "Data Analysis Tool",
    subtitle: "Python",
    description:
      "A data analysis tool using Python and Pandas for processing large datasets.",
  },
  // lägg till fler här
];

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.subtitle}>{project.subtitle}</Text>
      <Text style={styles.description}>{project.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8EF",
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: "#0B3CDE",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#0B3CDE",
    opacity: 0.7,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#001455",
  },
});
