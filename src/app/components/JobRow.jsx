"use client";
import { FaRegHeart } from "react-icons/fa6";
import TimeAgoComponent from "./TimeAgoComponent";
import Link from "next/link";
import axios from "axios";

export default function JobRow({ jobInfo }) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm relative  md:flex">
        <div className="absolute top-4 cursor-pointer right-4">
          <FaRegHeart className="size-4 text-gray-400" />
        </div>
        <div className="flex grow gap-4">
          <div className="content-center">
            <img
              className="size-12"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png"
              alt=""
            />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div>
                <Link
                  href={"/jobs/" + jobInfo.orgId}
                  className="text-gray-500 text-sm hover:underline"
                >
                  {jobInfo.orgName || "?"}
                </Link>
              </div>
              <div className="font-bold text-lg mb-1">
                <Link className="hover:underline" href={"/show/" + jobInfo._id}>
                  {jobInfo.title}
                </Link>
              </div>
              <div className="text-gray-500 text-sm capitalize">
                {jobInfo.remote} &middot; {jobInfo.country}, {jobInfo.city}{" "}
                &middot; | {jobInfo.type}-time
                {jobInfo.isAdmin && (
                  <>
                    {" "}
                    &middot;{" "}
                    <Link href={"/jobs/edit/" + jobInfo._id}>Edit</Link>{" "}
                    &middot;{" "}
                    <button
                      type="button"
                      onClick={async () => {
                        await axios.delete("/api/jobs?id=" + jobInfo._id);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="content-end text-gray-500 text-sm">
              <TimeAgoComponent createdAt={jobInfo.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
