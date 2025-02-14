import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        unoptimized: true, // 画像最適化を無効化 (next/image を使用している場合)
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
