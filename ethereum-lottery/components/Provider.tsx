"use client"
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { flare, flareTestnet, } from "viem/chains";

export function Providers({children}:{children:ReactNode}){
    return <PrivyProvider 
    config={{
        loginMethods:[
            "wallet",
            "email",
            "github",
            "tiktok", 
            "twitter",
            "discord",
            "google", 
            "linkedin"
        ],
        embeddedWallets:{
            createOnLogin: 'users-without-wallets',
            
        },
        defaultChain: flareTestnet,
        supportedChains:[flareTestnet,flare],
        
    }}
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>
       
        {children}
       
        </PrivyProvider>
}