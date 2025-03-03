import { storage } from "@/app/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);

  const downloadURL = await getDownloadURL(uploadTask.ref);
  return Response.json({ url: downloadURL });
}
