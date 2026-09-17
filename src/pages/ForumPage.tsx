import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    setDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { Send, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "@/components/AuthModal";

interface Message {
    id: string;
    text: string;
    user: string;
    createdAt: any;
}

interface OnlineUser {
    id: string;
    name: string;
}

const ForumPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [user] = useAuthState(auth);
    const [showModal, setShowModal] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

    // --- Load messages ---
    useEffect(() => {
        const q = query(collection(db, "communityChats"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, []);

    // --- Track Online Users ---
    useEffect(() => {
        if (!user) return;

        const userDoc = doc(db, "onlineUsers", user.uid);
        const userData = {
            name: user.displayName || user.email || "Anonymous",
            lastActive: serverTimestamp(),
        };

        setDoc(userDoc, userData, { merge: true });

        // Remove user from online list when leaving
        const handleUnload = () => deleteDoc(userDoc);
        window.addEventListener("beforeunload", handleUnload);

        const unsubscribe = onSnapshot(collection(db, "onlineUsers"), (snapshot) => {
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as OnlineUser[];
            setOnlineUsers(users);
        });

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            unsubscribe();
            deleteDoc(userDoc).catch(() => { });
        };
    }, [user]);

    // --- Track Typing Users ---
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "typingStatus"), (snapshot) => {
            const typing = snapshot.docs.map((doc) => doc.id);
            setTypingUsers(typing);
        });
        return () => unsubscribe();
    }, []);

    const handleTyping = async (value: string) => {
        setNewMessage(value);
        if (!user) return;

        const typingDoc = doc(db, "typingStatus", user.uid);

        if (value.trim()) {
            setIsTyping(true);
            await setDoc(typingDoc, { user: user.displayName || user.email });
        } else {
            setIsTyping(false);
            await deleteDoc(typingDoc).catch(() => { });
        }
    };

    // --- Send message ---
    const sendMessage = async () => {
        if (!newMessage.trim() || !user) return;
        await addDoc(collection(db, "communityChats"), {
            text: newMessage,
            user: user.displayName || user.email || "Anonymous",
            createdAt: serverTimestamp(),
        });
        setNewMessage("");
        setIsTyping(false);
        await deleteDoc(doc(db, "typingStatus", user.uid)).catch(() => { });
    };

    return (
        <div className="container py-16 max-w-3xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex justify-between items-center">
                        🗣️ Community Forum
                        <Link to="/">
                            <Button variant="outline" size="sm">Back to Home</Button>
                        </Link>
                    </CardTitle>

                    {/* Online users */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{onlineUsers.length} online</span>
                        {typingUsers.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-primary animate-pulse">
                                <Activity className="h-3 w-3" />
                                {typingUsers.length === 1
                                    ? `${typingUsers[0]} is typing...`
                                    : `${typingUsers.length} people typing...`}
                            </div>
                        )}
                    </div>

                    <p className="text-muted-foreground text-sm mt-1">
                        Chat about county issues, share insights, or ask questions.{" "}
                        {user ? "You're logged in — start chatting!" : "Log in to participate."}
                    </p>
                </CardHeader>

                <CardContent>
                    {/* Messages */}
                    <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-muted/30 space-y-3">
                        {messages.length === 0 && (
                            <p className="text-center text-muted-foreground text-sm">
                                No messages yet. Be the first to say hi 👋
                            </p>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className="border-b border-border pb-2">
                                <div className="text-sm font-semibold text-primary">{msg.user}</div>
                                <div className="text-sm">{msg.text}</div>
                                <div className="text-xs text-muted-foreground">
                                    {msg.createdAt?.toDate
                                        ? msg.createdAt.toDate().toLocaleString()
                                        : "Just now"}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    {user ? (
                        <div className="flex gap-2">
                            <Input
                                value={newMessage}
                                onChange={(e) => handleTyping(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow"
                            />
                            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                                <Send className="h-4 w-4 mr-1" /> Send
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground text-sm">
                            <Button variant="default" onClick={() => setShowModal(true)}>
                                Log in to post messages
                            </Button>
                        </div>
                    )}

                    {/* Login Modal */}
                    {showModal && (
                        <AuthModal
                            open={showModal}
                            onClose={() => setShowModal(false)}
                            onSuccess={() => setShowModal(false)}
                        />
                    )}

                </CardContent>
            </Card>
        </div>
    );
};

export default ForumPage;
