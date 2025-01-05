"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  loadProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetToDefault,
} from "@/utils/localStorage";
import { Product } from "@/types/product";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import ProductInfoPanel from "@/components/ProductInfoPanel";
import ProductModal from "@/components/ProductModal";
import ProductTable from "@/components/ProductTable";
import Footer from "@/components/Footer";
import EditProductModal from "@/components/EditProductModal";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const handleSubmit = (data: Product) => {
    const newProduct = addProduct(data);
    if (newProduct) {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success("Produto adicionado com sucesso!");
    } else {
      toast.error("Erro ao adicionar produto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (editedProduct: Product) => {
    updateProduct(editedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === editedProduct.id ? editedProduct : p))
    );
    setEditingProduct(null);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDelete = (id: number) => {
    deleteProduct(id);
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    toast.success("Produto excluído com sucesso!");
  };

  const handleResetToDefault = () => {
    const defaultProducts = resetToDefault();
    setProducts(defaultProducts);
    toast.success("Produtos restaurados para o padrão!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background p-4 sm:p-6 mt-16">
        <div className="container mx-auto max-w-6xl">
          <ProductInfoPanel products={products} />
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <Input
                type="search"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={handleResetToDefault}
                className="w-full sm:w-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar Padrão
              </Button>
              <ProductModal onSubmit={handleSubmit} />
            </div>
          </div>
          <ProductTable
            products={products}
            searchTerm={searchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </main>
      <Footer />
      <EditProductModal
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
