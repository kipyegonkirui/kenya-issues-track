import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    collection,
    query,
    onSnapshot,
    orderBy,
    where,
    updateDoc,
    doc,
    DocumentData,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { toast } from "sonner";

// 🧩 Notification type definition
interface NotificationData extends DocumentData {
    id: string;
    title?: string;
    message?: string;
    read?: boolean;
    timestamp?: { seconds: number; nanoseconds: number };
    userId?: string;
}

const NotificationsBell = () => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user || !user.email) return;

        const q = query(
            collection(db, "notifications"),
            where("userId", "==", user.email),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const notifData: NotificationData[] = snapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                })) as NotificationData[];

                // ✅ Avoid duplicate notifications (only latest per issueId)
                const uniqueNotifications = notifData.reduce(
                    (acc: NotificationData[], curr) => {
                        const existing = acc.find((n) => n.id === curr.id);
                        if (!existing) acc.push(curr);
                        else if (
                            curr.timestamp &&
                            existing.timestamp &&
                            curr.timestamp.seconds > existing.timestamp.seconds
                        )
                            Object.assign(existing, curr);
                        return acc;
                    },
                    []
                );

                setNotifications(uniqueNotifications);
                setUnreadCount(uniqueNotifications.filter((n) => !n.read).length);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching notifications:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // 🔹 Mark all as read
    const markAllAsRead = async () => {
        try {
            const unread = notifications.filter((n) => !n.read);
            await Promise.all(
                unread.map((n) =>
                    updateDoc(doc(db, "notifications", n.id), { read: true })
                )
            );
            toast.success("All notifications marked as read ✅");
            setUnreadCount(0);
        } catch (error) {
            toast.error("Failed to mark all as read.");
            console.error(error);
        }
    };

    // 🔹 Mark one as read
    const markAsRead = async (id: string) => {
        try {
            await updateDoc(doc(db, "notifications", id), { read: true });
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-2 text-xs bg-red-500 text-white">
                            {unreadCount}
                        </Badge>
                    )}
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80" align="end">
                <div className="flex justify-between items-center px-3 py-2 border-b">
                    <span className="font-semibold">Notifications</span>
                    {notifications.length > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-500 hover:underline"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center text-muted-foreground py-4">
                        Loading notifications...
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center text-muted-foreground py-4">
                        No notifications yet 📭
                    </div>
                ) : (
                    notifications.map((n) => (
                        <DropdownMenuItem
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`flex flex-col items-start py-2 ${!n.read ? "bg-muted/50" : ""
                                }`}
                        >
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">
                                {n.timestamp?.seconds
                                    ? new Date(n.timestamp.seconds * 1000).toLocaleString()
                                    : ""}
                            </p>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationsBell;
