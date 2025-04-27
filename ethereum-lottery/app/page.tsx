"use client"

import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"
import { usePrivy } from '@privy-io/react-auth';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [lotteryPlayers, setLotteryPlayers] = useState([])
  const [lotteryPot, setLotteryPot] = useState("0")
  const [lotteryHistory, setLotteryHistory] = useState([])
  const [lotteryId, setLotteryId] = useState(1)
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const {login, authenticated,user,logout,} = usePrivy()
  const walletAddress = user?.wallet?.address;

  const [showToggle, setShowToggle] = useState(false)

  function handleToggleShow(){
    setShowToggle((prev)=>!prev)
  }


  // Mock data for preview
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // setLotteryPlayers(["0x71C7656EC7ab88b098defB751B7401B5f6d8976F", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"])
      // setLotteryHistory([
      //   { id: 0, address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
      //   { id: -1, address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
      // ])
      setLotteryPot("0.123")
    }
  }, [])

  

  const enterLotteryHandler = () => {
    setSuccessMsg("You have entered the lottery!")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const pickWinnerHandler = () => {
    setSuccessMsg("Winner has been picked!")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const payWinnerHandler = () => {
    setSuccessMsg("Winner has been paid!")
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ether Lottery
          </h1>
          <Button
            onClick={authenticated ? logout : login}
            variant={authenticated ? "outline" : "default"}
            className={authenticated ? "border-green-500 text-green-500" : ""}
          >
            {authenticated ? "Connected" : "Connect Wallet"}
          </Button>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Main Lottery Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Play Lottery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Enter the lottery by sending 0.01 Ether</p>
                  <Button
                    onClick={authenticated ? enterLotteryHandler : login}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                   {authenticated ? "Enter Lottery" : "Connect Wallet to Enter"} 
                  </Button>
                </CardContent>
              </Card>

              {/* Admin Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                 
                  <div>
                    <p className="text-muted-foreground mb-2">
                      <span className="font-semibold">Admin only:</span> Pay winner
                    </p>
                    <Button onClick={payWinnerHandler} variant="outline" className="w-full sm:w-auto">
                      Pay Winner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMsg && (
                <Alert className="border-green-500 text-green-500">
                  <AlertDescription>{successMsg}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pot Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <CardHeader>
                  <CardTitle>Current Pot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{lotteryPot} ETH</p>
                </CardContent>
              </Card>

              {/* Players Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Players ({lotteryPlayers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {lotteryPlayers.length === 0 ? (
                      <li className="text-muted-foreground">No players yet</li>
                    ) : (
                      lotteryPlayers.map((player, index) => (
                        <li key={`${player}-${index}`} className="truncate">
                          <a
                            href={`https://etherscan.io/address/${player}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                          >
                            <span className="truncate">{player}</span>
                            <ExternalLink className="ml-1 h-3 w-3 inline flex-shrink-0" />
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Lottery History Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Lottery History</CardTitle>
                </CardHeader>
                <CardContent>
                  {lotteryHistory.length === 0 ? (
                    <p className="text-muted-foreground">No previous lotteries</p>
                  ) : (
                    <div className="space-y-4">
                      {lotteryHistory.map((item) => {
                        if (lotteryId !== item) {
                          return (
                            <div key={"item.id"} className="border-b pb-3 last:border-0">
                              <p className="font-medium">Lottery #{"item.id"} winner:</p>
                              <a
                                // href={`https://etherscan.io/address/${item.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm truncate flex items-center"
                              >
                                <span className="truncate">{"item.address"}</span>
                                <ExternalLink className="ml-1 h-3 w-3 inline flex-shrink-0" />
                              </a>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ether Lottery</p>
        </div>
      </footer>
    </div>
  )
}
