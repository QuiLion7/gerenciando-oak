"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import { Product } from '@/types/product'

type ProductInfoPanelProps = {
  products: Product[]
}

export default function ProductInfoPanel({ products }: ProductInfoPanelProps) {
  const stats = useMemo(() => {
    const totalProducts = products.length
    const availableProducts = products.filter(p => p.available).length
    const percentage = totalProducts === 0 ? "0" : ((availableProducts / totalProducts) * 100).toFixed(2)

    return { totalProducts, availableProducts, percentage }
  }, [products])

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.availableProducts} disponíveis
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produtos Disponíveis</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.availableProducts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.percentage}% do total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

