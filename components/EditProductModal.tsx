'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ProductForm from './ProductForm'
import { Product } from '@/types/product'

type EditProductModalProps = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (editedProduct: Product) => void
}

export default function EditProductModal({ product, isOpen, onClose, onSave }: EditProductModalProps) {
  // Se não houver produto, não renderiza nada
  if (!product) return null

  // Função para lidar com o envio do formulário de edição
  const handleSubmit = (data: Omit<Product, 'id'>) => {
    onSave({ ...data, id: product.id })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias nos detalhes do produto. Clique em salvar para confirmar as mudanças.
          </DialogDescription>
        </DialogHeader>
        <ProductForm product={product} onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}

