import { auth, db } from "./firebase.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Ensure User is Logged In
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "auth.html"; // Redirect if not logged in
    }
});

// Handle Post Submission
document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = document.getElementById("post-content").value;
    const user = auth.currentUser;

    if (!user) {
        alert("User not logged in");
        return;
    }

    try {
        await addDoc(collection(db, "posts"), {
            content,
            userId: user.uid,
            userEmail: user.email,
            timestamp: new Date()
        });

        document.getElementById("post-content").value = ""; // Clear input
    } catch (error) {
        alert("Error posting: " + error.message);
    }
});

// Fetch & Display Posts in Real-Time
const feedContainer = document.getElementById("feed-container");
const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));

onSnapshot(postsQuery, (snapshot) => {
    feedContainer.innerHTML = ""; // Clear feed before updating
    snapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <p><strong>${post.userEmail}</strong></p>
            <p>${post.content}</p>
            <hr>
        `;
        feedContainer.appendChild(postElement);
    });
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "auth.html"; // Redirect to login
});
