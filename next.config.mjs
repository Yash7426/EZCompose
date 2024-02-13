/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"d2slcw3kip6qmk.cloudfront.net"
            }
        ]
    }
};

export default nextConfig;
