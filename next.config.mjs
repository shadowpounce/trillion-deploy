/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    reactStrictMode: false,
    sassOptions: {
        additionalData: `
    @import "/src/styles/_variables.scss";
    @import "/src/styles/_mixins.scss";
  `,
    },
    images: {
        remotePatterns: [
            {
                hostname: "**",
            },
        ],
    },
}

export default nextConfig
