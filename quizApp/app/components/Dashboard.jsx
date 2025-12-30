"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import "../components/Dashboard.css";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "Sehrish", email: "example@gmail.com" });

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) setUser(JSON.parse(u));
    }, []);

    const subjects = {
        Physics: [
            {
                question: "What is the speed of light?",
                options: ["3×10⁸ m/s", "5×10⁶ m/s", "2×10⁷ m/s", "1×10⁴ m/s"],
                correct: "3×10⁸ m/s",
                explanation: "Light travels in vacuum at 3×10⁸ m/s — a fundamental constant.",
            },
            {
                question: "What is Newton's second law?",
                options: ["F = ma", "E = mc²", "V = IR", "pV = nRT"],
                correct: "F = ma",
                explanation: "Force equals mass times acceleration.",
            },
            {
                question: "Which particle has no charge?",
                options: ["Proton", "Neutron", "Electron", "Positron"],
                correct: "Neutron",
                explanation: "Neutrons are neutral particles found in the nucleus.",
            },
            {
                question: "Unit of energy is?",
                options: ["Joule", "Watt", "Newton", "Pascal"],
                correct: "Joule",
                explanation: "Energy is measured in Joules (J).",
            },
            {
                question: "Acceleration due to gravity on Earth?",
                options: ["9.8 m/s²", "8.9 m/s²", "10 m/s²", "9.2 m/s²"],
                correct: "9.8 m/s²",
                explanation: "Standard acceleration due to gravity is 9.8 m/s².",
            },
        ],

        Chemistry: [
            {
                question: "Water's chemical formula?",
                options: ["H2O", "CO2", "NaCl", "O2"],
                correct: "H2O",
                explanation: "Water consists of 2 hydrogen and 1 oxygen atoms.",
            },
            {
                question: "Atomic number of Oxygen?",
                options: ["8", "16", "12", "6"],
                correct: "8",
                explanation: "Oxygen has 8 protons in its nucleus.",
            },
            {
                question: "pH of pure water?",
                options: ["7", "0", "14", "1"],
                correct: "7",
                explanation: "Pure water has a neutral pH of 7.",
            },
            {
                question: "Chemical symbol for Sodium?",
                options: ["Na", "S", "K", "N"],
                correct: "Na",
                explanation: "Sodium's symbol is Na.",
            },
            {
                question: "Which gas is released in photosynthesis?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: "Oxygen",
                explanation: "Photosynthesis releases oxygen as a by-product.",
            },
        ],

        Math: [
            {
                question: "What is 5 + 7?",
                options: ["12", "10", "14", "11"],
                correct: "12",
                explanation: "5 + 7 equals 12.",
            },
            {
                question: "Square root of 64?",
                options: ["8", "6", "7", "9"],
                correct: "8",
                explanation: "8 × 8 = 64.",
            },
            {
                question: "Value of π (approx)?",
                options: ["3.14", "3.41", "3.24", "3.04"],
                correct: "3.14",
                explanation: "Pi is approximately 3.14.",
            },
            {
                question: "10 × 6 = ?",
                options: ["60", "16", "56", "66"],
                correct: "60",
                explanation: "10 times 6 equals 60.",
            },
            {
                question: "Derivative of x²?",
                options: ["2x", "x", "x²", "1"],
                correct: "2x",
                explanation: "d(x²)/dx = 2x.",
            },
        ]
    };


    const [showSubjects, setShowSubjects] = useState(false);
    const [screen, setScreen] = useState("home");
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [locked, setLocked] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (screen === "quiz") interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [screen]);

    const startQuiz = sub => {
        setSelectedSubject(sub);
        setScreen("quiz");
        setQIndex(0);
        setScore(0);
        setSelectedOption(null);
        setLocked(false);
        setTimer(0);
    };

    const chooseOption = i => {
        if (locked) return;
        setSelectedOption(i);
        setLocked(true);
        const currentQ = subjects[selectedSubject][qIndex];
        if (i === currentQ.options.indexOf(currentQ.correct)) setScore(s => s + 1);
    };

    const nextQuestion = () => {
        if (qIndex + 1 === subjects[selectedSubject].length) setScreen("result");
        else { setQIndex(q => q + 1); setSelectedOption(null); setLocked(false); }
    };

    const formatTime = sec => `${Math.floor(sec / 60).toString().padStart(2, "0")}:${(sec % 60).toString().padStart(2, "0")}`;

    const handleLogout = () => { localStorage.removeItem("user"); router.push("/login"); };
    const resetQuiz = () => { setScreen("home"); setShowSubjects(false); setSelectedSubject(null); setSelectedOption(null); setLocked(false); setTimer(0); };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="sidebar-top">
                    <Link href="/" className="sidebar-logo"><FontAwesomeIcon icon={faBookOpen} /> QuizApp</Link>
                </div>
                <ul className="sidebar-links">
                    <li>Dashboard</li>
                    <li>Quizzes</li>
                    <li>History</li>
                </ul>
                <div className="sidebar-userBox">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button className="btn logoutBtn" onClick={handleLogout}>Logout</button>
                </div>
            </aside>

            <main className="content">
                {screen === "home" && !showSubjects && (
                    <div className="center-container">
                        <h1>Welcome Back, {user.name}!</h1>
                        <p>Start Your Learning ✨</p>
                        <button className="btn startBtn" onClick={() => setShowSubjects(true)}>Start New Quiz</button>
                    </div>
                )}

                {screen === "home" && showSubjects && (
                    <div className="subjectContainer">
                        <h3>Select a Subject</h3>
                        {Object.keys(subjects).map(sub => (
                            <button key={sub} onClick={() => startQuiz(sub)}>
                                {sub}
                            </button>
                        ))}
                    </div>
                )}


                {screen === "quiz" && selectedSubject && (
                    <div className="center-container quiz-container">
                        <h2>{selectedSubject} Quiz</h2>
                        <p>Question {qIndex + 1} / {subjects[selectedSubject].length}</p>
                        {subjects[selectedSubject][qIndex].options.map((op, i) => {
                            const correctIndex = subjects[selectedSubject][qIndex].options.indexOf(subjects[selectedSubject][qIndex].correct);
                            const cls = ["btn", "optionBtn"];
                            if (locked && i === correctIndex) cls.push("correct");
                            if (locked && i === selectedOption && i !== correctIndex) cls.push("wrong");
                            return <button key={i} className={cls.join(" ")} onClick={() => chooseOption(i)}>{op}</button>
                        })}
                        <button className="btn nextBtn" onClick={nextQuestion} disabled={selectedOption === null}>
                            {qIndex + 1 === subjects[selectedSubject].length ? "Finish" : "Next"}
                        </button>
                        <div className="stickyTimer">Timer: {formatTime(timer)}</div>
                        <div className="progressBarContainer">
                            <div className="progressBar" style={{ width: `${Math.floor((qIndex / subjects[selectedSubject].length) * 100)}%` }}></div>
                        </div>
                    </div>
                )}

                {screen === "result" && (
                    <div className="center-container quiz-container">
                        <div className="finalScoreBox">
                            Score: {score} / {subjects[selectedSubject].length}
                        </div>
                        <button className="btn startBtn" onClick={resetQuiz}>Back</button>
                    </div>
                )}
            </main>
        </div>
    );
}
