/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', 
                hostname: '**',    
            },
            {
                protocol: 'http',  
                hostname: '**',   
            },
        ],
    },
    webpack(config) {
        // Remove o tratamento padrão de SVGs pelo Next
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );
        fileLoaderRule.exclude = /\.svg$/i;

        // Adiciona o SVGR para transformar SVGs em componentes React
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        icon: true, // permite usar width/height facilmente
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
