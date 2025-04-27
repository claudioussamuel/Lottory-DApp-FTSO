
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { flareTestnet } from "viem/chains";


if (!process.env.NEXT_PUBLIC_SEPOLIA_ID) {
  throw new Error("Missing NEXT_PUBLIC_FLARE_ID in environment variables");
}


const FLARE = `https://coston2-api.flare.network/ext/C/rpc`;


const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith("0x")
    ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
    : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
  : null;

export const client = createPublicClient({
  chain: flareTestnet,
  transport: http(FLARE),
});

export const account = PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : null;

