import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowUpDown,
  ChevronRight,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Track Crypto in Real-Time
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Stay updated with the latest cryptocurrency prices, market
                trends, and portfolio performance.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <label htmlFor="search" className="sr-only">
                  Search cryptocurrencies
                </label>
                <Input
                  className="max-w-lg flex-1 bg-white/10 text-white"
                  placeholder="Search cryptocurrencies"
                  type="search"
                  id="search"
                />
                <Button type="submit" variant="secondary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Market Overview
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Market Cap
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.14T</div>
                <p className="text-xs text-muted-foreground">
                  +3.2% from last 24h
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  24h Volume
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$78.5B</div>
                <p className="text-xs text-muted-foreground">
                  +5.7% from last 24h
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bitcoin Dominance
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.1%</div>
                <p className="text-xs text-muted-foreground">
                  -0.8% from last 24h
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Top Cryptocurrencies
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h %</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Bitcoin</TableCell>
                  <TableCell>$34,567.89</TableCell>
                  <TableCell className="text-green-600">+2.34%</TableCell>
                  <TableCell className="text-right">$653,456,789,012</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2</TableCell>
                  <TableCell>Ethereum</TableCell>
                  <TableCell>$2,345.67</TableCell>
                  <TableCell className="text-red-600">-1.23%</TableCell>
                  <TableCell className="text-right">$278,901,234,567</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3</TableCell>
                  <TableCell>Cardano</TableCell>
                  <TableCell>$1.23</TableCell>
                  <TableCell className="text-green-600">+3.45%</TableCell>
                  <TableCell className="text-right">$39,012,345,678</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">4</TableCell>
                  <TableCell>Binance Coin</TableCell>
                  <TableCell>$345.67</TableCell>
                  <TableCell className="text-green-600">+0.78%</TableCell>
                  <TableCell className="text-right">$53,456,789,012</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5</TableCell>
                  <TableCell>Solana</TableCell>
                  <TableCell>$89.01</TableCell>
                  <TableCell className="text-red-600">-2.34%</TableCell>
                  <TableCell className="text-right">$24,567,890,123</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 flex justify-end">
            <Button>
              View All
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
            Latest Crypto News
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Bitcoin Surges Past $35,000</CardTitle>
                <CardDescription>5 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Bitcoin&apos;s price has surged past $35,000, reaching its
                  highest level in 18 months. Analysts attribute the rise to
                  increased institutional adoption and positive market
                  sentiment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ethereum 2.0 Upgrade on Track</CardTitle>
                <CardDescription>1 day ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The Ethereum Foundation has announced that the Ethereum 2.0
                  upgrade is progressing as planned. The transition to
                  proof-of-stake is expected to significantly improve network
                  scalability and efficiency.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Crypto Regulations Proposed</CardTitle>
                <CardDescription>2 days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Lawmakers have proposed new regulations aimed at providing
                  clearer guidelines for cryptocurrency businesses. The proposed
                  framework aims to balance innovation with consumer protection.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="text-primary">
              Read More News
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Crypto Journey Today
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Join thousands of traders and investors who trust Blockotlin for
                real-time updates and market insights.
              </p>
            </div>
            <div className="w-full max-w-sm pt-4">
              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                asChild
              >
                <Link href="/signup">Sign Up for Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
