const NotAuthorized = () => (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold mb-4">🚫 Access Denied</h1>
        <p className="text-muted-foreground">
            You don’t have permission to access this page.
        </p>
    </div>
);

export default NotAuthorized;
