"use client";
import TimeAgo from "react-time-ago";
import "../utils/timeAgoConfig.js";

export default function TimeAgoComponent({ createdAt }) {
  return (
    <>
      <TimeAgo date={createdAt} locale="id" timeStyle="round-minute" />
    </>
  );
}
