import { styles } from "./styles";
import { getConvertedTime } from "./utils";

export default function JobDetailsCard({ details }) {
  return (
    <div style={styles.container}>
      <h1>
        {details.url ? (
          <a href={details.url} target="_blank" style={styles.link}>
            {details.title}
          </a>
        ) : (
          details.title
        )}
        <div style={styles.postedBy}>Posted By: {details.by}</div>
        <div style={styles.postedTime}>Date: {getConvertedTime(details.time)}</div>
      </h1>
    </div>
  );
}