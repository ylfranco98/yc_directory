// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "@/sanity/lib/write-client";

// // Rename your custom type to avoid conflicts.
// interface GitHubProfile {
//   id: string;
//   login: string;
//   bio?: string;
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID as string,
//       clientSecret: process.env.AUTH_GITHUB_SECRET as string,
//       // domain: process.env.AUTH0_DOMAIN,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user: { name, email, image }, profile }) {
//       // Cast the profile to GitHubProfile (if available)
//       const githubProfile = profile as GitHubProfile | undefined;
//       if (!githubProfile) {
//         console.error("Profile is undefined in signIn callback.");
//         return false;
//       }

//       const { id, login, bio } = githubProfile;
//       const existingUser = await client
//         .withConfig({ useCdn: false })
//         .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//           id,
//         });
//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author",
//           id: id,
//           name,
//           username: login,
//           email,
//           image,
//           bio: bio || "",
//         });
//       }

//       return true;
//     },
//     async jwt({ token, account, profile }) {
//       // Only perform the extra work if both account and profile exist.
//       if (account && profile) {
//         // Cast the profile to GitHubProfile—here it should exist on initial sign in.
//         const githubProfile = profile as GitHubProfile;
//         const { id } = githubProfile;
//         const user = await client
//           .withConfig({ useCdn: false })
//           .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
//         token.id = user?._id;
//       }
//       // For subsequent invocations when profile is undefined, simply return token.
//       return token;
//     },
//     async session({ session, token }) {
//       Object.assign(session, { id: token.id });
//       return session;
//     },
//   },
// });

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      //       // domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
