'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import ProductForm from './ProductForm'
import { Product } from '@/types/product'

type ProductModalProps = {
  onSubmit: (data: Product) => void
}

export default function ProductModal({ onSubmit }: ProductModalProps) {
  // Estado para controlar a abertura/fechamento do modal
  const [open, setOpen] = useState(false)

  // Função para lidar com o envio do formulário
  const handleSubmit = (data: Product) => {
    onSubmit(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Produto</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo produto abaixo. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <ProductForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

