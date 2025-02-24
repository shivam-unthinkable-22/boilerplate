import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Configuration for NextAuth.js
export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Type guard to ensure credentials are not undefined
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const { username, password } = credentials;

        // Send request to your Express API for login
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok && result.token) {
          return {
            id: result.id, // You can include more user info if needed
            username: result.username,
            token: result.token, // You can store the token to use it later
          };
        } else {
          return null; // If login fails, NextAuth.js will handle this
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom sign-in page (optional)
  },
  callbacks: {
    async jwt({ token, account }) {
      // Save the JWT token after successful login
      if (account && account.token) {
        token.token = account.token;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect URL:", url);

      return `${baseUrl}/`;
    },
    async session({ session, token }) {
      // Pass the token to the session object
      // @ts-expect-error key error
      session.token = token.token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Make sure to set a secret in .env
});

export { handler as GET, handler as POST };
