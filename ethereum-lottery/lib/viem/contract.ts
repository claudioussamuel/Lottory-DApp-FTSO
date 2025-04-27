"use client"

import { getContract } from "viem";
import { lotteryContractAbi, lotteryContractAddress } from "./abi";
import { client } from "./client";

/**
 * Interface representing a player in the lottery
 */
interface Player {
  address: `0x${string}`;
}

/**
 * Interface for lottery history data
 */
export interface LotteryWinner {
  lotteryId: number;
  winnerAddress: `0x${string}`;
}

/**
 * Get the current lottery balance
 * @returns The balance of the lottery contract in wei as a bigint, or null if an error occurs
 */
export async function getLotteryBalance(): Promise<bigint | null> {
  try {
    const contract = getContract({
      address: lotteryContractAddress,
      abi: lotteryContractAbi,
      client,
    });

    const balance = await contract.read.getBalance();
    console.log("Lottery Balance:", balance);

    if (typeof balance === "bigint" && balance !== null) {
      return balance;
    } else {
      console.error("Unexpected balance format");
      return null;
    }
  } catch (error) {
    console.error("Error reading lottery balance:", error);
    return null;
  }
}

/**
 * Get all players currently entered in the lottery
 * @returns Array of player addresses, or null if an error occurs
 */
export async function getLotteryPlayers(): Promise<`0x${string}`[] | null> {
  try {
    const contract = getContract({
      address: lotteryContractAddress,
      abi: lotteryContractAbi,
      client,
    });

    const players = await contract.read.getPlayers();
    console.log("Lottery Players:", players);

    if (Array.isArray(players)) {
      return players as `0x${string}`[];
    } else {
      console.error("Unexpected players data format");
      return null;
    }
  } catch (error) {
    console.error("Error reading lottery players:", error);
    return null;
  }
}

/**
 * Get the winner address for a specific lottery ID
 * @param lotteryId The ID of the lottery to query
 * @returns The winner's address, or null if an error occurs
 */
export async function getLotteryWinner(lotteryId: number): Promise<`0x${string}` | null> {
  try {
    const contract = getContract({
      address: lotteryContractAddress,
      abi: lotteryContractAbi,
      client,
    });

    const winnerAddress = await contract.read.getWinnerByLottery([BigInt(lotteryId)]);
    console.log(`Winner for Lottery #${lotteryId}:`, winnerAddress);

    if (typeof winnerAddress === "string" && winnerAddress.startsWith("0x")) {
      return winnerAddress as `0x${string}`;
    } else {
      console.error("Unexpected winner address format");
      return null;
    }
  } catch (error) {
    console.error(`Error getting winner for lottery #${lotteryId}:`, error);
    return null;
  }
}

/**
 * Get the current lottery ID
 * @returns The current lottery ID as a number, or null if an error occurs
 */
export async function getCurrentLotteryId(): Promise<number | null> {
  try {
    const contract = getContract({
      address: lotteryContractAddress,
      abi: lotteryContractAbi,
      client,
    });

    const lotteryId = await contract.read.lotteryId();
    console.log("Current Lottery ID:", lotteryId);

    if (typeof lotteryId === "bigint" && lotteryId !== null) {
      return Number(lotteryId);
    } else {
      console.error("Unexpected lottery ID format");
      return null;
    }
  } catch (error) {
    console.error("Error reading current lottery ID:", error);
    return null;
  }
}



 
/**
 * Get the lottery history (all winners)
 * @returns Array of lottery winners with IDs, or null if an error occurs
 */
export async function getLotteryHistory(): Promise<LotteryWinner[] | null> {
  try {
    const contract = getContract({
      address: lotteryContractAddress,
      abi: lotteryContractAbi,
      client,
    });

    const currentLotteryId = await contract.read.lotteryId();
    if (typeof currentLotteryId !== "bigint") {
      return null;
    }

    const history: LotteryWinner[] = [];
    
    // Loop through all past lotteries
    for (let i = 1; i < Number(currentLotteryId); i++) {
      const winnerAddress = await contract.read.getWinnerByLottery([BigInt(i)]);
      
      if (typeof winnerAddress === "string" && winnerAddress.startsWith("0x")) {
        history.push({
          lotteryId: i,
          winnerAddress: winnerAddress as `0x${string}`
        });
      }
    }
    
    console.log("Lottery History:", history);
    return history;
  } catch (error) {
    console.error("Error getting lottery history:", error);
    return null;
  }
}