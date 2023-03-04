/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['phonoteka.org', 'thebiography.org', 'i.pravatar.cc', 'images.unsplash.com',
            'lh3.googleusercontent.com', 'firebasestorage.googleapis.com', 'avatars.githubusercontent.com']
    }
}

module.exports = nextConfig
