import { Pressable, StyleSheet, Text } from "react-native";
import { Project } from "../constants/projects";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Pressable style={styles.card}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.subtitle}>{project.subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0B3CDE",
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B3CDE",
  },
  subtitle: {
    fontSize: 12,
    color: "#0B3CDE",
    opacity: 0.7,
  },
});
