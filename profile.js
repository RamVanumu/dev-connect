import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Check if the user is logged in
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "auth.html"; // Redirect if not logged in
        return;
    }

    // Fetch user profile if exists
    const profileRef = doc(db, "profiles", user.uid);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
        // Redirect to feed if profile already exists
        window.location.href = "index.html";
    }
});

// Handle Profile Form Submission
document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("profile-name").value;
    const skills = document.getElementById("profile-skills").value.split(",");
    const github = document.getElementById("profile-github").value;
    const bio = document.getElementById("profile-bio").value;

    try {
        const user = auth.currentUser;

        if (!user) {
            alert("User not logged in");
            return;
        }

        // Save profile data to Firestore
        await setDoc(doc(db, "profiles", user.uid), {
            name,
            skills,
            github,
            bio,
            email: user.email,
            uid: user.uid
        });

        alert("Profile saved successfully!");
        window.location.href = "index.html"; // Redirect to Developer Feed
    } catch (error) {
        alert("Error saving profile: " + error.message);
    }
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "auth.html"; // Redirect to login
});
