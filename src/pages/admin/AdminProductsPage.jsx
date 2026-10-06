import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { brand } from '../../config/brand';
import Button from '../../components/common/Button';
import ProductModal from '../../components/admin/ProductModal';
import { Plus, Edit2, Trash2, Power, Search, Sparkles } from 'lucide-react';

export const AdminProductsPage = () => {
  const { products, deleteProduct, toggleProductStock } = useAppData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filtered = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleEdit = (prod) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Add Product CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            Dairy Catalogue & Inventory ({products.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage unit prices, stock levels, and morning delivery availability.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add Dairy Product
        </Button>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products by title, category (milk, curd, ghee...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Unit</th>
                <th className="py-3.5 px-4">Inventory Stock</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                      />
                      <div>
                        <strong className="text-slate-900 font-bold block">{prod.name}</strong>
                        <span className="text-[11px] text-slate-400">Rating: {prod.rating} ★ ({prod.reviewsCount})</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[11px]">
                      {prod.categoryName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {brand.currency}{prod.price}
                    {prod.originalPrice && (
                      <span className="line-through text-slate-400 text-[10px] ml-1 font-normal">
                        {brand.currency}{prod.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {prod.unit}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {prod.stockCount || 50} units
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${
                        prod.inStock
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {prod.inStock ? '● In Stock' : '○ Out of Stock'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productToEdit={editingProduct}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;

