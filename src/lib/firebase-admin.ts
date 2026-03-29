import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });
    } catch (error) {
      console.error("Firebase admin initialization error:", error);
    }
  } else {
    console.warn("Firebase Admin credentials missing. Notification features will be disabled.");
  }
}

// Export a mock-safe messaging object
export const messaging = admin.apps.length 
  ? admin.messaging() 
  : { 
      send: async (msg: any) => {
        console.log("MOCK Push Notification sent:", msg.notification?.title);
        return "mock-message-id";
      } 
    } as any;

