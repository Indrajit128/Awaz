// This module is SERVER-ONLY. It uses 'fs' to persist data to db.json.
// Never import this from a client component directly.

let db: any = null;
let dbPath: string | null = null;

async function getDB() {
  if (typeof window !== "undefined") throw new Error("prisma proxy cannot run on client");

  if (!db) {
    const fs = await import("fs");
    const path = await import("path");
    dbPath = path.join(process.cwd(), "db.json");

    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    } else {
      db = {
        users: [
          {
            id: "cluz-admin-123",
            name: "Arjun Singh",
            email: "arjun@awaaz.in",
            role: "ADMIN",
            walletBalance: 1000.0,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          },
          {
            id: "cluz-user-456",
            name: "Priya Sharma",
            email: "priya@awaaz.in",
            role: "USER",
            walletBalance: 250.0,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          },
        ],
        transactions: [],
        calls: [],
      };
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    }
  }
  return db;
}

async function saveDB() {
  if (!dbPath || !db) return;
  const fs = await import("fs");
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

export const prisma = {
  user: {
    findUnique: async ({ where }: any) => {
      const d = await getDB();
      return d.users.find((u: any) =>
        (where.email && u.email === where.email) ||
        (where.id && u.id === where.id)
      ) || null;
    },
    update: async ({ where, data }: any) => {
      const d = await getDB();
      const index = d.users.findIndex((u: any) =>
        (where.id && u.id === where.id) ||
        (where.email && u.email === where.email)
      );
      if (index === -1) throw new Error("User not found");
      d.users[index] = { ...d.users[index], ...data };
      await saveDB();
      return d.users[index];
    },
    create: async ({ data }: any) => {
      const d = await getDB();
      const newUser = {
        id: `user-${Date.now()}`,
        ...data,
        walletBalance: data.walletBalance ?? 100.0,
      };
      d.users.push(newUser);
      await saveDB();
      return newUser;
    },
  },
  transaction: {
    create: async ({ data }: any) => {
      const d = await getDB();
      const newTx = { id: `tx-${Date.now()}`, createdAt: new Date().toISOString(), ...data };
      d.transactions.push(newTx);
      await saveDB();
      return newTx;
    },
    findMany: async ({ where }: any) => {
      const d = await getDB();
      return d.transactions.filter((t: any) => !where?.userId || t.userId === where.userId);
    },
  },
  call: {
    create: async ({ data }: any) => {
      const d = await getDB();
      const newCall = { id: `call-${Date.now()}`, startTime: new Date().toISOString(), ...data };
      d.calls.push(newCall);
      await saveDB();
      return newCall;
    },
  },
};

export default prisma;
