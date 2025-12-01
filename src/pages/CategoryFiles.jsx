import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../components/firebase";
import { storage } from "../components/firebase";
import { Link } from "react-router";


const LABELS = {
    summarize: "Summarize",
    testbank: "Test Bank",
    slides: "Slides",
    resources: "Resources",
};

export default function CategoryFiles() {
    const { deptKey, subjectCode, sectionKey } = useParams();
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const q = query(
            collection(db, "files"),
            where("deptKey", "==", deptKey),
            where("subjectCode", "==", subjectCode),
            where("sectionKey", "==", sectionKey)
        );

        const unsub = onSnapshot(q, (snap) => {
            const list = snap.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
            setFiles(list);
        });

        return () => unsub();
    }, [deptKey, subjectCode, sectionKey]);

    async function handleUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const path = `${deptKey}/${subjectCode}/${sectionKey}/${Date.now()}-${file.name}`;
            const storageRef = ref(storage, path);

            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);

            await addDoc(collection(db, "files"), {
                deptKey,
                subjectCode,
                sectionKey,
                name: file.name,
                url,
                size: file.size,
                contentType: file.type,
                storagePath: path,
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#05192d] bg-gradient-to-b from-[#092037] to-[#05182b]">

            <section className="max-w-6xl mx-auto px-5 py-10">
                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white 
                               bg-white/10 hover:bg-white/20 border border-white/10 
                               px-4 py-2 rounded-xl text-sm transition mb-6"
                >
                    <span className="text-lg">←</span> Back
                </Link>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs text-white/50 uppercase tracking-[0.25em]">
                            {deptKey.toUpperCase()} • {subjectCode}
                        </p>
                        <h1 className="text-2xl font-bold text-white mt-1">
                            {LABELS[sectionKey] || "Section"}
                        </h1>
                        <p className="text-white/60 text-sm mt-2">
                            Upload and browse files for this section.
                        </p>
                    </div>

                    <label className="inline-flex items-center px-4 py-2 rounded-xl cursor-pointer
                          bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold
                          disabled:opacity-60">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        {uploading ? "Uploading..." : "Upload File"}
                    </label>
                </div>

                {files.length === 0 ? (
                    <p className="text-white/50 text-sm">
                        No files yet. Be the first to upload something 🎓
                    </p>
                ) : (
                    <div className="space-y-3">
                        {files.map((f) => (
                            <a
                                key={f.id}
                                href={f.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between rounded-xl bg-[#0A2036]
                         border border-white/5 px-4 py-3 text-sm text-white/80
                         hover:border-white/15 hover:bg-white/5 transition"
                            >
                                <div>
                                    <div className="font-medium">{f.name}</div>
                                    <div className="text-[11px] text-white/50">
                                        {f.contentType || "Unknown type"} •{" "}
                                        {f.size ? `${(f.size / (1024 * 1024)).toFixed(2)} MB` : ""}
                                    </div>
                                </div>
                                <span className="text-xs text-emerald-300">Open</span>
                            </a>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
