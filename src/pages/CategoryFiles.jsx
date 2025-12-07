import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    serverTimestamp,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore";
import { db } from "../components/firebase";
import { Link } from "react-router";

const LABELS = {
    summarize: "Summarize",
    testbank: "Test Bank",
    slides: "Slides",
    resources: "Resources",
};

export default function CategoryFiles() {
    const { deptKey, subjectCode, sectionKey } = useParams();
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

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

            setItems(list);
        });

        return () => unsub();
    }, [deptKey, subjectCode, sectionKey]);

    async function handleAddText() {
        if (!text.trim()) return;
        setAdding(true);

        try {
            await addDoc(collection(db, "files"), {
                deptKey,
                subjectCode,
                sectionKey,
                content: text.trim(),
                createdAt: serverTimestamp(),
            });

            setText("");
        } catch (err) {
            console.error(err);
            alert("Failed to add text");
        } finally {
            setAdding(false);
        }
    }

    async function handleDelete(id) {
        const ok = confirm("Delete this note?");
        if (!ok) return;

        try {
            await deleteDoc(doc(db, "files", id));
        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
    }

    function startEdit(item) {
        setEditingId(item.id);
        setEditText(item.content);
    }

    async function saveEdit(id) {
        if (!editText.trim()) return;

        try {
            await updateDoc(doc(db, "files", id), {
                content: editText.trim()
            });

            setEditingId(null);
            setEditText("");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    }

    function cancelEdit() {
        setEditingId(null);
        setEditText("");
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
                            Add, edit, and browse notes for this section.
                        </p>
                    </div>
                </div>

                {/* Add new note */}
                <div className="mb-8">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full h-32 px-4 py-3 rounded-xl bg-[#0A2036] border border-white/10 text-white"
                    />
                    <button
                        onClick={handleAddText}
                        disabled={adding}
                        className="mt-3 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 
                                   text-white text-sm font-semibold disabled:opacity-50"
                    >
                        {adding ? "Adding..." : "Add Note"}
                    </button>
                </div>

                {/* Display notes */}
                {items.length === 0 ? (
                    <p className="text-white/50 text-sm">
                        No notes yet. Add the first one ✏️
                    </p>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl bg-[#0A2036] border border-white/5 px-4 py-3"
                            >
                                {/* Editing mode */}
                                {editingId === item.id ? (
                                    <>
                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="w-full h-28 px-3 py-2 rounded-xl bg-[#0F2A45] border border-white/10 text-white"
                                        />

                                        <div className="flex gap-3 mt-3">
                                            <button
                                                onClick={() => saveEdit(item.id)}
                                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-xl"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-xl"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Normal display */}
                                        <p className="text-white/90 whitespace-pre-line">
                                            {item.content}
                                        </p>

                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-[11px] text-white/40">
                                                {item.createdAt?.seconds
                                                    ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                                                    : ""}
                                            </span>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => startEdit(item)}
                                                    className="text-blue-400 text-xs hover:text-blue-500"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-400 text-xs hover:text-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
