import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";

const DEPT_TITLES = {
  it: "Information Technology",
  cs: "Computer Science",
  is: "Information Systems",
};

export default function DepartmentSubjects() {
  const { deptKey } = useParams();
  const [extraSubjects, setExtraSubjects] = useState([]);
  const [adding, setAdding] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "subjects"), where("deptKey", "==", deptKey));

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExtraSubjects(list);
    });

    return () => unsub();
  }, [deptKey]);

  const allSubjects = extraSubjects.map((s) => ({
    id: s.id,
    code: s.code,
    name: s.name || s.code,
    createdBy: s.createdBy,
  }));

  async function handleAddSubject() {
    const code = prompt("Enter subject code (e.g., CPIT399):");
    if (!code) return;

    const name =
      prompt("Enter subject name (optional):") || code.trim().toUpperCase();

    try {
      setAdding(true);
      await addDoc(collection(db, "subjects"), {
        deptKey,
        code: code.trim().toUpperCase(),
        name: name.trim(),
        createdBy: currentUser?.uid, // ⭐ مهم
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      alert("Error adding subject");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id) {
    const ok = confirm("Are you sure you want to delete this subject?");
    if (!ok) return;

    await deleteDoc(doc(db, "subjects", id));
  }

  async function handleEdit(subj) {
    const newName = prompt("Enter new subject name:", subj.name);
    if (!newName) return;

    const newCode = prompt("Enter new subject code:", subj.code);
    if (!newCode) return;

    await updateDoc(doc(db, "subjects", subj.id), {
      name: newName.trim(),
      code: newCode.trim().toUpperCase(),
    });
  }

  return (
    <div className="min-h-screen w-full bg-[#05192d] bg-gradient-to-b from-[#092037] to-[#05182b] px-6 py-10">
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white
             bg-white/10 hover:bg-white/20 border border-white/10 
             px-4 py-2 rounded-xl text-sm transition"
      >
        <span className="text-lg">←</span> Back
      </Link>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {DEPT_TITLES[deptKey] || "Department"}
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Choose a subject or add a new one for this track.
            </p>
          </div>

          <button
            onClick={handleAddSubject}
            disabled={adding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl 
                     bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold
                     disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="text-lg">＋</span>
            <span>{adding ? "Adding..." : "Add Subject"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allSubjects.map((subj) => (
            <div key={subj.id || subj.code} className="relative">

              {subj.createdBy === currentUser?.uid && (
                <div className="absolute top-2 right-2 flex gap-2 z-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(subj);
                    }}
                    className="px-2 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(subj.id);
                    }}
                    className="px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              )}

              <Link
                to={`/departments/${deptKey}/${subj.code}`}
                className="group rounded-2xl p-[1px] bg-white/5 hover:bg-white/10 transition block"
              >
                <div
                  className="rounded-2xl bg-[#0A2036] border border-white/5
                             p-5 h-full min-h-[150px] flex flex-col justify-between
                             group-hover:border-white/10 group-hover:shadow-lg transition"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">
                        {subj.name}
                      </h3>
                      <span className="text-white/50 text-sm font-mono mt-6 block">
                        {subj.code}
                      </span>
                    </div>

                    {subj.createdBy && (
                      <span className="inline-block text-[11px] text-emerald-300/80 mt-2">
                        Added by users
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                    <span>Open subject</span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition">
                      ➜
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
