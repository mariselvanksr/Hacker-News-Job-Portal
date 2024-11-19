import { styles } from "./styles";

export default function SearchEndBanner() {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>🔍</div>
      <div style={styles.text}>You've reached the end of the results!</div>
      <div style={styles.subtext}>Try refining your search or start over.</div>
    </div>
  );
}