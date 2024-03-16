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
                hostname:"judicious-fennec-130.convex.cloud"
            }
        ]
    }
};

export default nextConfig;
