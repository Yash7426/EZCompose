/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"d2slcw3kip6qmk.cloudfront.net"
            },
            {
                protocol:"https",
                hostname:"flowbite.s3.amazonaws.com"
            },
            {
                protocol:"https",
                hostname:"judicious-fennec-130.convex.cloud"
            },
            {
                protocol:"https",
                hostname:"encrypted-tbn0.gstatic.com"
            },
            {
                protocol:"https",
                hostname:"images.unsplash.com"
            },
            {
                protocol:"https",
                hostname:"img.clerk.com"
            },
        ]
    }
};

export default nextConfig;
    