import NextAuth, { Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

// Define the User type
type AppUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      const client = await clientPromise;
      const db = client.db("mp-6");

      // Check if user already exists
      if (user.email) {
        const existingUser = await db
          .collection("Cluster0")
          .findOne({ email: user.email });
        if (!existingUser) {
          // Register new user
          await db.collection("Cluster0").insertOne({
            email: user.email,
            name: user.name ?? "Unknown",
            image: user.image ?? "",
          });
        }
      }

      return true; // Continue with login
    },
    async session({ session }: { session: Session }) {
      const client = await clientPromise;
      const db = client.db("mp-6");

      if (session.user?.email) {
        // Fetch additional user data from the database
        const dbUser = await db
          .collection<AppUser>("Cluster0")
          .findOne({ email: session.user.email });

        // Ensure dbUser matches the AppUser type
        if (dbUser) {
          session.user = {
            name: dbUser.name ?? session.user.name,
            email: dbUser.email ?? session.user.email,
            image: dbUser.image ?? session.user.image,
          };
        }
      }

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
